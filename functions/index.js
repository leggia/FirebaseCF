const functions = require('firebase-functions');
const express = require("express");
const admin=require ('firebase-admin');

const app=express();
const ServiceAccount= require("./permiso.json");
admin.initializeApp({
    credential: admin.credential.cert(ServiceAccount),
    //credential: admin.credential.applicationDefault(),
    databaseURL:"https://fir-cf-cd71d.firebaseio.com",
});


app.get("/hello-world", (req, res) => {
    return res.status(200).json({message: "hola Mundo 23"})
});

app.use(require('./routes/products.routes'))
exports.app=functions.https.onRequest(app);