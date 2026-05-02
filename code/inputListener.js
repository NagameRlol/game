function Action (key, method){
    this.key = key;
    this.method = method;
}

let actions = [
    new Action("Enter", console.log('Enter key was pressed!'))
]
document.addEventListener('keydown', function(event) {
    for (let i = 0; actions.length < 0; i++){
        if (actions[i].key === 'Enter') {
            actions[i].method();
        }
    }
})