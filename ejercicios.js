const { rejects } = require("node:assert");
const { resolve } = require("node:path");
const readline = require("node:readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });


  let notas = [
      {
        titulo: "despertar.",
        descripcion: "despertar a las 7am."
      }
  ]

// 1callback-------------

   function guardarNota(titulo,descripcion){
       let nota = {titulo: titulo, descripcion: descripcion}
       notas.push(nota);
       console.log(`Nota registrada:
      titulo: ${titulo}, 
      descripcion: ${descripcion}`);
   }

   function  añadirNota(callback){
      rl.question("ingrese titulo: ", (titulo) => {
          rl.question("ingrese descripcion: ", (descripcion) => {
              callback(titulo,descripcion);
              rl.close()
          })
      })
  }

  añadirNota(guardarNota);

// 2callback anidado --------------------

    function guardarNota(titulo,descripcion){
        let nota = {titulo: titulo, descripcion: descripcion}
        notas.push(nota);
        console.log(`Nota registrada:
      titulo: ${titulo}, 
      descripcion: ${descripcion}`);
    }

    function  inputNota(callback){
       rl.question("ingrese titulo: ", (titulo) => {
        rl.question("ingrese descripcion: ", (descripcion) => {
            callback(titulo,descripcion);
            rl.close()
        })
       })
    }

    function añadirNota(callback) {
       console.log("Siga las siguientes indicaciones para añadir nota:");
       callback(guardarNota)
    }

   añadirNota(inputNota);

// 3promise -------------------

  function consultarNotas() {
      return new Promise((resolve,reject) => {
          setTimeout(()=>{
              resolve(notas);
          },2000  )
      })
  }

  function mostrarNotas() {
      console.log("Notas registradas:");
      consultarNotas()
      .then((resulta)=>{
          console.log(resulta);
      })
  }

  mostrarNotas();

// 4promise manejo de errores ---------------

   function consultarNotasErr() {
       return new Promise((resolve,reject) => {
           setTimeout(()=>{
               if (notas.length == 0) {
                   reject(new Error("no hay notas guardadas."))
               }else{
                   resolve(notas);
               }
           },2000  )
       })
   }

   function mostrarNotasErr() {
       console.log("Notas registradas:");
       consultarNotasErr()
       .then((resulta)=>{
           console.log(resulta);
       })
       .catch((error)=>{
           console.log(error.message);
       })
   }

   mostrarNotasErr();

// 5Promesa encadenada -----------------------

 function guardarNota(titulo, descripcion) {
     return new Promise((resolve, reject) => {
         let nota = { titulo: titulo, descripcion: descripcion };
         notas.push(nota);
         console.log(`Nota registrada:
         titulo: ${titulo}, 
         descripcion: ${descripcion}`);
         resolve();
     });
 }

 function inputNota() {
     return new Promise((resolve, reject) => {
         rl.question("Ingrese título: ", (titulo) => {
             rl.question("Ingrese descripción: ", (descripcion) => {
                 resolve({ titulo, descripcion });
             });
         });
     });
 }

 function añadirNota() {
     return new Promise((resolve, reject) => {
         console.log("Siga las siguientes indicaciones para añadir nota:");
         resolve();
     });
 }

 añadirNota()
     .then(() => inputNota())
     .then(({ titulo, descripcion }) => guardarNota(titulo, descripcion))
     .then(() => rl.close())
     .catch((error) => {
         console.error("Ocurrió un error:", error);
         rl.close();
     });

// 6Async await --------------------------

   function consultarNotasAsyn() {
       return new Promise((resolve,reject) => {
           setTimeout(()=>{
               resolve(notas);
           },2000  )
       })
   }

   async function mostrarNotasAsync(){
       console.log("Notas registradas: ");
       let notasRegistros = await consultarNotasAsyn();
       console.log(notasRegistros);
   }

   mostrarNotasAsync();

//  7Async await manejo de errores------------------

    function consultarNotasErrAsyn() {
        return new Promise((resolve,reject) => {
            setTimeout(()=>{
                if (notas.length == 0) {
                    reject(new Error("no hay notas guardadas."))
                }else{
                    resolve(notas);
                }
            },2000  )
        })
    }

    async function mostrarNotasAsyncErr(){
        console.log("Notas registradas: ");
        try {
            let notasRegistros = await consultarNotasErrAsyn();
            console.log(notasRegistros);
        } catch (error) {
            console.log(error.message);
        }
    }

    mostrarNotasAsyncErr();

