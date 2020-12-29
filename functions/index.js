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
const db=admin.firestore();

app.get("/hello-world", (req, res) => {
    return res.status(200).json({message: "hola Mundo 23"})
});

app.post("/api/productos", async (req, res)=> {
    try{
        await db
        .collection("productos")
        .doc("/" + req.body.id +"/")
        .create({name: req.body.name});
    return res.status(204).json();
    }
    catch(error){

        console.log(error);
        return res.status(500).send(error);
    }
    
});
app.get('/api/productos/:id', (req, res) =>{
   (async () =>{
    try {
        const doc = db.collection("productos").doc(req.params.id);
        const item = await doc.get();
        const response = item.data();
        return res.status(200).json(response);
    } catch (error) {
         return res.status(500).send(error);
     }
   })();
});
app.get('/api/productos', async (req, res) =>{
    try {
        const query =db.collection('productos');
    const querySnapshot= await query.get();
    const docs =querySnapshot.docs;
    const response = docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name
    }));
    return res.status(200).json(response);
    } catch (error) {
        return res.status(500).send(error);
    }
});

app.delete('/api/productos/:id', async (req, res) =>{
    try {
        const document =db.collection('productos').doc(res.params.id);
        await document.delete();
        return res.status(204).json();
    } catch (error) {
        return res.status(500).send(error);
    }
});
exports.app=functions.https.onRequest(app);