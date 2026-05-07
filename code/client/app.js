import { interpolate } from "./utils.js";

let local_entities = [];
export let local_player;

let canvas;
let ctx;

window.addEventListener('load', (event) => {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    let center_x = canvas.width / 2;
    let center_y = canvas.height / 2;
});
    setInterval(draw, 50/3);

export function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let e_len = local_entities.length;
    for (let i = 0; i < e_len; i++) {

        let e = local_entities[i];
        let rx = e.renderX - e.size / 2;
        let ry = e.renderY - e.size / 2;
        
        ctx.fillStyle = e.color;
        ctx.strokeStyle = "#232323";
        ctx.lineWidth = 2.5;
        
        ctx.beginPath();
        ctx.roundRect(rx, ry, e.size, e.size, e.size / 4);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = "black";
        ctx.font = "20px serif";
        ctx.fillText(e.name, rx, ry - e.size / 2);

        e.renderX = interpolate(e.renderX, e.x, 99);
        e.renderY = interpolate(e.renderY, e.y, 99);
    };
}

export function set_local_entities(array) {
    local_entities = array.map(e => ({
        ...e,
        renderX: e.x,
        renderY: e.y
    }));
}

export function set_local_player(p) {
    local_player = p;
}

