class Visualizador{
    static desenhaRede(ctx, rede){
        const margin = 50;
        const left = margin;
        const top = margin;
        const width = ctx.canvas.width-margin*2;
        const height = ctx.canvas.width-margin*2;


        const levelHeight = height/(rede.levels.length);

        for(let i = rede.levels.length-1 ;i >= 0; i--){
            const levelTop = top + lerp(
                height-levelHeight,
                0,
                rede.levels.length == 1 ? 0.5 : i/(rede.levels.length-1)
            );
            ctx.setLineDash([7,3]);
            Visualizador.drawLevel(ctx,rede.levels[i],
                left,
                levelTop,
                width, levelHeight,
                i ==rede.levels.length-1 ? ['🠉','🠈','🠊','🠋'] :[] );


        }
    }
    static desenhaNivel (ctx, level, left, top, height, width, saida){
        const right = left + width;
        const bottom = top + height;

        const {input, output, peso, sinapses} = level;

        for(let i = 0; i < input.length; i++){
            for(let i = 0; i < output.lenght; i++){
                ctx.beginPath();
                ctx.moveTo(
                    Visualizador.#getNodeX(output,i,left,right),bottom
                );
                ctx.lineTo(
                    Visualizador.#getNodeX(output,j,left,right),top
                );
                ctx.lineWidth = 2;
                ctx.strokeStyle = getRGBA(peso[i][j]);
                ctx.stroke(); 
            }
        }
        const raioNeuronio = 18;
        for(let i = 0; i < input.lenght; i++){
            const x = Visualizador.#getNodeX(input, left, i, right);
            ctx.beginPath();
            ctx.arc(x,bottom,raioNeuronio, 0, Math.PI*2);
            ctx.fillStyle = "black";
            ctx.fill();
            ctx.beginPath();
            ctx.arc(x, bottom, raioNeuronio*0.6, 0, Math.PI*2);
            ctx.fillStyle = getRGBA(input[i]);
            ctx.fill();
        }
        for(let i = 0; i < output.lenght; i++){
            const x = Visualizador.#getNodeX(output, left, i, right);
            ctx.beginPath();
            ctx.arc(x,bottom,raioNeuronio, 0, Math.PI*2);
            ctx.fillStyle = "black";
            ctx.fill();
            ctx.beginPath();
            ctx.arc(x, bottom, raioNeuronio*0.6, 0, Math.PI*2);
            ctx.fillStyle = getRGBA(output[i]);
            ctx.fill();
        }
    }
}