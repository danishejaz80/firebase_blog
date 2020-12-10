const functions = require('firebase-functions');
const app = require('express')();
const auth = require('./utils/auth');

const {
    loginUser,
    signUpUser,
    getUser,
    updateUser,
    sendVerificationEmail
} = require('./APIs/users')

const {
    getAllBlogs,
    getBlog,
    createBlog,
    editBlog,
    deleteBlog
} = require('./APIs/blogs')

const {
    createBlogComment,
    getBlogComments,
    createBlogCommentWithAuth,
    editBlogComment,
    deleteBlogComment
} = require('./APIs/blog_comments')

const {
    getAllMedia
} = require('./APIs/media')

// Auth
app.post('/login', loginUser);
app.post('/signup', signUpUser);

// Users
app.get('/user', auth, getUser);
app.post('/user', auth, updateUser);

// Blogs
app.get('/blogs', getAllBlogs);
app.get('/blog/:id', getBlog);
app.post('/blog', auth, createBlog);
app.put('/blog/:id', auth, editBlog);
app.delete('/blog/:id', auth, deleteBlog);

// Blog Comments
app.get('/blog_comments/:blogId', getBlogComments);
app.post('/blog_comment', createBlogComment);
app.post('/blog_comment_with_auth', auth, createBlogCommentWithAuth);
app.put('/blog_comment/:id', auth, editBlogComment);
app.delete('/blog_comment/:id', auth, deleteBlogComment);

app.get('/media', auth, getAllMedia);

const api = functions.https.onRequest(app);
module.exports = { sendVerificationEmail, api }
