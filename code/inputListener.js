function Action (key, method){
    this.key = key;
    this.method = method;
}

export function initalize() {

    let actions = [
        new Action("Enter", function(){
            console.log("Pressed enter!");
        }),
        new Action("W", function(){
            console.log("Pressed W!");
        }),
        new Action("A", function(){
            console.log("Pressed A!");
        })
    ];

    for (let i = 0; i < actions.length; i++){
        let a = actions[i];
        console.log("Incorporating key: " + a.key + "...");
        document.addEventListener('keydown', function(event) {
            if (a.key === event) {
                 a.method();
            }
        })
    }
}

