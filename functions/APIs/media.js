const { Storage } = require('@google-cloud/storage');
const { fallbackError } = require('../utils/helpers')
const { storageBucket } = require('../utils/config')

exports.getAllMedia = async (req, res) => {
    try {
        const storage = new Storage();
        const [files] = await storage.bucket(storageBucket).getFiles();
        const result = files.map(file => "https://storage.cloud.google.com/" + storageBucket + "/" + file.name)
        res.status(200).send(result);
    } catch (err) {
        console.error(err);
        response.status(500).json({ error: err || fallbackError });
    }
};
