const { fallbackError, isEmpty } = require('../utils/helpers')
const { db } = require('../utils/admin');

exports.createBlogComment = (request, response) => {
    const { text, blogId } = request.body || {};

    if (isEmpty(text)) return response.status(400).json({ error: { text: 'Must not be empty' } });
    if (isEmpty(blogId)) return response.status(400).json({ error: { blogId: 'Must be associated with some blog' } });

    const newBlogCommentItem = {
        text,
        blogId,
        isRead: false,
        createdAt: new Date().toISOString()
    }

    db.collection('blog_comments').add(newBlogCommentItem).then((doc) => {
        const responseBlogCommentItem = newBlogCommentItem;
        responseBlogCommentItem.id = doc.id;
        return response.json(responseBlogCommentItem);
    }).catch((err) => {
        console.error(err);
        response.status(500).json({ error: err || fallbackError });
    });
};

exports.createBlogCommentWithAuth = (request, response) => {
    const { text, blogId } = request.body || {};

    if (isEmpty(text)) return response.status(400).json({ error: { text: 'Must not be empty' } });
    if (isEmpty(blogId)) return response.status(400).json({ error: { blogId: 'Must be associated with some blog' } });

    const newBlogCommentItem = {
        text,
        blogId,
        isRead: false,
        createdAt: new Date().toISOString(),
        createdBy: request.user?.username,
        userId: request.user?.userId
    }

    db.collection('blog_comments').add(newBlogCommentItem).then((doc) => {
        const responseBlogCommentItem = newBlogCommentItem;
        responseBlogCommentItem.id = doc.id;
        return response.json(responseBlogCommentItem);
    }).catch((err) => {
        console.error(err);
        response.status(500).json({ error: err || fallbackError });
    });
};

exports.getBlogComments = (request, response) => {
    if (isEmpty(request?.params?.blogId)) return response.status(400).json({ error: { blogId: 'Must not be empty' } });

    db.collection('blog_comments').where('blogId', '==', request.params.blogId).orderBy('createdAt', 'desc')
        .get().then((data) => {
            let blogComments = [];
            data.forEach((doc) => {
                blogComments.push({
                    id: doc.id,
                    text: doc.data().text,
                    blogId: doc.data().blogId,
                    createdAt: doc.data().createdAt,
                    createdBy: doc.data().createdBy || null,
                    userId: doc.data().userId || null,
                });
            });
            return response.json(blogComments);
        }).catch((err) => {
            console.error(err);
            return response.status(500).json({ error: err || fallbackError });
        });
};

exports.editBlogComment = async (request, response) => {
    try {
        if (isEmpty(request?.params?.id)) return response.status(400).json({ error: { id: 'Must not be empty' } });

        if (request?.body?.id || request.body.createdAt) {
            response.status(403).json({ error: 'Not allowed to edit with this payload' });
        }

        let document = db.collection('blog_comments').doc(`${request.params.id}`);
        let doc = await document.get();

        if (!doc.exists) return response.status(404).json({ error: 'Comment not found' })

        if (doc.data().userId !== request.user.userId && request.user.role !== 'admin') {
            return response.status(403).json({ error: "UnAuthorized" })
        }

        await document.update(request.body)
        response.status(200).json({ message: 'Comment updated successfully' })
    }
    catch (err) {
        console.error(err);
        response.status(500).json({ error: err || fallbackError });
    }
};

exports.deleteBlogComment = (request, response) => {
    if (isEmpty(request?.params?.id)) return response.status(400).json({ error: { id: 'Must not be empty' } });

    const document = db.doc(`/blog_comments/${request.params.id}`);
    document.get().then((doc) => {
        if (!doc.exists) return response.status(404).json({ error: 'Comment not found' })

        if (doc.data().userId !== request.user.userId && request.user.role !== 'admin') {
            return response.status(403).json({ error: "UnAuthorized" })
        }

        return document.delete();
    }).then(() => {
        response.json({ message: 'Comment delete successfully' });
    }).catch((err) => {
        console.error(err);
        return response.status(500).json({ error: err || fallbackError });
    });
};
