const { fallbackError, isEmpty } = require('../utils/helpers')
const { admin, db } = require('../utils/admin');
const firebase = require('firebase');

exports.createBlogComment = (request, response) => {
    const { text, blogId } = request.body || {};

    if (isEmpty(text)) return response.status(400).json({ error: { text: 'Must not be empty' } });
    if (isEmpty(blogId)) return response.status(400).json({ error: { blogId: 'Must be associated with some blog' } });

    const newBlogCommentItem = {
        text,
        blogId,
        isRead: false,
        createdAt: admin.database.ServerValue.TIMESTAMP
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
        const document = db.collection('blog_comments').doc(`${request.params.id}`);
        const doc = await document.get();

        if (!doc.exists) return response.status(404).json({ error: 'Comment not found' })

        if (doc.data().userId !== request.user.userId && request.user.role !== 'admin') {
            return response.status(403).json({ error: "UnAuthorized" })
        }

        await document.update(request.body)
        response.status(200).json({ message: 'Comment updated successfully' })
    } catch (err) {
        console.error(err);
        response.status(500).json({ error: err || fallbackError });
    }
};

exports.deleteBlogComment = async (request, response) => {
    try {
        const document = db.doc(`/blog_comments/${request.params.id}`);
        const doc = await document.get()

        if (!doc.exists) return response.status(404).json({ error: 'Comment not found' })

        if (doc.data().userId !== request.user.userId && request.user.role !== 'admin') {
            return response.status(403).json({ error: "UnAuthorized" })
        }

        document.delete();
        response.json({ message: 'Comment delete successfully' });
    } catch (err) {
        console.error(err);
        response.status(500).json({ error: err || fallbackError });
    }
};
