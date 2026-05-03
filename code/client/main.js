import * as InputListener from "./inputListener.js";
import * as Utils from "./utils.js";

window.addEventListener('load', (event) => main());

let entities = [];

let canvas;

let ctx;

// m_array[0] is left, m_array[1] is right, m_array[2] is up and m_array[3] is down.
export let m_array = [false, false, false, false];

function Entity () {
    this.id = -1;
    this.name = "Entity";
    this.color = "#FF0000";
    this.x = 0.0;
    this.y = 0.0;
    this.vx = 0.0;
    this.vy = 0.0;
    this.size = 20.0;
    this.controllable = false;
    this.speed = 0.1;
    this.drag = 0.97;
} 

function main() {
    console.log("The 'main()' function is running.");

    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    let center_x = canvas.width / 2;
    let center_y = canvas.height / 2;

    create_entity(-1, "Player", "red", 0, 0, 0, 0, 50, true);

    setInterval(function() {
        update();
    }, 2);
}

function update() {
    draw();

    let e_len = entities.length;
    for (let i = 0; i < e_len; i++) {
        let e = entities[i];

        e.x += e.vx;
        e.y += e.vy;

        e.vx *= e.drag;
        e.vy *= e.drag;
        
        if (e.controllable) {
            if (m_array[0]) {
                e.vx -= e.speed;
            };
            if (m_array[1]) {
                e.vx += e.speed;
            };
            if (m_array[2]) {
                e.vy -= e.speed;
            };
            if (m_array[3]) {
                e.vy += e.speed;
            };
        };

    };
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    let e_len = entities.length;
    for (let i = 0; i < e_len; i++) {

        let e = entities[i];
        let rx = e.x - e.size / 2;
        let ry = e.y - e.size / 2
        
        ctx.fillStyle = e.color;
        ctx.strokeStyle = "#232323";
        ctx.lineWidth = 2.5;

        ctx.beginPath();
        ctx.roundRect(rx, ry, e.size, e.size, e.size / 4);
        ctx.fill();
        ctx.stroke();
    
    }
}

function create_entity(id, name, color, x, y, vx, vy, size, controllable) {
    let e = new Entity;
    e.id = id;
    e.name = name;
    e.color = color;
    e.x = x;
    e.y = y;
    e.vx = vx;
    e.vy = vy;
    e.size = size;
    e.controllable = controllable;
    entities.push(e);
}