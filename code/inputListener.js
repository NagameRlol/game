import * as Main from "./main.js";

export function initialize() {
    console.log(Main.m_array);

    const actions = {
        "a": [
                () => main.m_array[0] = true,
                () => main.m_array[0] = false
            ],
        "d": [
                () => main.m_array[1] = true,
                () => main.m_array[1] = false
            ],
        "w": [
                () => main.m_array[2] = true,
                () => main.m_array[2] = false
            ],
        "s": [
                () => main.m_array[3] = true,
                () => main.m_array[3] = false
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

