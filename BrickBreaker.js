
let pantalla
let pantallaAncho = 800
let pantallaAltura = 700
let bloques = []

let jugador  = {
    posicionx: pantallaAncho/2 - 50,
    posiciony: pantallaAltura - 15,
    ancho: 100,
    altura: 15,
    velocidad: 15,

}

let pelota = {

    posicionx: pantallaAncho/2,
    posiciony: pantallaAltura/2,
    ancho: 15,
    altura: 15,
    velocidadx:4,
    velocidady:2

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


    canvas.fillStyle = "orange"
    moverPelota();
    canvas.fillRect(pelota.posicionx,pelota.posiciony,pelota.ancho,pelota.altura);

    canvas.fillStyle = "yellow"
    for(let i = 0; i<bloques.length;i++){
        let bloqueD = bloques[i];
        if(!bloqueD.roto){
            verificarChoque(pelota,bloqueD);
            canvas.fillRect(bloqueD.posicionx,bloqueD.posiciony,bloqueD.ancho,bloqueD.altura);
        } 
        
    }


    requestAnimationFrame(actualizar);

}

function moverPelota(){

    if(pelota.posicionx + pelota.ancho >= pantallaAncho || pelota.posicionx <= 0){
        pelota.velocidadx = pelota.velocidadx * -1;
        
    }

    if(detectarColisiones(pelota,jugador)){
        
        pelota.velocidady = pelota.velocidady * -1;
    } 

    if(pelota.posiciony <= 0){
        pelota.velocidady = pelota.velocidady * -1;
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
        
        pelota.velocidady *= -1;

    }



} 

function Bloques(){

    let columnas = 20;
    let filas = 10;
    
    for(let i = 0;i<columnas;i++){
        for(let j = 0;j<filas;j++){
            
            let bloque = {
                posicionx: 103 + i*15 + i*15,
                posiciony: 25 + j*15 + j*15,
                ancho: 20,
                altura:15,
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
