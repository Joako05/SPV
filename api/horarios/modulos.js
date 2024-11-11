const express = require('express');
const router = express.Router();
const {conexion} = require('../../bd/conexion');

router.get("/", function(req, res, next){
    const {horas} = req.query;
    
    const sql = "SELECT * FROM Modulos";
    conexion.query(sql, function(error, result){
        if (error) {
            console.error(error);
            return res.send("Ocurrio un error");
        }
        res.json ({
            status: "ok",
            modulos: result
        })
    });
    })

    router.get("/:id", function(req, res, next){
        res.send(`Ruta de modulos id ${req.params.id}`);
        })

router.post("/", function (req, res, next){
    const { horas } = req.body;
        
    const sql = `INSERT INTO Modulos (horas) VALUES (?)`
        
        conexion.query(sql, [horas], function(error, result){
                if (error) {
                    console.error(error);
                    return res.send("Ocurrio un error");
                }
                res.json({status:"ok"})
        })
})

router.put("/", function(req, res, next){
    const { idModulo } = req.query;
    const { horas } = req.body;

    const sql = `UPDATE Modulos SET horas = ? WHERE idMes = ?`;
    conexion.query(
        sql,
        [horas, idModulo],
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

    const sql = "DELETE FROM Modulos WHERE idModulo = ?";

    conexion.query(sql, [idModulo], function(error, result){
        if(error) {
            console.error(error);
            return res.status(500).send("Ocurrio un error");
        }
        res.json({status:"ok"})
    })
})

module.exports = router;