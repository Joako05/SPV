const express = require('express');
const router = express.Router();
const {conexion} = require('../../bd/conexion');

router.get("/", function(req, res, next){
    
    const sql = "SELECT * FROM Estudiantes";
    conexion.query(sql, function(error, result){
        if (error) {
            console.error(error);
            return res.send("Ocurrio un error");
        }
        res.json ({
            status: "ok",
            estudiantes: result
        })
    });
    })

router.get("/:id", function(req, res, next){
    const { id } = req.params;
    const sql = "SELECT * FROM Estudiantes WHERE idEstudiante = ?";
        conexion.query(sql, [id], function(error, result) {
            if (error)return res.status(500).send("Ocurrió un error");
            res.json({
                status: "ok", 
                estudiantes: result 
            });
        });
})

router.post("/", function (req, res, next){
    const { idPersona } = req.body;
        
    const sql = `INSERT INTO Estudiantes (idPersona) VALUES (?)`
        
        conexion.query(sql, [idPersona], function(error, result){
                if (error) {
                    console.error(error);
                    return res.send("Ocurrio un error");
                }
                res.json({status:"ok"})
        })
})

router.put("/", function(req, res, next){
    const { idEstudiante } = req.query;
    const { idPersona } = req.body;

    const sql = `UPDATE Estudiantes SET idPersona = ? WHERE idEstudiantes = ?`;
    conexion.query(
        sql,
        [idPersona, idAdministrador],
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
    const { idEstudiante } = req.query;

    const sql = "DELETE FROM Estudiantes WHERE idEstudiante = ?";

    conexion.query(sql, [idEstudiante], function(error, result){
        if(error) {
            console.error(error);
            return res.status(500).send("Ocurrio un error");
        }
        res.json({status:"ok"})
    })
})

module.exports = router;