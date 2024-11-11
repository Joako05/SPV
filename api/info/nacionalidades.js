const express = require('express');
const router = express.Router();
const {conexion} = require('../../bd/conexion');

router.get("/", function(req, res, next){
    const {nombreNac} = req.query;
    
    const sql = "SELECT * FROM nacionalidades";
    conexion.query(sql, function(error, result){
        if (error) {
            console.error(error);
            return res.send("Ocurrio un error");
        }
        res.json ({
            status: "ok",
            nacionalidades: result
        })
    });
    })

    router.get("/:id", function(req, res, next){
        res.send(`Ruta de nacionalidades id ${req.params.id}`);
        })

router.post("/", function (req, res, next){
    const { nombreNac } = req.body;
        
    const sql = `INSERT INTO nacionalidades (nombreNac) VALUES (?)`
        
        conexion.query(sql, [nombreNac], function(error, result){
                if (error) {
                    console.error(error);
                    return res.send("Ocurrio un error");
                }
                res.json({status:"ok"})
        })
})

router.put("/", function(req, res, next){
    const { idNac } = req.query;
    const { nombreNac } = req.body;

    const sql = `UPDATE nacionalidades SET nombreNac = ? WHERE idNac = ?`;
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