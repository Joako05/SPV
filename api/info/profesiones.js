const express = require('express');
const router = express.Router();
const {conexion} = require('../../bd/conexion');

router.get("/", function(req, res, next){
    const {nombreNac} = req.query;
    
    const sql = "SELECT * FROM profesiones";
    conexion.query(sql, function(error, result){
        if (error) {
            console.error(error);
            return res.send("Ocurrio un error");
        }
        res.json ({
            status: "ok",
            profesiones: result
        })
    });
    })

    router.get("/:id", function(req, res, next){
        res.send(`Ruta de profesiones id ${req.params.id}`);
        })

router.post("/", function (req, res, next){
    const { nombreProf } = req.body;
        
    const sql = `INSERT INTO profesiones (nombreProf) VALUES (?)`
        
        conexion.query(sql, [nombreProf], function(error, result){
                if (error) {
                    console.error(error);
                    return res.send("Ocurrio un error");
                }
                res.json({status:"ok"})
        })
})

router.put("/", function(req, res, next){
    const { idProfesion } = req.query;
    const { nombreProf } = req.body;

    const sql = `UPDATE profesiones SET nombreProf = ? WHERE idProfesion = ?`;
    conexion.query(
        sql,
        [nombreProf, idProfesion],
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

    const sql = "DELETE FROM nacionalidades WHERE idNac = ?";

    conexion.query(sql, [idNac], function(error, result){
        if(error) {
            console.error(error);
            return res.status(500).send("Ocurrio un error");
        }
        res.json({status:"ok"})
    })
})

module.exports = router;