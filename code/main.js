window.addEventListener('load', (event) => {
    main();
});

document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        console.log('Enter key was pressed!')
        // Your action here
    }
})

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
    
    let center_x = canvas.width / 2;
    let center_y = canvas.height / 2;

    create_entity("Test", "#00FF00", Math.random() * center_x, Math.random() * center_y, Math.random() - 0.5, Math.random() - 0.5)
    create_entity("Test", "#FF0000", Math.random() * center_x, Math.random() * center_y, Math.random() - 0.5, Math.random() - 0.5)
    create_entity("Test", "#0000FF", Math.random() * center_x, Math.random() * center_y, Math.random() - 0.5, Math.random() - 0.5)

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