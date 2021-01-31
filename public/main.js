var socket = io.connect('http://localhost:8080', {'forceNew': true });

socket.on("cycle", function(data){
    wsParse(data);
});

socket.on("alarm", function(data){
    wsParseAlarm(data);
});

function wsParse (data){
    document.getElementById("ipap").innerHTML = data.ipap + " (cmH2O)";
    document.getElementById("epap").innerHTML = data.epap + " (cmH2O)";
    document.getElementById("breathing_freq").innerHTML = data.breathing_freq + " (rpm)";
    document.getElementById("tidal_volume").innerHTML = data.tidal_volume + " (ml expirado)";
    document.getElementById("volume_per_minute").innerHTML = data.volume_per_minute + " (ml inspirado)";
    document.getElementById("oxygen_percentage").innerHTML = data.oxygen_percentage + " (FiO2)";
};

function wsParseAlarm (data){
    document.getElementById("type").innerHTML = data.type;
    document.getElementById("criticality").innerHTML = data.criticality;
};
