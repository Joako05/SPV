const express = require('express');
const router = express.Router();
const {conexion} = require('../../bd/conexion');

router.get("/", function(req, res, next){
    const {id, idCurso, id_materia, idDia, idModulo} = req.query;
    if (id){
    const sql = "SELECT * FROM Cursos_Materias_Horarios WHERE id = ?";
    conexion.query(sql, [id], function(error, result){
        if (error)return res.send("Ocurrio un error");
        res.json ({
            status: "ok",
            TablaC_M_H: result
        })
    })}
    if(idCurso){
        const sql = "SELECT * FROM Cursos_Materias_Horarios WHERE idCurso = ? "
        conexion.query(sql, [idCurso], function (error, result) {
            if (error)return res.status(500).send("Ocurrió un error");
            res.json({
                status: "ok",
                cursos: result
            });
        })}
    if(id_materia){
        const sql = "SELECT * FROM Cursos_Materias_Horarios WHERE id_materia = ? "
        conexion.query(sql, [id_materia], function (error, result) {
            if (error)return res.status(500).send("Ocurrió un error");
            res.json({
                status: "ok",
                materias: result
            });
        })}
    if(idDia){
        const sql = "SELECT * FROM Cursos_Materias_Horarios WHERE idDia = ? "
        conexion.query(sql, [idDia], function (error, result) {
            if (error)return res.status(500).send("Ocurrió un error");
            res.json({
                status: "ok",
                Dias: result
            });
        })}
    if (idModulo){
        const sql = "SELECT * FROM Cursos_Materias_Horarios WHERE idModulo = ? "
        conexion.query(sql, [idModulo], function (error, result) {
            if (error)return res.status(500).send("Ocurrió un error");
            res.json({
                status: "ok",
                materias: result
            });
        })}
})

router.get("/", function(req, res, next){
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