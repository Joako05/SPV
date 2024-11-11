const express = require('express');
const router = express.Router();
const {conexion} = require('../../bd/conexion');

router.get("/", function(req, res, next){
    const {idPersona} = req.query;
    
    const sql = "SELECT * FROM Preceptores";
    conexion.query(sql, function(error, result){
        if (error) {
            console.error(error);
            return res.send("Ocurrio un error");
        }
        res.json ({
            status: "ok",
            preceptores: result
        })
    });
    })

    router.get("/:id", function(req, res, next){
        res.send(`Ruta de preceptores id ${req.params.id}`);
        })

router.post("/", function (req, res, next){
    const { idPersona } = req.body;
        
    const sql = `INSERT INTO Preceptores (idPersona) VALUES (?)`
        
        conexion.query(sql, [idPersona], function(error, result){
                if (error) {
                    console.error(error);
                    return res.send("Ocurrio un error");
                }
                res.json({status:"ok"})
        })
})

router.put("/", function(req, res, next){
    const { idPreceptor } = req.query;
    const { idPersona } = req.body;

    const sql = `UPDATE Preceptores SET idPersona = ? WHERE idPreceptor = ?`;
    conexion.query(
        sql,
        [idPersona, idPreceptor],
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

    const sql = "DELETE FROM Preceptores WHERE idPreceptor = ?";

    conexion.query(sql, [idPreceptor], function(error, result){
        if(error) {
            console.error(error);
            return res.status(500).send("Ocurrio un error");
        }
        res.json({status:"ok"})
    })
})

module.exports = router;