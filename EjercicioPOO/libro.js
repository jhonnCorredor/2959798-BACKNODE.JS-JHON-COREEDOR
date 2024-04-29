class libro{

    constructor(titulo,autor,genero,disponible){
        this.titulo = titulo;
        this.autor = autor;
        this.genero = genero;
        this.disponible = disponible;
    }

    prestar(){
        this.disponible = false;
    }

    devolver(){
        this.disponible = true;
    }
}

module.exports = libro;