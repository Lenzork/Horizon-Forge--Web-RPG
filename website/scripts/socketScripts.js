var socket = io();

socket.on("loadServers", (servers) => {
    servers.forEach(server => {
        var mother = document.getElementById("serverTable");
        var svThing = document.createElement("td");
        svThing.innerHTML = server.name;
        var scndSvThing = document.createElement("td");
        if(server.online){
            scndSvThing.innerHTML = "🟢";
        } else {
            scndSvThing.innerHTML = "🔴";
        }
        var thrdSvThing = document.createElement("tr");

        mother.appendChild(svThing);
        mother.appendChild(scndSvThing);
        mother.appendChild(thrdSvThing);
    })
})