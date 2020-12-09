const { admin, db } = require('./admin');
const { fallbackError } = require('./helpers');

module.exports = (request, response, next) => {
    let idToken;

    if (request.headers.authorization?.startsWith('Bearer ')) {
        idToken = request.headers.authorization.split('Bearer ')[1];
    } else {
        console.error('No token found');
        return response.status(403).json({ error: 'Unauthorized' });
    }

    admin.auth().verifyIdToken(idToken)
        .then((decodedToken) => {
            request.user = decodedToken;
            return db.collection('users').where('userId', '==', request.user.uid).limit(1).get();
        })
        .then((data) => {
            request.user.username = data.docs[0].data().username;
            return next();
        })
        .catch((err) => {
            console.error('Error while verifying token', err);
            if (err.code === 'auth/argument-error') return response.status(403).json({ error: 'invalid authorization token' });
            else return response.status(403).json({ error: err || fallbackError });
        });
};
