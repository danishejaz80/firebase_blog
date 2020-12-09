const { db } = require('../utils/admin');
const { fallbackError, isEmpty } = require('../utils/helpers')

exports.getAllBlogs = (request, response) => {
    db.collection('blogs').orderBy('createdAt', 'desc')
        .get().then((data) => {
            let blogs = [];
            data.forEach((doc) => {
                blogs.push({
                    id: doc.id,
                    title: doc.data().title,
                    readTime: doc.data().readTime,
                    body: doc.data().body,
                    createdAt: doc.data().createdAt,
                });
            });
            return response.json(blogs);
        }).catch((err) => {
            console.error(err);
            return response.status(500).json({ error: err || fallbackError });
        });
};

exports.createBlog = (request, response) => {
    const { title, body, readTime } = request.body || {};

    if (isEmpty(title)) return response.status(400).json({ error: { title: 'Must not be empty' } });
    if (isEmpty(body)) return response.status(400).json({ error: { body: 'Must not be empty' } });
    if (isEmpty(readTime)) return response.status(400).json({ error: { readTime: 'Must not be empty' } });

    const newBlogItem = {
        title,
        body,
        readTime,
        createdAt: new Date().toISOString(),
        createdBy: request.user.username,
    }

    db.collection('blogs').add(newBlogItem).then((doc) => {
        const responseBlogItem = newBlogItem;
        responseBlogItem.id = doc.id;
        return response.json(responseBlogItem);
    }).catch((err) => {
        console.error(err);
        response.status(500).json({ error: err || fallbackError });
    });
};

exports.getBlog = (request, response) => {
    if (isEmpty(request?.params?.id)) return response.status(400).json({ error: { id: 'Must not be empty' } });

    const document = db.doc(`/blogs/${request.params.id}`);
    document.get().then((doc) => {
        if (!doc.exists) return response.status(404).json({ error: 'Blog not found' })

        return response.json(doc.data());
    }).catch((err) => {
        console.error(err);
        return response.status(500).json({ error: err || fallbackError });
    });
};

exports.editBlog = (request, response) => {
    if (isEmpty(request?.params?.id)) return response.status(400).json({ error: { id: 'Must not be empty' } });

    if (request?.body?.id || request.body.createdAt) {
        response.status(403).json({ error: 'Not allowed to edit with this payload' });
    }

    let document = db.collection('blogs').doc(`${request.params.id}`);
    document.update(request.body).then(() => {
        response.json({ message: 'Blog updated successfully' });
    }).catch((err) => {
        console.error(err);
        return response.status(500).json({ error: err || fallbackError });
    });
};

exports.deleteBlog = (request, response) => {
    if (isEmpty(request?.params?.id)) return response.status(400).json({ error: { id: 'Must not be empty' } });

    const document = db.doc(`/blogs/${request.params.id}`);
    document.get().then((doc) => {
        if (!doc.exists) return response.status(404).json({ error: 'Blog not found' })
        return document.delete();
    }).then(() => {
        response.json({ message: 'Blog delete successfully' });
    }).catch((err) => {
        console.error(err);
        return response.status(500).json({ error: err || fallbackError });
    });
};
