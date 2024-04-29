const readline = require("node:readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let aprendiz = {
  nombre: "Juan",
};

let instructor = {
  nombre: "Carlos",
  respuesta: "si",
};

function hacerPregunta(aprendiz, instructor) {
  return new Promise((resolve, reject) => {
      setTimeout(() => {
            rl.question("Ingrese pregunta: ", (question) => {
          if ("puedo traerle la tarea mañana" === question.toLowerCase()) {
            resolve(
              `${instructor.nombre}: Si, pero tráelo completo y con sustentación.`
            );
          } else {
            reject(
              new Error(
                `${instructor.nombre}: No sabría contestarle en este momento.`
              )
            );
          }
        });
      },
      2000
    );
  });
}

function chat() {
  console.log(
    `${aprendiz.nombre}: Buenos días instructor ${instructor.nombre}`
  );
  setTimeout(() => {
    console.log(
      `${instructor.nombre}: Buenos días aprendiz ${aprendiz.nombre}`
    );
  },2000);
  hacerPregunta(aprendiz, instructor)
    .then((resultado) => {
      console.log(resultado);
      rl.question("¿Desea continuar? (si/no): ", (respuesta) => {
        if (respuesta.toLowerCase() === "si") {
          chat();
        } else {
          rl.close();
        }
      });
    })
    .catch((error) => {
      console.log(error.message);
      rl.question("¿Desea continuar? (si/no): ", (respuesta) => {
        if (respuesta.toLowerCase() === "si") {
          chat();
        } else {
          rl.close();
        }
      });
    });
}

chat();
