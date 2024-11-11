const express = require('express');
const router = express.Router();
const {conexion} = require('../../bd/conexion');

router.get("/", function(req, res, next){
    const {idPersona, idEstudiante} = req.query;
    
    const sql = "SELECT * FROM responsables";
    conexion.query(sql, function(error, result){
        if (error) {
            console.error(error);
            return res.send("Ocurrio un error");
        }
        res.json ({
            status: "ok",
            responsables: result
        })
    });
    })

    router.get("/:id", function(req, res, next){
        res.send(`Ruta de responsables id ${req.params.id}`);
        })

router.post("/", function (req, res, next){
    const { idPersona, idEstudiante } = req.body;
        
    const sql = `INSERT INTO responsables (idPersona, idEstudiante) VALUES (?, ?)`
        
        conexion.query(sql, [idPersona, idEstudiante], function(error, result){
                if (error) {
                    console.error(error);
                    return res.send("Ocurrio un error");
                }
                res.json({status:"ok"})
        })
})

router.put("/", function(req, res, next){
    const { idResponsable } = req.query;
    const { idPersona, idEstudiante } = req.body;

    const sql = `UPDATE responsables SET idPersona = ?, idEstudiante = ? WHERE idResponsable = ?`;
    conexion.query(
        sql,
        [idPersona, idEstudiante , idResponsable],
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

    const sql = "DELETE FROM reponsables WHERE idResponsable = ?";

    conexion.query(sql, [idResponsable], function(error, result){
        if(error) {
            console.error(error);
            return res.status(500).send("Ocurrio un error");
        }
        res.json({status:"ok"})
    })
})

module.exports = router;