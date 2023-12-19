const express = require('express');
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = process.env.PORT || 3001;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const { exec } = require('child_process');
let mac;
const helmet = require('helmet');
app.use(helmet());
const uri = "mongodb+srv://vishwaraviraaj08:root@ctseventdrivenframework.x7hjhhn.mongodb.net/";
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});


async function addUser(userJSON) {
    try {
        await client.connect();
        await client.db("CTSEventDrivenFrameWork").collection("users").insertOne(userJSON);
        console.log("Successfully added user to the database");
        return true;
    } finally {
        await client.close();
    }
}


app.post('/', async (req, res) => {
    const formData = req.body;
    formData['mac'] = mac;
    // formData['ipAddress']
    console.log(JSON.stringify(formData, null, 2));


    try {
        const result = await addUser(formData);
        if (result) {
            res.status(200);
        } else {
            res.status(500);
        }
    } catch (e) {
        console.error(e);
        res.status(500).send("Something Went Wrong");
    }
});



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    exec('getmac', (err, stdout) => {
        if (err) {
            console.error(err);
            return;
        }
        const macAddresses = stdout.match(/([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})/g);
        const macAddress = macAddresses ? macAddresses[0] : 'Not found';
        mac = macAddress;
        console.log(`MAC Address: ${macAddress}`);
    });
});



app.post('/signin', (req, res) => {
});
