class RedeNeural{
    constructor(contadorNeuronio){
        this.levels=[];
        for(let i = 0; i < contadorNeuronio.length -1; i++){
            this.levels.push(new Level(
                contadorNeuronio[i],
                contadorNeuronio[i+1]
            ));
        }
    }
    static feedForward(inputObtido, rede){
        let outputs = Level.feedForward(
            inputObtido, rede.levels[0]
        );
        for(let i = 1; i < rede.levels.length; i++){
            outputs = Level.feedForward(
                outputs,
                rede.levels[i]
            );
        }
        return outputs;
    }
}

class Level{
    constructor(inputCount, outputCount){
        this.input = new Array(inputCount);
        this.output = new Array(outputCount);
        this.sinapses = new Array(outputCount);
        
        this.peso = [];
        for (let i = 0; i < inputCount; i++) {
            this.peso[i] = new Array(outputCount);
        }
        Level.#randomiza(this);
    }

    static #randomiza (level){
        for(let i = 0; i < level.input.length; i++){
            for(let j = 0; j <level.output.length; j++ ){
                level.peso[i][j] = Math.random()*2-1;
            }
        }
        for(let i = 0; i < level.sinapses.length; i++){
            level.sinapses[i] = Math.random()*2-1;
        }
    }

    static feedForward(givenInputs,level){
        for(let i = 0; i <level.input.length; i++){
            level.input[i] = givenInputs[i];
       }
        for(let i = 0; i <level.output.length; i++){
            let soma = 0;
            for(let j = 0; j < level.input.length; j++){
                soma += level.input[j]*level.peso[j][i];
            }
            if(soma > level.sinapses[i]){
                level.output[i] = 1;
            }
            else{
                level.output[i] = 0;
            }
        }
        return level.output;
    }
}