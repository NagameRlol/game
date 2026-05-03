import * as InputListener from "./inputListener.js";
import * as Utils from "./utils.js";
import * as Network from "./network.js";

window.addEventListener('load', (event) => main());

let local_entities = [];
let canvas;
let ctx;

// m_array[0] is left, m_array[1] is right, m_array[2] is up and m_array[3] is down.
export let m_array = [false, false, false, false];

function main() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    let center_x = canvas.width / 2;
    let center_y = canvas.height / 2;

    setInterval(function() {
        update();
    }, 2);
}

function update() {
    draw();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    let e_len = local_entities.length;
    for (let i = 0; i < e_len; i++) {

        let e = local_entities[i];
        let rx = e.x - e.size / 2;
        let ry = e.y - e.size / 2
        
        ctx.fillStyle = e.color;
        ctx.strokeStyle = "#232323";
        ctx.lineWidth = 2.5;

        ctx.beginPath();
        ctx.roundRect(rx, ry, e.size, e.size, e.size / 4);
        ctx.fill();
        ctx.stroke();
    };
}