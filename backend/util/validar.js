const validator = require("validator");

const validarArticulo = (parametros) => {
    let errores = {};

    if (validator.isEmpty(parametros.titulo)) {
        errores.titulo = "El título es obligatorio.";
    } else if (!validator.isLength(parametros.titulo, { min: 5, max: undefined })) {
        errores.titulo = "El título debe tener al menos 5 caracteres.";
    }

    if (validator.isEmpty(parametros.contenido)) {
        errores.contenido = "El contenido es obligatorio.";
    }

    if (Object.keys(errores).length > 0) {
        throw new Error(JSON.stringify(errores));
    }
}

const validarIdArticulo = (id) => {
    if (validator.isEmpty(id) || !validator.isLength(id, { min: 24, max: 24 })) {
        throw new Error("ID de artículo inválido.");
    }
}

const validarUsuario = (parametros) => {
    let errores = {};

    if (validator.isEmpty(parametros.name)) {
        errores.name = "El nombre es obligatorio.";
    } else if (!validator.isLength(parametros.name, { min: 5, max: undefined })) {
        errores.name = "El nombre debe tener al menos 5 caracteres.";
    }

    if (validator.isEmpty(parametros.password)) {
        errores.password = "La contraseña es obligatoria.";
    } else if (!validator.isLength(parametros.password, { min: 6, max: 12 })) {
        errores.password = "La contraseña debe tener entre 6 y 12 caracteres.";
    }

    if (Object.keys(errores).length > 0) {
        throw new Error(JSON.stringify(errores));
    }
}

const validarNombreUsuario = (nombre) => {
    if (validator.isEmpty(nombre) || !validator.isLength(nombre, { min: 5, max: undefined })) {
        throw new Error("Nombre de usuario inválido.");
    }
}

const validarIdUsuario = (id) => {
    if (validator.isEmpty(id) || !validator.isLength(id, { min: 24, max: 24 })) {
        throw new Error("ID de usuario inválido.");
    }
}

const validarPractica = (parametros) => {
    let errores = {};

    if (validator.isEmpty(parametros.name_practice)) {
        errores.name_practice = "El nombre de la práctica es obligatorio.";
    }
    if (validator.isEmpty(parametros.student_name)) {
        errores.name_practice = "El nombre de la práctica es obligatorio.";
    }

    if (validator.isEmpty(parametros.company)) {
        errores.company = "El nombre de la empresa es obligatorio.";
    }

    if (validator.isEmpty(parametros.date_start)) {
        errores.date_start = "La fecha de inicio es obligatoria.";
    } else if (!validator.isDate(parametros.date_start)) { //<-validamos que sea una fecha
        errores.date_start = "La fecha de inicio no es válida.";
    }

    if (validator.isEmpty(parametros.description)) {
        errores.description = "La descripción es obligatoria.";
    }

    if (Object.keys(errores).length > 0) {
        throw new Error(JSON.stringify(errores));
    }
}


module.exports = {
    validarArticulo,
    validarIdArticulo,
    validarUsuario,
    validarNombreUsuario,
    validarIdUsuario,
    validarPractica 
}