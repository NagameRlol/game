import * as Main from "./main.js";

const actions = {
    "a": [
        () => Main.m_array[0] = true,
        () => Main.m_array[0] = false
    ],
    "d": [
        () => Main.m_array[1] = true,
        () => Main.m_array[1] = false
    ],
    "w": [
        () => Main.m_array[2] = true,
        () => Main.m_array[2] = false
    ],
    "s": [
        () => Main.m_array[3] = true,
        () => Main.m_array[3] = false
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

