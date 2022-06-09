import express from 'express'
import bodyParser from "body-parser";
import crypto from "crypto"
import 'dotenv/config'
const app = express()
const port =  process.env.PORT || 5000
import { engine } from 'express-handlebars';
import 'dotenv/config'


app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

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

app.get('/order', (req, res) => {
    let key = process.env.API_KEY
    let callBackBaseURL = process.env.CALLBACK_BASE_URL
    let backendURL = process.env.BACKEND_URL
    res.render('order', {key, callBackBaseURL, backendURL});
})

app.get('/success', (req, res) => {
    res.render('success');
})

app.get('/failure', (req, res) => {
    res.render('failure');
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})