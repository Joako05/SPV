const express = require('express');
const router = express.Router();
const {conexion} = require('../../bd/conexion');

router.get("/", function(req, res, next){
    
    const sql = "SELECT * FROM Anios";
    conexion.query(sql, function(error, result){
        if (error) {
            console.error(error);
            return res.send("Ocurrio un error");
        }
        res.json ({
            status: "ok",
            Años: result
        })
    });
    })

router.get("/:id", function(req, res, next){
    const { id } = req.params;
    const sql = "SELECT * FROM Años WHERE idAnio = ?";
        conexion.query(sql, [id], function(error, result) {
            if (error)return res.status(500).send("Ocurrió un error");
            res.json({
                status: "ok", 
                Años: result 
            });
        });
})

router.post("/", function (req, res, next){
        
    const sql = `INSERT INTO Anios (Anio) VALUES (?)`
        
        conexion.query(sql, [Año], function(error, result){
                if (error) {
                    console.error(error);
                    return res.send("Ocurrio un error");
                }
                res.json({status:"ok"})
        })
})

router.put("/", function(req, res, next){
    const { idAnio } = req.query;
    const { Anio } = req.body;

    const sql = `UPDATE Años SET Año = ? WHERE idAño = ?`;
    conexion.query(
        sql,
        [Anio, idAnio],
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
    const { idAño } = req.query;

    const sql = "DELETE FROM Años WHERE idAño = ?";

    conexion.query(sql, [idAño], function(error, result){
        if(error) {
            console.error(error);
            return res.status(500).send("Ocurrio un error");
        }
        res.json({status:"ok"})
    })
})

module.exports = router;