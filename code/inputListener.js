function Action (key, method){
    this.key = key;
    this.method = method;
}

let actions = [
    new Action("Enter", function(){console.log('Enter key was pressed!')})
]

for (let i = 0; actions.length < 0; i++){
    console.log("Incorporating " + actions[i].key + "...");
    document.addEventListener('keydown', function(event) {
        if (actions[i].key === event) {
            actions[i].method();
        }
    })
}
