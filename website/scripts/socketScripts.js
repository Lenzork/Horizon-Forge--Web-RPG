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
        var Options = document.createElement("td");
        var loginButton = document.createElement("button");
        loginButton.innerHTML = "Login";
        if(server.online){
            var adresse = new URL("http://localhost:" + server.port);
            loginButton.onclick = () => {window.location.href = adresse + "login"};
        }

        var createButton = document.createElement("button");
        createButton.innerHTML = "Create";
        if(server.online){
            var adresse = new URL("http://localhost:" + server.port);
            createButton.onclick = () => {window.location.href = adresse};
        }

        Options.appendChild(loginButton);
        Options.appendChild(createButton);

        var thrdSvThing = document.createElement("tr");

        mother.appendChild(svThing);
        mother.appendChild(scndSvThing);
        mother.appendChild(Options);
        mother.appendChild(thrdSvThing);
    })
})