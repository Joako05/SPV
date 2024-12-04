const express = require('express');
const router = express.Router();
const {conexion} = require('../../bd/conexion');

router.get("/", function(req, res, next){
    
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
//prueba de obtener un id especifico
router.get("/:id", function (req, res, next) {
        const { id } = req.params;
        const sql = "SELECT * FROM DiasSemana WHERE idDia = ?";
        conexion.query(sql, [id], function (error, result) {
            if (error)return res.status(500).send("Ocurrió un error");
            res.json({
                status: "ok",
                diasSemana: result
            });
    });
});

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
    const { idDia } = req.query;

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