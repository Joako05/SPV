const express = require('express');
const router = express.Router();
const {conexion} = require('../../bd/conexion');

router.get("/", function(req, res, next){
    const {nombre_materia} = req.query;
    
    const sql = "SELECT * FROM materias";
    conexion.query(sql, function(error, result){
        if (error) {
            console.error(error);
            return res.send("Ocurrio un error");
        }
        res.json ({
            status: "ok",
            Materias: result
        })
    });
    })

    router.get("/:id", function(req, res, next){
        res.send(`Ruta de materias id ${req.params.id}`);
        })

router.post("/", function (req, res, next){
    const { nombre_materia } = req.body;
        
    const sql = `INSERT INTO materias (nombre_materia) VALUES (?)`
        
        conexion.query(sql, [nombre_materia], function(error, result){
                if (error) {
                    console.error(error);
                    return res.send("Ocurrio un error");
                }
                res.json({status:"ok"})
        })
})

router.put("/", function(req, res, next){
    const { id_materia } = req.query;
    const { nombre_materia } = req.body;

    const sql = `UPDATE materias SET nombre_materia = ? WHERE id_materia = ?`;
    conexion.query(
        sql,
        [nombre_materia, id_materia],
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
    const { id_materia } = req.query;

    const sql = "DELETE FROM materias WHERE id_materia = ?";

    conexion.query(sql, [id_materia], function(error, result){
        if(error) {
            console.error(error);
            return res.status(500).send("Ocurrio un error");
        }
        res.json({status:"ok"})
    })
})

module.exports = router;