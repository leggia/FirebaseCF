const functions = require('firebase-functions');
const express = require ('express')
const admin=require ('firebase-admin')

const app=express()
admin.initializeApp({
    credential: admin.credential.cert('./permiso.json'),
    databaseUrl:""
})
app.get('/hello-world', (req, res) => {
    return res.status(200).json({message: 'hola Mundo'})
})
exports.app=functions.https.onRequest(app);

