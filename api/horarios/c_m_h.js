const express = require('express');
const router = express.Router();
const {conexion} = require('../../bd/conexion');

router.get("/", function(req, res, next){
    const {idCurso, id_materia, idDia, idModulo} = req.query;
    
    const sql = "SELECT * FROM Cursos_Materias_Horarios";
    conexion.query(sql, function(error, result){
        if (error) {
            console.error(error);
            return res.send("Ocurrio un error");
        }
        res.json ({
            status: "ok",
            TablaC_M_H: result
        })
    });
    })

    router.get("/:id", function(req, res, next){
        res.send(`Ruta de dias de la semana id ${req.params.id}`);
        })

router.post("/", function (req, res, next){
    const { idCurso, id_materia, idDia, idModulo } = req.body;
        
    const sql = `INSERT INTO Cursos_Materias_Horarios (idCurso, id_materia, idDia, idModulo) VALUES (?, ?, ?, ?)`
        
        conexion.query(sql, [idCurso, id_materia, idDia, idModulo], function(error, result){
                if (error) {
                    console.error(error);
                    return res.send("Ocurrio un error");
                }
                res.json({status:"ok"})
        })
})

router.put("/", function(req, res, next){
    const { id } = req.query;
    const { idCurso, id_materia, idDia, idModulo } = req.body;

    const sql = `UPDATE Cursos_Materias_Horarios SET idCurso = ?, id_materia = ?, idDia = ?, idModulo = ? WHERE id = ?`;
    conexion.query(
        sql,
        [idCurso, id_materia, idDia, idModulo, id],
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

    const sql = "DELETE FROM Cursos_Materias_Horarios WHERE id = ?";

    conexion.query(sql, [id], function(error, result){
        if(error) {
            console.error(error);
            return res.status(500).send("Ocurrio un error");
        }
        res.json({status:"ok"})
    })
})

module.exports = router;