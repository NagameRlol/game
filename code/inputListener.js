function Action (key, method){
    this.key = key;
    this.method = method;
}

let actions = [
    new Action("Enter", console.log('Enter key was pressed!'))
]
for (let i = 0; actions.length < 0; i++){
    document.addEventListener('keydown', function(event) {
        if (actions[i].key === event) {
            actions[i].method();
        }
    })
}
