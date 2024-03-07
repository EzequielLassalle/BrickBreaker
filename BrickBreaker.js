
let pantalla
let pantallaAncho = 800
let pantallaAltura = 700

let bloques = []
let columnasB = 10;
let filasB = 2;
let numeroDeBloques = columnasB * filasB;


let jugador  = {
    posicionx: pantallaAncho/2 - 50,
    posiciony: pantallaAltura - 15,
    ancho: 160,
    altura: 15,
    velocidad: 15,

}

let pelota = {

    posicionx: pantallaAncho/2,
    posiciony: pantallaAltura/2,
    ancho: 20,
    altura: 20,
    velocidadx:1,
    velocidady:6

}



window.onload = function(){

    pantalla = document.getElementById("pantalla");
    pantalla.height = pantallaAltura;
    pantalla.width = pantallaAncho;
    
    
    canvas = pantalla.getContext("2d"); 
    requestAnimationFrame(actualizar);
    document.addEventListener("keydown", mover);

    Bloques();


}

function actualizar(){

    canvas.clearRect(0,0,pantallaAncho,pantallaAltura);
    canvas.fillStyle = "blue";
    canvas.fillRect(jugador.posicionx,jugador.posiciony,jugador.ancho,jugador.altura)


    canvas.fillStyle = "yellow"
    moverPelota();
    canvas.fillRect(pelota.posicionx,pelota.posiciony,pelota.ancho,pelota.altura);

    canvas.fillStyle = "red"
    for(let i = 0; i<bloques.length;i++){
        let bloqueD = bloques[i];
        if(!bloqueD.roto){
            verificarChoque(pelota,bloqueD);
            canvas.fillRect(bloqueD.posicionx,bloqueD.posiciony,bloqueD.ancho,bloqueD.altura);
        } 
        
    }


    requestAnimationFrame(actualizar);

}

function verificarBloques(){
    if (numeroDeBloques <= 0){
        filasB += 2;
        Bloques();
    }
}

let aleatorio;

function moverPelota(){

    if(pelota.posicionx + pelota.ancho >= pantallaAncho || pelota.posicionx <= 0){
        pelota.velocidadx = pelota.velocidadx * -1;
        
    }

    aleatorio = Math.floor(Math.random() * 100) + 1;

    if(detectarColisiones(pelota,jugador)){
        
        if(aleatorio < 75){
            pelota.velocidady = pelota.velocidady * -1;
        }else{
            pelota.velocidady = pelota.velocidady * -1;
            pelota.velocidadx = pelota.velocidady * -1;
        }

        verificarBloques();

    } 

    aleatorio = Math.floor(Math.random() * 100) + 1;

    if(pelota.posiciony <= 0 && (aleatorio <= 75)){
        pelota.velocidady = pelota.velocidady * -1;
        
    }

    if(pelota.posiciony <= 0 && (aleatorio > 75)){
        pelota.velocidady = pelota.velocidady * -1;
        pelota.velocidadx = pelota.velocidadx * -1;

    }

    if(pelota.posiciony + pelota.altura >= pantallaAltura){
        
    } 


    pelota.posicionx += pelota.velocidadx;
    pelota.posiciony += pelota.velocidady;


}

function mover(event){

    if(event.code == "KeyW" && !(borde(jugador.posicionx - jugador.velocidad))){
        jugador.posicionx -= jugador.velocidad;
    }
    else if(event.code == "KeyE" && !(borde(jugador.posicionx + jugador.velocidad))){
        jugador.posicionx += jugador.velocidad;
    }


}

///Esta implementada asi por si en el futuro le quiero agregar funcionalidades

function detectarColisiones(bloqueA,bloqueB){

    let colisiones = 0;

    if(bloqueA.posicionx < bloqueB.posicionx + bloqueB.ancho){
        colisiones++;
    }

    if(bloqueA.posicionx + bloqueA.ancho > bloqueB.posicionx){
        colisiones++;
    }

    if(bloqueA.posiciony + bloqueA.altura > bloqueB.posiciony){
        colisiones++;
    }

    if(bloqueA.posiciony < bloqueB.posiciony + bloqueB.altura){
        colisiones++;
    }

    if(colisiones == 4){
        return true;
    }

    return false;

}



function verificarChoque(pelota,bloque){

    if(detectarColisiones(pelota,bloque)){
        bloque.roto = true;
        numeroDeBloques -= 1;
        aleatorio = Math.floor(Math.random() * 100) + 1;
        
        if(aleatorio>50){
            pelota.velocidady *= -1;
        }else if(aleatorio<50){
            pelota.velocidady *= -1;
            pelota.velocidadx *= -1;
        }
             

    }
}




function Bloques(){

    bloques = []
    numeroDeBloques = columnasB * filasB;

    for(let i = 0;i<columnasB;i++){
        for(let j = 0;j<filasB;j++){
            
            let bloque = {
                posicionx: 125 + i*15 + i*40,
                posiciony: 25 + j*15 + j*30,
                ancho: 50,
                altura:30,
                roto: false,
            }

            bloques.push(bloque);
            

        }
    }


}




function borde(posicion){

    if(posicion < 0){
        return true
    }

    if(posicion + jugador.ancho > pantallaAncho){
        return true
    }

    return false;

}
