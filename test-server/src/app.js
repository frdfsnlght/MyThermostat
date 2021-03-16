
const WebSocket = require('ws')
 
const listenPort = 4201;

const wsServer = new WebSocket.Server({ port: listenPort })

const info = {
    buildTag: '0.0.1', // git describe
    buildCommit: '6bbf7bd', // git rev-parse --short HEAD
    wifiMode: 'AP',
    netIP: '192.168.0.1',
    netAddr: '01:02:03:04:05:06'
};

const state = {
    wifiConnected: false,

    tempSet: 23,
    tempCurrent: 22,
    humCurrent: 34,
    presCurrent: 110,
    tempTrend: '-',
    humTrend: '+',
    presTrend: '*',
    
    holding: true,

    heatOn: false,
    coolOn: false,
    fanOn: false,

    datetime: (new Date()).toISOString()
};

function emitToSocket(socket, message, data = null) {
    var msg = {message: message};
    if (data !== null)
    msg['data'] = data;
    json = JSON.stringify(msg);
    socket.send(json);
    console.log('->', json);
}

function emitToAll(msg, data = null) {
    wsServer.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
            emitToSocket(client, msg, data);
        }
    });
}

wsServer.on('connection', (socket) => {
    console.log(`Connected`);

    socket.on('close', (code, message) => {
        console.log(`Disconnected: ${code} ${message}`);
    });
    socket.on('error', (err) => {
        console.error(`Error: ${err}`);
    });
    socket.on('message', (json) => {
        console.log('<-', json);
        var msg = JSON.parse(json);
        if (! ((typeof msg === 'object' && msg !== null))) {
            console.error(`Invalid message: ${json}`);
            return;
        }
        if (! msg.hasOwnProperty('message')) {
            console.error(`Missing message property`);
            return;
        }
        switch (msg.message) {
            case 'connect':
                emitToSocket(socket, 'connected');
                break;
            case 'getInfo':
                emitToSocket(socket, 'info', info);
                break;
            case 'getState':
                emitToSocket(socket, 'state', state);
                break;
            default:
                console.error(`Unknown message: ${msg.message}`);
                break;
        }
    });   

})    

console.log(`Listening on port ${listenPort}`);

var stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');
console.log('Enter command or ? for help');
stdin.on('data', (cmd) => {

    const updateTempCurrent = (val) => {
        state.tempTrend = (val > state.tempCurrent) ? '+' : (val < state.tempCurrent) ? '-' : '*';
        state.tempCurrent = val;
        console.log(`Current temperatue is now ${state.tempCurrent}`);
        emitToAll('state', state);
    };

    const updateHumCurrent = (val) => {
        state.humTrend = (val > state.humCurrent) ? '+' : (val < state.humCurrent) ? '-' : '*';
        state.humCurrent = val;
        console.log(`Current humidity is now ${state.humCurrent}`);
        emitToAll('state', state);
    };

    const updatePresCurrent = (val) => {
        state.presTrend = (val > state.presCurrent) ? '+' : (val < state.presCurrent) ? '-' : '*';
        state.presCurrent = val;
        console.log(`Current pressure is now ${state.presCurrent}`);
        emitToAll('state', state);
    };

    const toggleWifiConnected = () => {
        state.wifiConnected = !state.wifiConnected;
        state.wifiMode = state.wifiConnected ? 'STA' : 'AP';
        console.log('WiFi is now ' + (state.wifiConnected ? '' : 'dis') + 'connected');
        emitToAll('state', state);
    };

    const updateTempSet = (val) => {
        state.tempSet = val;
        state.holding = true;
        console.log(`Set temperature is now ${state.tempSet}`);
        emitToAll('state', state);
    };

    const resumeSchedule = () => {
        state.tempSet = 23;
        state.holding = false;
        console.log('Resuming schedule');
        emitToAll('state', state);
    }
    
    switch (cmd) {
        case '\u0003':
        case '\u0004':
        case 'x':
        case 'X':
            console.log('Goodbye');
            process.exit();
            break;
        case '?':
            console.log('T          raise current temperature');
            console.log('t          lower current temperature');
            console.log('H          raise current humidity');
            console.log('h          lower current humidity');
            console.log('P          raise current pressure');
            console.log('p          lower current pressure');
            console.log('w          toggle wifi connection state');
            console.log('+          increase set temperature, initiate hold')
            console.log('-          decrease set temperature, initiate hold')
            console.log('*          deactivate hold, resume schedule')
            console.log('x          exit');
            break;
        case 'T': updateTempCurrent(state.tempCurrent + 1); break;
        case 't': updateTempCurrent(state.tempCurrent - 1); break;
        case 'H': updateHumCurrent(state.humCurrent + 1); break;
        case 'h': updateHumCurrent(state.humCurrent - 1); break;
        case 'P': updatePresCurrent(state.presCurrent + 1); break;
        case 'p': updatePresCurrent(state.presCurrent - 1); break;
        case 'w': toggleWifiConnected(); break;
        case '+': updateTempSet(state.tempSet + 1); break;
        case '-': updateTempSet(state.tempSet - 1); break;
        case '*': resumeSchedule(); break;


        default:
            return;
    }
    console.log('Enter command or ? for help');
});
