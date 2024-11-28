const express = require('express');
const router = express.Router();
const {conexion} = require('../../bd/conexion');

router.get("/", function(req, res, next){
    
    const sql = "SELECT * FROM divisiones";
    conexion.query(sql, function(error, result){
        if (error) {
            console.error(error);
            return res.send("Ocurrio un error");
        }
        res.json ({
            status: "ok",
            Divisiones: result
        })
    });
    })

router.get("/:id", function(req, res, next){
        const { id } = req.params;
        const sql = "SELECT * FROM divisiones WHERE idDivision = ?";
            conexion.query(sql, [id], function(error, result) {
                if (error)return res.status(500).send("Ocurrió un error");
                res.json({
                    status: "ok", 
                    Divisiones: result 
                });
            });
})

router.post("/", function (req, res, next){
    const { Division } = req.body;
        
    const sql = `INSERT INTO divisiones (Division) VALUES (?)`
        
        conexion.query(sql, [Division], function(error, result){
                if (error) {
                    console.error(error);
                    return res.send("Ocurrio un error");
                }
                res.json({status:"ok"})
        })
})

router.put("/", function(req, res, next){
    const { idDivision } = req.query;
    const { Division } = req.body;

    const sql = `UPDATE divisiones SET Division = ? WHERE idDivision = ?`;
    conexion.query(
        sql,
        [Division, idDivision],
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

    const sql = "DELETE FROM divisiones WHERE idDivision = ?";

    conexion.query(sql, [idDivision], function(error, result){
        if(error) {
            console.error(error);
            return res.status(500).send("Ocurrio un error");
        }
        res.json({status:"ok"})
    })
})

module.exports = router;