const { admin, db } = require('../utils/admin');
const config = require('../utils/config');
const { fallbackError } = require('../utils/helpers')
const firebase = require('firebase');
const functions = require('firebase-functions');
const { validateLoginData, validateSignUpData } = require('../utils/validators');
const { sendEmail } = require('../utils/sendEmail');

firebase.initializeApp(config);

exports.loginUser = async (request, response) => {
    try {
        const user = { email, password } = request.body || {};

        const { valid, error } = validateLoginData(user);
        if (!valid) return response.status(400).json({ error });

        const data = await firebase.auth().signInWithEmailAndPassword(user.email, user.password)

        if (!data.user.emailVerified) {
            return response.status(403).json({ error: "Please verify your account before sign in" });
        }

        data.user.getIdToken().then(token => {
            return response.json({ token, user: data.user });
        })
    } catch (err) {
        console.error(err);
        return response.status(403).json({ error: err || fallbackError });
    }
};

exports.signUpUser = async (request, response) => {
    const newUser = { firstName, lastName, email, phoneNumber, password, username, confirmPassword } = request.body || {};
    newUser.role = 'subscriber';

    try {
        const { valid, error } = validateSignUpData(newUser);

        if (!valid) return response.status(400).json({ error });

        let token, userId
        const doc = await db.doc(`/users/${newUser.username}`).get();
        if (doc.exists) {
            return response.status(400).json({ error: { username: 'this username is already taken' } });
        }
        const data = await firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password);

        userId = data.user.uid;

        await admin.auth().generateEmailVerificationLink(newUser.email)
            .then((link) => {
                const mailjet = require('node-mailjet').connect('edbced363ed0d53b3b42638c9000256d', '7cc531278282b71964f92642f07fb7cc')
                const request = mailjet
                    .post("send", { 'version': 'v3.1' })
                    .request({
                        "Messages": [
                            {
                                "From": {
                                    "Email": "danish.ejaz@invozone.com",
                                    "Name": "Danish"
                                },
                                "To": [
                                    {
                                        "Email": `${newUser.email}`,
                                        "Name": `${newUser.firstName} ${newUser.lastName}`
                                    }
                                ],
                                "Subject": "Blog Account Verification",
                                "TextPart": "Activate your profile",
                                "HTMLPart": `<h3>Dear ${newUser.username},</h3><h5>Your account on firebase blog has been successfully created, now you're just one step away</h5><h6><a href='${link}'>Click on this link to activate your account</a></h6>`,
                                "CustomID": "AppGettingStartedTest"
                            }
                        ]
                    })
                request.then((result) => {
                    console.log(result.body)
                }).catch((err) => {
                    console.log(err.statusCode)
                })
            })
            .catch((error) => {
                console.log(error)
            });

        delete newUser.password
        delete newUser.confirmPassword
        token = data.user.getIdToken()
        const userData = {
            ...newUser,
            createdAt: new Date().toISOString(),
            userId
        };
        await db.doc(`/users/${newUser.username}`).set(userData);

        return response.status(201).json({ token: token.i, message: 'User created successfully' });

    }
    catch (err) {
        console.error(err);
        if (err.code === 'auth/email-already-in-use') {
            return response.status(400).json({ error: { email: 'Email already in use' } });
        } else {
            return response.status(500).json({ error: err || fallbackError });
        }
    }

}

exports.logout = (request, response) => {
    firebase.auth().signOut().then(() => {
        return response.status(200).json({ message:"Logged out successfully" })
    }).catch((err) => {
        console.error(err);
        return response.status(500).json({ error: err || fallbackError });
    });
}

exports.getUser = (request, response) => {
    return response.json({ ...request.user })
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
