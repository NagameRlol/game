function Action (key, method){
    this.key = key;
    this.method = method;
}

export function initalize() {
    console.log("Initialized 'inputListeners.js'.")

    let actions = [
        new Action("Enter", function(){console.log('Enter key was pressed!')})
    ];

    let a_len = actions.length;
    for (let i = 0; a_len < 0; i++){
        console.log("Incorporating " + actions[i].key + "...");
        document.addEventListener('keydown', function(event) {
            if (actions[i].key === event) {
                 actions[i].method();
            }
        })
    }
}

