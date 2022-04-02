import express from 'express'
import bodyParser from "body-parser";
import crypto from "crypto"
import 'dotenv/config'
const app = express()
const port =  process.env.PORT || 5000


app.use(bodyParser.json());
app.use(express.json());

app.post('/webhook', (req, res) => {
    const params = req.body.data;
    const hmac = crypto.createHmac('sha512', process.env.API_KEY);
    hmac.update(JSON.stringify(params, Object.keys(params).sort()));
    const signature = hmac.digest('hex');
    if (signature === req.body.signature) {
        // this is a valid webhook from ChainGate
        // process the request here
        console.log("Valid WebHook from ChainGate");
    } else {
        console.log("Invalid WebHook from ChainGate");
    }
    console.log(params);
    res.sendStatus(200)
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})