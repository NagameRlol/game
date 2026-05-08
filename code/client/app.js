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
    local_entities.forEach((e) => {
        let rx = e.x - e.size / 2;
        let ry = e.y - e.size / 2;

        ctx.fillStyle = e.color;
        ctx.strokeStyle = "#232323";
        ctx.lineWidth = 2.5;
        
        ctx.rotate(e.angle);
        ctx.beginPath();
        ctx.roundRect(rx, ry, e.size, e.size, e.size / 4);
        ctx.fill();
        ctx.stroke();

        ctx.rotate(0.0);
        ctx.fillStyle = "black";
        ctx.font = "20px serif";
        ctx.fillText(e.name, rx, ry - e.size / 2);

        e.x += vx * 0.1;
        e.y += vy * 0.1;
    });
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

