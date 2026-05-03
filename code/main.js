import * as InputListener from "./inputListener.js";
import * as Utils from "./utils.js";

window.addEventListener('load', (event) => {
    main();
});

let entities = [];
let canvas;
let ctx;

function Entity () {
    this.name = "Entity";
    this.color = "#FF0000";
    this.x = 0.0;
    this.y = 0.0;
    this.vx = 0.0;
    this.vy = 0.0;
    this.size = 20;
    this.controllable = false;
} 

function main() {
    console.log("The 'main()' function is running.");

    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    let center_x = canvas.width / 2;
    let center_y = canvas.height / 2;

    for (let i = 0; i < 10; i++) {
        let r_color = Math.floor(Math.random() * 16777215).toString(16);
        create_entity("Test", 
            r_color, 
            Math.random() * center_x + center_x / 2, 
            Math.random() * center_y + center_y / 2, 
            Math.random() - 0.5, 
            Math.random() - 0.5,
            Math.random() * 40,
            false
        )
    }
    create_entity("Player", "red", 0, 0, 0, 0, 50, true);

    setInterval(function() {
        update();
    }, 2);

    InputListener.initialize();
}

function update() {
    draw();

    let e_len = entities.length;
    for (let i = 0; i < e_len; i++) {
        let e = entities[i];

        e.x += e.vx;
        e.y += e.vy;
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    let e_len = entities.length;
    for (let i = 0; i < e_len; i++) {
        let e = entities[i];
        
        ctx.fillStyle = e.color;
        ctx.fillRect(e.x, e.y, 20, 20);
    }
}

function create_entity(name, color, x, y, vx, vy, size, controllable) {
    let e = new Entity;
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