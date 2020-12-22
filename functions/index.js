const functions = require('firebase-functions');
const express = require ('express')
const admin=require ('firebase-admin')

const app=express()
admin.initializeApp({
    credential: admin.credential.cert('./permiso.json'),
    databaseUrl:""
})
const db=admin.firestore()

app.get('/hello-world', (req, res) => {
    return res.status(200).json({message: 'hola Mundo'})
})
app.post('/api/productos', async (req, res)=>{
    await db.collection('productos1').doc("/"+ req.body.id+"/")
    .create({name: req.body.name})
    return res.status(204).json();
})

exports.app=functions.https.onRequest(app);

