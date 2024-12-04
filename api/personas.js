const express = require('express');
const router = express.Router();
const {conexion} = require('../bd/conexion');

router.get("/", function(req, res, next){
    const { id } = req.params;
    const sql = "SELECT * FROM personas WHERE  = ?";
        conexion.query(sql, [id], function(error, result) {
            if (error)return res.status(500).send("Ocurrió un error");
            res.json({
                status: "ok", 
                Personas: result 
            });
        });
})

router.post("/", function (req, res, next){
    const { nombre, apellido, fecha_nacimiento, domicilio, telefono, idLocalidad, DNI, telefono_trabajo, idNac, idProfesion } = req.body;
        
    const sql = `INSERT INTO personas (nombre, apellido, fecha_nacimiento, domicilio, telefono, idLocalidad, DNI, telefono_trabajo, idNac, idProfesion ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
        
        conexion.query(sql, [nombre, apellido, fecha_nacimiento, domicilio, telefono, idLocalidad, DNI, telefono_trabajo, idNac, idProfesion], function(error, result){
                if (error) {
                    console.error(error);
                    return res.send("Ocurrio un error");
                }
                res.json({status:"ok"})
        })
})

router.put("/", function(req, res, next){
    const { idPersona } = req.query;
    const { nombre, apellido, fecha_nacimiento, domicilio, telefono, idLocalidad, DNI, telefono_trabajo, idNac } = req.body;

    const sql = `UPDATE personas SET nombre = ?, apellido = ?, fecha_nacimiento = ?, domicilio = ?, telefono = ?, idLocalidad = ?, DNI = ?, telefono_trabajo = ?, idNac = ?, idProfesion = ?  WHERE idPersona = ?`;
    conexion.query(
        sql,
        [nombre, apellido, fecha_nacimiento, domicilio, telefono, idLocalidad, DNI, telefono_trabajo, idNac, idProfesion, idPersona],
        function(error,result){
            if (error) {
                console.error(error);
                res.status(500).send("ocurrio un error")
            } 
            res.json({status:"ok"})
        }
    )
})

router.delete("/", function(req, res, next){
    const { id } = req.query;

    const sql = "DELETE FROM personas WHERE idpersonas = ?";

    conexion.query(sql, [idPersona], function(error, result){
        if(error) {
            console.error(error);
            return res.status(500).send("Ocurrio un error");
        }
        res.json({status:"ok"})
    })
})

module.exports = router;