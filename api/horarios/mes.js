const express = require('express');
const router = express.Router();
const {conexion} = require('../../bd/conexion');

router.get("/", function(req, res, next){
    
    const sql = "SELECT * FROM Meses";
    conexion.query(sql, function(error, result){
        if (error) {
            console.error(error);
            return res.send("Ocurrio un error");
        }
        res.json ({
            status: "ok",
            meses: result
        })
    });
    })

    router.get("/:id", function(req, res, next){
        res.send(`Ruta de meses id ${req.params.id}`);
        })

router.post("/", function (req, res, next){
    const { nombreMes } = req.body;
        
    const sql = `INSERT INTO Meses (nombreMeses) VALUES (?)`
        
        conexion.query(sql, [nombreMeses], function(error, result){
                if (error) {
                    console.error(error);
                    return res.send("Ocurrio un error");
                }
                res.json({status:"ok"})
        })
})

router.put("/", function(req, res, next){
    const { idMes } = req.query;
    const { nombreMeses } = req.body;

    const sql = `UPDATE Meses SET nombreMeses = ? WHERE idMes = ?`;
    conexion.query(
        sql,
        [nombreMeses, idMes],
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
    const { idMes } = req.query;

    const sql = "DELETE FROM Meses WHERE idMes = ?";

    conexion.query(sql, [idMes], function(error, result){
        if(error) {
            console.error(error);
            return res.status(500).send("Ocurrio un error");
        }
        res.json({status:"ok"})
    })
})

module.exports = router;