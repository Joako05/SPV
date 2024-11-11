const express = require('express');
const router = express.Router();
const {conexion} = require('../../bd/conexion');

router.get("/", function(req, res, next){
    const {idAño, idDivision} = req.query;
    
    const sql = "SELECT * FROM Cursos";
    conexion.query(sql, function(error, result){
        if (error) {
            console.error(error);
            return res.send("Ocurrio un error");
        }
        res.json ({
            status: "ok",
            Cursos: result
        })
    });
    })

    router.get("/:id", function(req, res, next){
        res.send(`Ruta de Cursos id ${req.params.id}`);
        })

router.post("/", function (req, res, next){
    const {idAño, idDivision } = req.body;
        
    const sql = `INSERT INTO Cursos (idAño, idDivision) VALUES (?, ?)`
        
        conexion.query(sql, [idAño, idDivision], function(error, result){
                if (error) {
                    console.error(error);
                    return res.send("Ocurrio un error");
                }
                res.json({status:"ok"})
        })
})

router.put("/", function(req, res, next){
    const { idCurso } = req.query;
    const { idAño, idDivision } = req.body;

    const sql = `UPDATE Cursos SET idAño = ?, idDivision = ? WHERE idCurso = ?`;
    conexion.query(
        sql,
        [idAño, idDivision, idCurso],
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

    const sql = "DELETE FROM Cursos WHERE idCurso = ?";

    conexion.query(sql, [idCurso], function(error, result){
        if(error) {
            console.error(error);
            return res.status(500).send("Ocurrio un error");
        }
        res.json({status:"ok"})
    })
})

module.exports = router;