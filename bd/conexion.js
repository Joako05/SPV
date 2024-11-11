const mysql = require ('mysql2');
const conexion = mysql.createConnection({

    host:"ctpoba.edu.ar",
    user:"sosaj",
    password:"46334107",
    database:"24_72_D",

});

conexion.connect(function(error){
    if (error){
        console.error(error);
        return;
    }

    console.log("conectado exitosamente a la db");
} )

module.exports = { conexion }
