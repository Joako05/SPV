const express = require('express');
const router = express.Router();
const {conexion} = require('../../bd/conexion');

router.get("/buscar", function (req, res, next) {
    const { idPreceptor, idCurso} = req.query;
    
    let Filtro = "WHERE ";

    if (idPreceptor){
        Filtro += "idPreceptor = " + idPreceptor;
    } else{
        
        if (idCurso) {
                Filtro += "idCurso = " + idCurso;
        }
    }
    
    const sql = "SELECT * FROM Preceptores ";
    console.log(sql+Filtro);
    conexion.query(sql + Filtro, function (error, result) {
        if (error){
            console.log(error)
            return res.status(500).send("Ocurrió un error");
        }
        res.json({
            status: "ok",
            Preceptores: result
        });
    })
});


router.get("/", function(req, res, next){
    
    const sql = "SELECT * FROM Preceptores";
    conexion.query(sql, function(error, result){
        if (error) {
            console.error(error);
            return res.send("Ocurrio un error");
        }
        res.json ({
            status: "ok",
            preceptores: result
        })
    });
    })


router.post("/", function (req, res, next){
    const { idPersona, idCurso } = req.body;
        
    const sql = `INSERT INTO Preceptores (idPersona, idCurso) VALUES (?, ?)`
        
        conexion.query(sql, [idPersona, idCurso], function(error, result){
                if (error) {
                    console.error(error);
                    return res.send("Ocurrio un error");
                }
                res.json({status:"ok"})
        })
})

router.put("/", function(req, res, next){
    const { idPreceptor } = req.query;
    const { idPersona, idCurso } = req.body;

    const sql = `UPDATE Preceptores SET idPersona = ?, idCurso = ? WHERE idPreceptor = ?`;
    conexion.query(
        sql,
        [idPersona, idCurso, idPreceptor],
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
    const { idPreceptor } = req.query;

    const sql = "DELETE FROM Preceptores WHERE idPreceptor = ?";

    conexion.query(sql, [idPreceptor], function(error, result){
        if(error) {
            console.error(error);
            return res.status(500).send("Ocurrio un error");
        }
        res.json({status:"ok"})
    })
})

module.exports = router;