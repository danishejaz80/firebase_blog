const functions = require('firebase-functions');
const app = require('express')();
const auth = require('./utils/auth');

const {
    getAllBlogs,
    getBlog,
    createBlog,
    editBlog,
    deleteBlog
} = require('./APIs/blogs')

const {
    loginUser,
    signUpUser,
    getUser,
    updateUser
} = require('./APIs/users')

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

exports.api = functions.https.onRequest(app);
