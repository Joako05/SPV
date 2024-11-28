const express = require('express');
const router = express.Router();
const {conexion} = require('../../bd/conexion');

router.get("/", function(req, res, next){
    
    const sql = "SELECT * FROM localidades";
    conexion.query(sql, function(error, result){
        if (error) {
            console.error(error);
            return res.send("Ocurrio un error");
        }
        res.json ({
            status: "ok",
            localidades: result
        })
    });
})

router.get("/:id", function(req, res, next){
    const { id } = req.params;
    const sql = "SELECT * FROM localidades WHERE idL = ?";
        conexion.query(sql, [id], function(error, result) {
            if (error)return res.status(500).send("Ocurrió un error");
            res.json({
                status: "ok", 
                localidades: result 
            });
        });

})

router.post("/", function (req, res, next){
    const { nombre } = req.body;
        
    const sql = `INSERT INTO localidades (nombre) VALUES (?)`
        
        conexion.query(sql, [nombre], function(error, result){
                if (error) {
                    console.error(error);
                    return res.send("Ocurrio un error");
                }
                res.json({status:"ok"})
        })
})

router.put("/", function(req, res, next){
    const { idL } = req.query;
    const { nombre } = req.body;

    const sql = `UPDATE localidades SET nombre = ? WHERE idL = ?`;
    conexion.query(
        sql,
        [nombreNac, idNac],
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
    const { idL } = req.query;

    const sql = "DELETE FROM localidades WHERE idL = ?";

    conexion.query(sql, [idL], function(error, result){
        if(error) {
            console.error(error);
            return res.status(500).send("Ocurrio un error");
        }
        res.json({status:"ok"})
    })
})

module.exports = router;