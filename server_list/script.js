var list = document.getElementById("servers");

// LIST ALL KNOWN SERVER ADDRESSES IN THIS ARRAY
servers = [
    // "http://68.9.117.73:3030/",
    // "http://68.9.117.73:3031/",
    // "http://68.9.117.73:3032/",
    // "http://68.9.117.73:3033/",
    // "http://68.9.117.73:3034/",
    // "http://68.9.117.73:3035/",
    // "http://localhost:3030/",
    // "http://localhost:3031/",
    // "http://localhost:20050/",
    "http://localhost:20051/",
    "http://localhost:20052/",
    "http://localhost:20053/",
    "http://localhost:20054/",
    "http://localhost:20055/",
    "http://localhost:20056/",
    "http://localhost:20057/",
    "http://localhost:20058/",
    // "http://localhost:20056/",
];

const servers_grid = document.querySelector('#servers_grid')

for (let idx = 0; idx < servers.length; idx++) {
    let server = document.createElement("div");
    server.classList.add("server");
    server.id = "server" + idx;

    let text = document.createTextNode(servers[idx]);
    server.appendChild(text);

    server.appendChild(createPendingElement());

    list.appendChild(server);

    var xmlhttp = new XMLHttpRequest();
    var url = servers[idx] + "status.json";

    const html2 = `
                <div class="col-sm-4 my-3" id="server_${idx}">
                    <div class="card text-center p-0" style="/*width: 18rem;*/">
                        <img class="card-img-top" id="game_image" src="/images/maps/welcome" alt="Card image cap" style="filter: blur(5px);">
                        <div class="card-body" style="height: 240px;">
                            <h5 class="card-title"><strong id="map_name">Pending...</strong></h5>
                            <div class="spinner-border" id="map_spinner"></div>
                            <p class="card-text" id="map_description" style="overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; /* number of lines to show */ line-clamp: 2; -webkit-box-orient: vertical;"></p>
                            <hr />
                            <div class="col-12">
                                <small><strong class="text-danger">Mode:</strong> <span id="game_type">Pending...</span></small>
                            </div>
                            <div class="col-12">
                                <small><strong class="text-danger">Players:</strong> <span id="game_players">-</span>/<span id="game_max_players">-</span></small>
                            </div>
                            <button class="btn btn-primary mt-3" id="game_join" disabled>
                                Pending
                                <div class="spinner-border spinner-border-sm" id="map_spinner"></div>
                            </button>
                        </div>
                    </div>
                </div>
            `

    servers_grid.insertAdjacentHTML('beforeend', html2)



    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let status = JSON.parse(this.responseText);
            // console.log(status)
            update(server, servers[idx] + "play", status, idx);

            // console.log(status)

            const html = `
                <div class="col-sm-3" id="server_${idx}">
                    <div class="b-game-card">
                        <div class="py-3" id="sever_info">
                            <p><strong class="text-primary">Map:</strong> ${status['name']}</p>
                            <p><strong class="text-primary">Mode:</strong> ${status['description']}</p>
                            <p><strong class="text-primary">Players:</strong> ${status['players']}/${status['maxPlayers']}</p>
                            <button class="btn btn-primary px-3 py-2" onClick="window.location.href='${servers[idx]}play'">Join</button>
                        </div>
<!--                        <div class="b-game-card__cover" style="background-image: url(https://andrewhawkes.github.io/codepen-assets/steam-game-cards/game_1.jpg);"></div>-->
                        <div class="b-game-card__cover" style="background-image: url(${status['image']});"></div>
                    </div>
                </div>
            `

            // const html2 = `
            //     <div class="col-sm-4" id="server_${idx}">
            //         <div class="card text-center p-0" style="/*width: 18rem;*/">
            //             <img class="card-img-top" src="/images/maps/MapsImages_KingOfTheHill" alt="Card image cap">
            //             <div class="card-body">
            //                 <h5 class="card-title"><strong>${status['name']}</strong></h5>
            //                 <p class="card-text">${status['description']}</p>
            //                 <hr />
            //                 <div class="col-12">
            //                     <small><strong class="text-danger">Mode:</strong> ${status['game_type']}</small>
            //                 </div>
            //                 <div class="col-12">
            //                     <small><strong class="text-danger">Players:</strong> ${status['players']}/${status['maxPlayers']}</small>
            //                 </div>
            //                 <button class="btn btn-primary mt-3" onClick="window.location.href='${servers[idx]}play'">Join Game</button>
            //             </div>
            //         </div>
            //     </div>
            // `
            //
            // servers_grid.insertAdjacentHTML('beforeend', html2)

        } else if (this.readyState == 4 && this.status == 0) {
            // console.log('offline')
            offline(server, servers[idx], idx);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();

    document.querySelector('#servers_grid')
}

function update(server, address, status, server_id) {

    // console.log(status)

    const server_card = document.querySelector(`#server_${server_id}`)

    // Set map data
    server_card.querySelector('#game_image').setAttribute('src', status['image'])
    server_card.querySelector('#game_image').style = ''
    server_card.querySelector('#map_spinner').remove()
    server_card.querySelector('#map_name').innerText = status['name']
    server_card.querySelector('#map_description').innerText = status['description']
    server_card.querySelector('#game_type').innerText = status['game_type']
    server_card.querySelector('#game_players').innerText = status['players']
    server_card.querySelector('#game_max_players').innerText = status['maxPlayers']
    server_card.querySelector('#game_join').innerHTML = 'Join Game'
    server_card.querySelector('#game_join').removeAttribute('disabled')
    server_card.querySelector('#game_join').addEventListener('click', () => {
        window.location.href = `${servers[server_id]}play`
    })


    // removePendingElement(server);
    //
    // server.appendChild(document.createElement("br"));
    //
    // let link = document.createElement("a");
    // link.href = address;
    // link.text = status.name;
    // server.appendChild(link);
    //
    // let info = document.createElement("div");
    // info.classList.add("info");
    // addText(info, status.description);
    // info.appendChild(document.createElement("br"));
    // addText(info, status.players + "/" + status.maxPlayers + " players");
    // server.appendChild(info);
}

function offline(server, address, status) {

    const server_card = document.querySelector(`#server_${status}`)

    // Set map data
    server_card.querySelector('#map_spinner').remove()
    server_card.querySelector('#map_name').innerText = 'Server Unreachable'
    server_card.querySelector('#map_description').innerText = 'Server is offline'
    server_card.querySelector('#game_type').innerText = 'No Data'
    server_card.querySelector('#game_players').innerText = '0'
    server_card.querySelector('#game_max_players').innerText = '0'
    server_card.querySelector('#game_join').innerHTML = 'Server Unreachable'
    server_card.querySelector('#game_join').setAttribute('disabled', 'disabled')

    // removePendingElement(server);
    //
    // let info = document.createElement("div");
    // info.classList.add("info");
    // addText(info, "Server Offline");
    // server.appendChild(info);
}

function createPendingElement() {
    let div = document.createElement("div");
    div.id = "pending";

    let text = document.createTextNode("pending...");
    div.appendChild(text);
    return div;
}

function removePendingElement(node) {
    document.querySelector('#' + node.id + ' #pending').remove();
}

function addText(node, string) {
    let text = document.createTextNode(string);
    node.appendChild(text);
}
