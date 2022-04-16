require('dotenv').config();
const express = require('express');
const app     = express();
const admin     = process.env.admin;


// used to serve static files from public directory
app.use(express.static('public'));


// function used to secure all routes
async function verifyToken(req,res,next){
    const idToken = req.headers.authorization;
    console.log('idToken:', idToken);

    if(idToken){
        admin.auth().verifyIdToken(idToken)
            .then(function(decodedToken) {
                console.log('DecodedToken:',decodedToken);
                console.log('Decoded token success!');
                return next();
            }).catch(function(error) {
                console.log('Decoded token fail!');
                return res.status(401).send('You are not authorized');
            });
    }
    else{
        console.log('Token not found!');
        return res.status(401).send('You are not authorized');        
    }
}
app.use('/auth', verifyToken);


app.get('/open', function(req,res){
    res.send('Open Route!');
})

app.get('/auth', function(req,res){
    res.send('Authentication Sucess!');
})

app.listen(3000, () => {
    console.log('Running on port: 3000');
})