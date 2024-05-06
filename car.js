class Car{
    constructor(x,y,width,height, typeOf, maxSpeed){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.speed = 0;
        this.maxSpeed = maxSpeed;
        this.acceleration = 0.2;
        this.friction = 0.05;
        this.angle = 0;
        this.damage = false;
        
        this.usarCerebro = typeOf == "PLAYER";
        
        if(typeOf != "NPC"){
            this.sensor = new Sensor(this);
            this.cerebro = new RedeNeural(
                [this.sensor.rayCount,6,4]
            );
        }
            this.controls = new Controls(typeOf);
        
    }
    update(roadBorders, traffic){
        if(!this.damage){
            this.#move();
            this.polygon = this.#createPolygon();
            this.damage = this.#calcDamage(roadBorders,traffic);
        }
        if(this.sensor){
            this.sensor.update(roadBorders,traffic);
            const offsets = this.sensor.readings.map(
                s=>s==null?0:1-s.offsets
            );
            const outputs = RedeNeural.feedForward(offsets, this.cerebro);
           // console.log(outputs);
            
            if(this.usarCerebro){
                this.controls.left = outputs[0];
                this.controls.right = outputs[1];
                this.controls.foward = outputs[2];
                this.controls.backward = outputs[3];
            }
        }
        
    }
    draw(ctx, color){
        if(this.damage){
            ctx.fillStyle = "grey";
        }
        else{
            ctx.fillStyle = color;
        }

        ctx.beginPath();
        ctx.moveTo(this.polygon[0].x,this.polygon[0].y);
        for(let i = 1; i < this.polygon.length; i++){
            ctx.lineTo(this.polygon[i].x,this.polygon[i].y);
        }
        ctx.fill();

        if(this.sensor){
            this.sensor.draw(ctx);
        }
    }

    #calcDamage(roadBorders, traffic){
        for(let i = 0; i < roadBorders.length; i++){
            if(polysIntersect(this.polygon,roadBorders[i])){
                return true;
            }
        }
        for(let i = 0; i < traffic.length; i++){
            if(polysIntersect(this.polygon,traffic[i].polygon)){
                return true;
            }
        }

    }

    #createPolygon (){
        const points = [];
        const rad = Math.hypot(this.width, this.height)/2;
        const alpha = Math.atan2(this.width, this.height);
        points.push({
            x:this.x - Math.sin(this.angle - alpha)*rad,
            y:this.y - Math.cos(this.angle - alpha)*rad
        });
        points.push({
            x:this.x - Math.sin(this.angle + alpha)*rad,
            y:this.y - Math.cos(this.angle + alpha)*rad
        });
        points.push({
            x:this.x - Math.sin(Math.PI+this.angle - alpha)*rad,
            y:this.y - Math.cos(Math.PI+this.angle - alpha)*rad
        });
        points.push({
            x:this.x - Math.sin(Math.PI+this.angle + alpha)*rad,
            y:this.y - Math.cos(Math.PI+this.angle + alpha)*rad
        });
        return points;
    }

    #move(){
        if(this.controls.foward){
            this.speed += this.acceleration;
        }
        if(this.controls.backward){
            this.speed -= this.acceleration;
        }
        if(this.speed != 0){
            
            const flip = 1;
            if(this.controls.right){
                this.angle -= 0.03*flip;
            }
            if(this.controls.left){
                this.angle += 0.03*flip;
            }
        }
        if(this.speed > this.maxSpeed){
            this.speed = this.maxSpeed;
        }
        if(this.speed < -this.maxSpeed/2){
            this.speed = -this.maxSpeed/2;
        }
        if(this.speed > 0){
            this.speed -= this.friction;
        }
        if(this.speed < 0){
            this.speed += this.friction;
        }
        if(Math.abs(this.speed) < this.friction){
            this.speed = 0;
        }
        

        this.x -= Math.sin(this.angle)*this.speed;
        this.y -= Math.cos(this.angle)*this.speed;
    }
}