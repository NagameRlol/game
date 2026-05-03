export function initialize() {

    const actions = {
        "w": [
            () => {
                console.log("Pressed the W key!");
            },

            () => {
                console.log("Released the W key!");
            }
        ]
    };

    document.addEventListener('keydown', function(event) {
        const key = event.key.toLowerCase();

        if (actions[key]) {
            actions[key][0]();
        }
    });

    document.addEventListener('keyup', function(event) {
        const key = event.key.toLowerCase();

        if (actions[key]) {
            actions[key][1]();
        }
    });
}

