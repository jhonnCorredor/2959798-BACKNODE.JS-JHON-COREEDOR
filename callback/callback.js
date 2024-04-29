function cuadrado(numeros,callback){
    return numeros.map(callback)
}

function operacion(item) {
    return item*item;
}

let arreglo=[1,2,4,5,6,7,8,9,10];

let cuadrados= cuadrado(arreglo,operacion)

console.log(cuadrados);

//-------------------------------------------------------


let persona ={
    nombre: "Pedro",

    hacerTarae(callback){
        callback(this.nombre);
    }

}

function Caminar(nombre){
    console.log(`${nombre} esta caminando`);
}

function lavarLoza(nombre) {
    console.log(`${nombre} esta lavando loza`);
}

persona.hacerTarae(Caminar);
// persona.hacerTarae(lavarLoza);