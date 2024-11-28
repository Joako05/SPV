const express = require('express');
const router = express.Router();
const {conexion} = require('../../bd/conexion');

router.get("/", function(req, res, next){
    
    const sql = "SELECT * FROM Profesores";
    conexion.query(sql, function(error, result){
        if (error) {
            console.error(error);
            return res.send("Ocurrio un error");
        }
        res.json ({
            status: "ok",
            profesores: result
        })
    });
    })

router.get("/:id", function(req, res, next){
    const { id } = req.params;
    const sql = "SELECT * FROM Profesores WHERE idProfesor = ?";
        conexion.query(sql, [id], function(error, result) {
            if (error)return res.status(500).send("Ocurrió un error");
            res.json({
                status: "ok", 
                profesor: result 
            });
        });
})

router.post("/", function (req, res, next){
    const { idPersona } = req.body;
        
    const sql = `INSERT INTO Profesores (idPersona) VALUES (?)`
        
        conexion.query(sql, [idPersona], function(error, result){
                if (error) {
                    console.error(error);
                    return res.send("Ocurrio un error");
                }
                res.json({status:"ok"})
        })
})

router.put("/", function(req, res, next){
    const { idProfesor } = req.query;
    const { idPersona } = req.body;

    const sql = `UPDATE Profesores SET idPersona = ? WHERE idProfesor = ?`;
    conexion.query(
        sql,
        [idPersona, idProfesor],
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

    const sql = "DELETE FROM Profesores WHERE idProfesor = ?";

    conexion.query(sql, [idProfesor], function(error, result){
        if(error) {
            console.error(error);
            return res.status(500).send("Ocurrio un error");
        }
        res.json({status:"ok"})
    })
})

module.exports = router;