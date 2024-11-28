const express = require('express');
const router = express.Router();
const {conexion} = require('../../bd/conexion');

router.get("/", function(req, res, next){
    
    const sql = "SELECT * FROM tipoAs";
    conexion.query(sql, function(error, result){
        if (error) {
            console.error(error);
            return res.send("Ocurrio un error");
        }
        res.json ({
            status: "ok",
            TipoAsistencia: result
        })
    });
})

router.get("/:id", function(req, res, next){
    const { id } = req.params;
    const sql = "SELECT * FROM tipoAs WHERE id_tipoAs = ?";
        conexion.query(sql, [id], function(error, result) {
            if (error)return res.status(500).send("Ocurrió un error");
            res.json({
                status: "ok", 
                DiaAsistencia: result 
            });
        });
});

router.post("/", function (req, res, next){
    const { nombreAs, descrAs } = req.body;
        
    const sql = `INSERT INTO tipoAs (nombreAs, descrAs) VALUES (?, ?)`
        
        conexion.query(sql, [nombreAs, descrAs], function(error, result){
                if (error) {
                    console.error(error);
                    return res.send("Ocurrio un error");
                }
                res.json({status:"ok"})
        })
})

router.put("/", function(req, res, next){
    const { id_tipoAs } = req.query;
    const { nombreAs, descrAs } = req.body;

    const sql = `UPDATE tipoAs SET nombreAs = ?, descrAs = ? WHERE id_tipoAs = ?`;
    conexion.query(
        sql,
        [nombreAs, descrAs, id_tipoAs],
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

    const sql = "DELETE FROM tipoAs WHERE id_tipoAs = ?";

    conexion.query(sql, [idTipoAs], function(error, result){
        if(error) {
            console.error(error);
            return res.status(500).send("Ocurrio un error");
        }
        res.json({status:"ok"})
    })
})

module.exports = router;    