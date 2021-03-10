const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const state = {
    hwVersion: "0.1",
    hwSerial: "0001",
    fwVersion: "0.0.1",

    wifiMode: 'AP',
    wifiConnected: false,
    ipAddr: "192.168.0.1",

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

    datetime: '2021-03-09 09:15:00'
};

io.on('connection', (socket) => {
    console.log(`Socket ${socket.id} connected`);
    socket.join('default');

    socket.on('disconnect', (reason) => {
        console.log(`Socket ${socket.id} disconnected: ${reason}`);
    })
    socket.on('getState', () => {
        socket.emit('state', state);
    });
    
    socket.emit('state', state);
    
})

http.listen(4444, () => {
    console.log('Listening on port 4444');
});

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
        io.emit('state', state);
    };

    const updateHumCurrent = (val) => {
        state.humTrend = (val > state.humCurrent) ? '+' : (val < state.humCurrent) ? '-' : '*';
        state.humCurrent = val;
        console.log(`Current humidity is now ${state.humCurrent}`);
        io.emit('state', state);
    };

    const updatePresCurrent = (val) => {
        state.presTrend = (val > state.presCurrent) ? '+' : (val < state.presCurrent) ? '-' : '*';
        state.presCurrent = val;
        console.log(`Current pressure is now ${state.presCurrent}`);
        io.emit('state', state);
    };

    const toggleWifiConnected = () => {
        state.wifiConnected = !state.wifiConnected;
        state.wifiMode = state.wifiConnected ? 'STA' : 'AP';
        console.log('WiFi is now ' + (state.wifiConnected ? '' : 'dis') + 'connected');
        io.emit('state', state);
    };

    const updateTempSet = (val) => {
        state.tempSet = val;
        state.holding = true;
        console.log(`Set temperature is now ${state.tempSet}`);
        io.emit('state', state);
    };

    const resumeSchedule = () => {
        state.tempSet = 23;
        state.holding = false;
        console.log('Resuming schedule');
        io.emit('state', state);
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
