class Controls{
    constructor(typeOf){
        this.foward = false;
        this.backward = false;
        this.right = false;
        this.left = false;
        switch (typeOf){
            case "PLAYER":
                this.#addKeyboardListeners();
                break;
            case "NPC":
                this.foward = true;
                break;
        }
    }
    
    #addKeyboardListeners(){
            document.onkeydown = (event)=>{
                switch(event.key){
                    case "ArrowLeft":
                        this.left = true;
                        break;
                    case "ArrowRight":
                        this.right = true;
                        break;
                    case "ArrowUp":
                        this.foward = true;
                        break;
                     case "ArrowDown":
                        this.backward = true;
                        break;
                }
            }

            document.onkeyup = (event)=>{
                switch(event.key){
                    case "ArrowLeft":
                        this.left = false;
                        break;
                    case "ArrowRight":
                        this.right = false;
                        break;
                    case "ArrowUp":
                        this.foward = false;
                        break;
                     case "ArrowDown":
                        this.backward = false;
                        break;
                }
            }
    }
}