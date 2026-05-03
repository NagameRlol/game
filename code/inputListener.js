function Action (key, method){
    this.key = key;
    this.method = method;
}

export function initialize() {

    const actions = {
        "enter": () => {
            console.log("Pressed enter!");
        },
        "w": () => {
            console.log("Pressed W!");
        },
        "a": () => {
            console.log("Pressed A!");
        }
    };

    document.addEventListener('keydown', function(event) {
        const key = event.key.toLowerCase();

        if (actions[key]) {
            actions[key]();
        }
    });
}

