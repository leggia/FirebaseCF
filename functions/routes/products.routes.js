const { Router } = require ('express')
const router= Router()

const admin=require ('firebase-admin');
const db=admin.firestore();

router.post("/api/productos", async (req, res)=> {
    try{
        await db
        .collection("productos")
        .doc("/" + req.body.id +"/")
        .create({contenido: req.body.contenido,
        nombreComercial: req.body.nombreComercial});
    return res.status(204).json();
    }
    catch(error){

        console.log(error);
        return res.status(500).send(error);
    }
    
});
router.get('/api/productos/:id', (req, res) =>{
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
router.get('/api/productos', async (req, res) =>{
    try {
        const query =db.collection('productos');
    const querySnapshot= await query.get();
    const docs =querySnapshot.docs;
    const response = docs.map((doc) => ({
        id: doc.id,
        cont: doc.data().contenido,
        name: doc.data().nombreComercial,
        precioV: doc.data().precioVenta
    }));
    return res.status(200).json(response);
    } catch (error) {
        return res.status(500).send(error);
    }
});

router.delete('/api/productos/:id', async (req, res) =>{
    try {
        const document =db.collection('productos').doc(req.params.id);
        await document.delete();
        return res.status(204).json();
    } catch (error) {
        return res.status(500).send(error);
    }
});
router.put('/api/productos/:id', async (req, res) =>{
    try {
        const document= db.collection('productos').doc(req.params.id);
        await document.update({
            contenido: req.body.contenido,
            nombreComercial: req.body.nombreComercial
        });
        return res.status(200).json();
    } catch (error) {
        return res.status(500).send(error);
    }
})

module.exports=router