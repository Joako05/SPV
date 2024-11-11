const express = require('express');
const router = express.Router();
const {conexion} = require('../../bd/conexion');

router.get("/", function(req, res, next){
    const {Año} = req.query;
    
    const sql = "SELECT * FROM Años";
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
        res.send(`Ruta de años id ${req.params.id}`);
        })

router.post("/", function (req, res, next){
    const { Año } = req.body;
        
    const sql = `INSERT INTO Materias (Año) VALUES (?)`
        
        conexion.query(sql, [Año], function(error, result){
                if (error) {
                    console.error(error);
                    return res.send("Ocurrio un error");
                }
                res.json({status:"ok"})
        })
})

router.put("/", function(req, res, next){
    const { idAño } = req.query;
    const { Año } = req.body;

    const sql = `UPDATE Años SET Año = ? WHERE idAño = ?`;
    conexion.query(
        sql,
        [Año, idAño],
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