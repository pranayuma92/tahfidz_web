const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from pandu!");
});

const cors = require('cors')({
origin: true,
});
exports.AddUser = functions.https.onRequest(( req, res ) => {
// Grab the text parameter.

cors( req, res, ()  => {
    let email  = req.body.email;
    let passwd = req.body.passwd;
    let role   = req.body.role;
    const token = req.get('Authorization').split('Bearer ')[1];

    admin.auth().verifyIdToken(token)
    .then(
            (decoded) => { 
             // return res.status(200).send(  decoded )
             return creatUser(decoded);
            })
    .catch((err) => {
            return res.status(401).send(err) 
     });

    function creatUser(user){
      admin.auth().createUser({
          email: email,
          emailVerified: false,
          password: passwd,
          disabled: false
        })
        .then((result) => {
          console.log('result',result);
           return res.status(200).send(result);
        }).catch((error) => {
           console.log(error.message);
           return res.status(400).send(error.message);
       })
     }

   }); 
 });
