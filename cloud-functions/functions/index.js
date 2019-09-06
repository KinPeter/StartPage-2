const functions = require('firebase-functions');
const Firestore = require('@google-cloud/firestore');
const cors = require('cors')({ origin: true });
const moment = require('moment');
const nodemailer = require('nodemailer');

const firestore = new Firestore({ projectId: 'p-kin-startpage' });

const gmail = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: '--------------',
        pass: '--------------'
    }
});
const now = moment().format('YYYY-MM-DD');
const emailData = {
    from: '"My Startpage" <deeasind@gmail.com>',
    to: 'kinpeter85@gmail.com',
    subject: 'Startpage database backups @ ' + now,
    attachments: []
};

exports.backupDatabases = functions.https.onRequest(async (request, response) => {
    cors(request, response, async () => {
        let newElem;
        try {
            const notesData = [];
            const notesSnapshot = await firestore.collection('notes').get();
            notesSnapshot.forEach((doc) => {
                newElem = doc.data();
                newElem.id = doc.id;
                notesData.push(newElem);
            });

            emailData.attachments[0] = {
                filename: `notes_${now}.json`,
                content: JSON.stringify(notesData)
            };

            const linksData = [];
            const linksSnapshot = await firestore.collection('links').get();
            linksSnapshot.forEach((doc) => {
                newElem = doc.data();
                newElem.id = doc.id;
                linksData.push(newElem);
            });

            emailData.attachments[1] = {
                filename: `links_${now}.json`,
                content: JSON.stringify(linksData)
            };

            const tilesData = [];
            const tilesSnapshot = await firestore.collection('tiles').get();
            tilesSnapshot.forEach((doc) => {
                newElem = doc.data();
                newElem.id = doc.id;
                tilesData.push(newElem);
            });

            emailData.attachments[2] = {
                filename: `tiles_${now}.json`,
                content: JSON.stringify(tilesData)
            };

            await gmail.sendMail(emailData);
    
            response.status(200).json({message: 'Email sent.'});

        } catch(error) {
            response.status(500).json({message: 'An error occured.', reason: error});
        }
    });
});
