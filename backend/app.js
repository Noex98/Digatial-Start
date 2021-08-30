// Imports
const express = require ('express');
const router = express.Router();
const morgan = require('morgan');
const cookieParser = require('cookie-parser')
const {WebSocket, WebSocketServer} = require('ws');

// Config
const app = express();
const PORT = process.env.PORT || 4000;
const wss = new WebSocketServer({ port: 4050 }, () => console.log('WS server kører på port: 4050'))

// Middleware
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));
app.use(morgan('dev'));

// Cors headers
app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});


// Websocket server 

var open_connections = ['123']

app.post('/api/wsauth', (req, res) => {

    if (open_connections.includes(req.body.room_id)){
        
        //res.cookie('room_id', req.body.room_id)
        //res.cookie('username', req.body.username)
        //res.json({req_accept: true})

    }else {
        console.log('cookie sent')
        res.cookie('test', 'test val',)
        console.log(req.cookies)
        res.json({
            req_accept: false,
            err: `Error: Room "${req.body.room_id}" does not exist`
        })
    }
})

wss.on('connection', (ws, req) => {
    console.log('new client')

    ws.on('close', () => {
        console.log('lost a client')
    })

});

// Listen for requests
app.listen(PORT, () => console.info('App kører på port: ' + PORT ));