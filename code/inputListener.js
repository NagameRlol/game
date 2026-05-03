// m_array[0] is left, m_array[1] is right, m_array[2] is up and m_array[3] is down.
let m_array = [false, false, false, false];

export function initialize() {
    const actions = {
        "w": [
                () => console.log("Pressed the W key!"),
                () => console.log("Released the W key!")
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

