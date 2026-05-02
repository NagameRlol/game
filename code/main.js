import * as Matter from "code/matter.js";

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
} 

function main() {
    console.log("The 'main()' function is running.");

    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    create_entity("Test", "#00FF00", 0, 0, 1, 1)
    create_entity("Test", "#FF0000", 0, 0, 2, 1)
    create_entity("Test", "#0000FF", 0, 0, 1, 2)

    setInterval(function() {
        update();
    }, 2);

    print(Matter);
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

function create_entity(name, color, x, y, vx, vy) {
    let e = new Entity;
    e.name = name;
    e.color = color;
    e.x = x;
    e.y = y;
    e.vx = vx;
    e.vy = vy;
    entities.push(e);
}