const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });

admin.initializeApp();

exports.getDownloadUrl = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const filePath = req.query.filePath;
    const file = admin.storage().bucket().file(filePath);
    const expires = Date.now() + 60 * 60 * 1000; // 1 hour
    try {
      const [url] = await file.getSignedUrl({
        action: 'read',
        expires,
      });
      res.status(200).json({ url });
    } catch (error) {
      console.error("Error generating signed URL:", error);
      res.status(500).send("Error generating signed URL");
    }
  });
});
