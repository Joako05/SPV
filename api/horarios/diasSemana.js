const express = require('express');
const router = express.Router();
const {conexion} = require('../../bd/conexion');

router.get("/", function(req, res, next){
    const {dia} = req.query;
    
    const sql = "SELECT * FROM DiasSemana";
    conexion.query(sql, function(error, result){
        if (error) {
            console.error(error);
            return res.send("Ocurrio un error");
        }
        res.json ({
            status: "ok",
            DiasdelaSemana: result
        })
    });
    })

    router.get("/:id", function(req, res, next){
        res.send(`Ruta de dias de la semana id ${req.params.id}`);
        })

router.post("/", function (req, res, next){
    const { dia } = req.body;
        
    const sql = `INSERT INTO DiasSemana (dia) VALUES (?)`
        
        conexion.query(sql, [dia], function(error, result){
                if (error) {
                    console.error(error);
                    return res.send("Ocurrio un error");
                }
                res.json({status:"ok"})
        })
})

router.put("/", function(req, res, next){
    const { idDia } = req.query;
    const { dia } = req.body;

    const sql = `UPDATE DiasSemana SET dia = ? WHERE idDia = ?`;
    conexion.query(
        sql,
        [dia, idDia],
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

    const sql = "DELETE FROM DiasSemana WHERE idDia = ?";

    conexion.query(sql, [idDia], function(error, result){
        if(error) {
            console.error(error);
            return res.status(500).send("Ocurrio un error");
        }
        res.json({status:"ok"})
    })
})

module.exports = router;