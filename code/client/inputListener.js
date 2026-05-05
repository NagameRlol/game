import { m_array } from "./main.js";

const actions = {
    "a": [
        () => m_array[0] = true,
        () => m_array[0] = false
    ],
    "d": [
        () => m_array[1] = true,
        () => m_array[1] = false
    ],
    "w": [
        () => m_array[2] = true,
        () => m_array[2] = false
    ],
    "s": [
        () => m_array[3] = true,
        () => m_array[3] = false
    ]
};

document.addEventListener('keydown', function(event) {
    const key = event.key.toLowerCase();
    if (actions[key]) {
        actions[key][0]();
    }
    console.log(m_array);
});

document.addEventListener('keyup', function(event) {
    const key = event.key.toLowerCase();
    if (actions[key]) {
        actions[key][1]();
     }
    console.log(m_array);
});

