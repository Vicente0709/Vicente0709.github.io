import {initializeApp} from "firebase/app";
import {getFirestore, collection, getDocs, query, where, addDoc, doc, updateDoc, deleteDoc} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAq3PWrGxMVqAcvfXwpC21vzsSQlVI-AdM",
    authDomain: "polimarket-93916.firebaseapp.com",
    projectId: "polimarket-93916",
    storageBucket: "polimarket-93916.appspot.com",
    messagingSenderId: "624045411960",
    appId: "1:624045411960:web:55537b983ead1f3516e78d"
};

// Initialize Firebase
const appFB = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(appFB);

import express from 'express';
import multer from 'multer';
import cors from 'cors';
import mimeTypes from 'mime-types';

const app = express()
app.use(express.json());
app.use(cors());
const port = 3000

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: function (req, file, cb) {
        cb(null, Date.now() + "." + mimeTypes.extension(file.mimetype));
    }
});

const upload = multer({
    storage: storage
});

app.get('/', (req, res) => {
    res.send('Polimarket !!')
});

// read all products
app.get('/polimarket/read', (req, res) => {
    (async () => {
        try {
            let response = [];
            const querySnapshot = await getDocs(collection(db, "products"));
            querySnapshot.forEach((doc) => {
                const selectedItem = {
                    id: doc.id,
                    product: doc.data()
                };
                response.push(selectedItem);
            });
            return res.status(200).send(response);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();

});

// read one product
app.get("/polimarket/read/:item_id", (req, res) => {
    (async () => {
        try {
            let response = [];
            const q = query(collection(db, "products"), where("ID", "==", req.params.item_id));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                const selectedItem = {
                    id: doc.id,
                    product: doc.data(),
                };
                response.push(selectedItem);
            });
            return res.status(200).send(response);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();
});

// create Product
app.post('/polimarket/create', upload.single('image'), (req, res) => {
    (async () => {
        try {
            console.log(req.body);
            
            let data = {
                "user": req.body.user,
                // "ID": 2,
                "type": req.body.type,
                "title": req.body.title,
                "state": req.body.state,
                "description": req.body.description,
                "count": req.body.count,
                "value": req.body.value,
                "image": req.file.filename
            }

            console.log(data);

            const docRef = await addDoc(collection(db, "products"), data);
            const docId = docRef.id;
            await updateDoc(doc(db, "products", docId), {
                ID: docId
            });
            return res.status(200).send(`Document written with ID:  ${docRef.id}`);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();
});


// update Product
app.put('/polimarket/update/:item_id', (req, res) => {
    (async () => {
        try {
            console.log(req.params.item_id);
            const productDocument = doc(db, "products", req.params.item_id);
            await updateDoc(productDocument, req.body.product);
            return res.status(200).send("Producto actualizado");
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();
});

// delete Product
app.delete("/polimarket/delete/:item_id", (req, res) => {
    (async () => {
        try {
            await deleteDoc(doc(db, "products", req.params.item_id));
            return res.status(200).send("Producto eliminado");
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});
