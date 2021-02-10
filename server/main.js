const { COPYFILE_FICLONE } = require('constants');
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server, {
    cors: {
        origin: '*',
      }
});

app.use(express.static('public'));

var path = require('path');

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '../../interfazSocketsPrueba/public/web.html'));
  });

var param = {};
var param_modes = {mode : ["VCP", "VPS"],
                ie_relation : ["1:3", "1:2", "1:1", "3:1", "2:1"]
            };

var cycle = {};

var readings = {};

var alarm = {};
var alarmas_tipos = {type : ["apnea", "disconnect", "min_pressure", "max_pressure", "min_volume", "max_volume", "max_frequency", "oxygen"],
            criticality : ["normal", "high"],
            };

setInterval(function(){
    param = {mode: param_modes.mode[Math.random() * param_modes.mode.length],
            ipap : Math.floor((Math.random() * 100) % 5),
            epap : Math.floor((Math.random() * 100) % 100),
            breathing_freq : Math.floor((Math.random() * 100) % 5),
            ie_relation :  param_modes.ie_relation[Math.random() * param_modes.ie_relation.length],
            trigger : Math.floor((Math.random() * 100) % 5),
    }

    cycle = {ipap : param.ipap,
            epap : param.epap,
            breathing_freq : param.breathing_freq,
            tidal_volume : Math.floor((Math.random() * 100) % 100),
            volume_per_minute : Math.floor((Math.random() * 100) % 5),
            oxygen_percentage : Math.floor((Math.random() * 100) % 100),
    }

    alarm = {type : alarmas_tipos.type[Math.floor(Math.random() * alarmas_tipos.type.length)],
            criticality : alarmas_tipos.criticality[Math.floor(Math.random() * alarmas_tipos.criticality.length)],
    }
}, 1000);

setInterval(function(){
    readings = {timestamp : Math.floor(Date.now()/1000),
                flow: Math.floor((Math.random() * 100) % 100), // litros/min
                pressure: Math.floor((Math.random() * 100) % 40), // cmH2
                volume: Math.floor((Math.random() * 1000) % 1000), // mililitros
    }
    
}, 1000);

io.on('connection', function(socket){

    console.log('Se mandan los parámetros del respirador');

    setInterval(function() {
        socket.emit("cycle", cycle);
        socket.emit("alarm", alarm);
        socket.emit("readings", readings);
    }, 1000);

});

server.listen(8000, function(){
    console.log('Servidor corriendo en http://localhost:8000');

});
