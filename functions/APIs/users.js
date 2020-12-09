const { db } = require('../utils/admin');
const config = require('../utils/config');
const fallbackError = require('../utils/helpers')
const firebase = require('firebase');
const { validateLoginData, validateSignUpData } = require('../utils/validators');

firebase.initializeApp(config);

exports.loginUser = (request, response) => {
    const { email, password } = request.body || {};

    const user = {
        email,
        password
    }

    const { valid, error } = validateLoginData(user);
    if (!valid) return response.status(400).json({ error });

    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then((data) => {
            return data.user.getIdToken();
        }).then((token) => {
            return response.json({ token });
        }).catch((err) => {
            console.error(err);
            return response.status(403).json({ error: err || fallbackError });
        })
};

exports.signUpUser = (request, response) => {
    const { firstName, lastName, email, phoneNumber, password, username } = request.body || {};

    const newUser = {
        firstName,
        lastName,
        email,
        phoneNumber,
        password,
        username,
        role: 'subscriber',
        isVerified: false
    };

    const { valid, error } = validateSignUpData(newUser);

    if (!valid) return response.status(400).json({ error });

    let token, userId;
    db.doc(`/users/${newUser.username}`).get()
        .then((doc) => {
            if (doc.exists) {
                return response.status(400).json({ error: { username: 'this username is already taken' } });
            } else {
                return firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password);
            }
        })
        .then((data) => {
            userId = data.user.uid;
            return data.user.getIdToken();
        })
        .then((tokenId) => {
            token = tokenId;
            delete newUser.password
            const userData = {
                ...newUser,
                createdAt: new Date().toISOString(),
                userId
            };
            return db.doc(`/users/${newUser.username}`).set(userData);
        })
        .then(() => {
            return response.status(201).json({ token, message: 'User created successfully' });
        })
        .catch((err) => {
            console.error(err);
            if (err.code === 'auth/email-already-in-use') {
                return response.status(400).json({ error: { email: 'Email already in use' } });
            } else {
                return response.status(500).json({ error: err || fallbackError });
            }
        });
}

exports.getUser = (request, response) => {
    db.doc(`/users/${request.user.username}`).get()
        .then((doc) => {
            if (!doc.exists) return response.status(404).json({ error: 'User not found' })

            return response.json(doc.data())
        })
        .catch((err) => {
            console.error(err);
            return response.status(500).json({ error: err || fallbackError });
        });
}

exports.updateUser = (request, response) => {
    let document = db.collection('users').doc(`${request.user.username}`);
    document.update(request.body)
        .then(() => {
            response.json({ message: 'Updated successfully' });
        })
        .catch((err) => {
            console.error(err);
            return response.status(500).json({ error: err || fallbackError });
        });
}
