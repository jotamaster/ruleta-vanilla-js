

console.log('carga js')

let boxs = ["first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eighth"]

let miscajitas = document.getElementsByClassName("box")

let boxsALive = [0,1,2,3,4,5,6,7]

//funcion que es ejecutada por el boton 
function randomDiv(){

    let randomNumber = 0

    //se crea la promesa llamada ruleta la cual hace el efecto de activar las cajas aleatoriamente 
    const ruleta = new Promise((resolve, reject) => {
        
            for(let index = 0; index < boxs.length; index++ ){   
                   setTimeout(function(){
                    randomNumber = random_item(boxsALive);

                        //for para eliminar la clase active a cualquier cajita
                       for (let indexActive = 0; indexActive < miscajitas.length; indexActive++) {
                           miscajitas[indexActive].classList.remove("active");
                       }
                       
                       // selecciono la cajita aleatoria para agregarle la clase active
                       let cajita = document.getElementById(boxs[randomNumber])
                       cajita.classList.add("active")

                       // valido que solo en la ultima vuelta del bucle se resuelva la promesa
                       // la promesa retorna el numero random editado por ultima vez para saber cual eliminar
                       if(index >= (boxs.length -1)){
                            resolve(randomNumber);
                        }

                   }, index*500);
           }
           
      });


    // ejecuto mi promesa ruleta "cajita" es la respuesta de mi promesa en el resolve linea 35
    ruleta.then((cajita)=>{
    // pesco cual es la cajita eliminada y le agrego la clase deleted
    let cajitaEliminada = document.getElementById(boxs[cajita])
    cajitaEliminada.classList.add('deleted')

    //mando a llamar a la funcion que se encarga de eliminar de las cajitas vivas la nueva cajita muerta
    eliminarCajita(cajita)
    
    })
}


//esta es la funcion que entrega un numero random segun los items que se les pase ejem: [1,2,3]
function random_item(items){
    return items[Math.floor(Math.random()*items.length)];
}

//a esta funcion se le pasa cual cajita es la eliminada y la quita de las boxsAlive
function eliminarCajita(cajita){
    for( var i = 0; i < boxsALive.length; i++){ 
        if ( boxsALive[i] === cajita) { 
            boxsALive.splice(i, 1); 
        } 
    }
}




