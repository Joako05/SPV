const express = require('express');
const router = express.Router();
const {conexion} = require('../../bd/conexion');

router.get("/", function(req, res, next){
    const { id_libroTema, Dia_mes, ClaseN, UnidadN, Caract_clase, Tema_clase, Tema_aprox, idProfesor, id_materia, idCurso } = req.query;
    if(id_libroTema){
    const sql = "SELECT * FROM LibroTema WHERE id_libroTemas = ?";
    conexion.query(sql, [id_libroTema], function(error, result){
        if (error)return res.send("Ocurrio un error");
        res.json ({
            status: "ok",
            LibroDeTemas: result
        });
    })}
    if(idProfesor){
        const sql = "SELECT * FROM LibroTema WHERE idProfesor = ?";
        conexion.query(sql, [idProfesor], function(error, result){
            if (error)return res.send("Ocurrio un error");
            res.json ({
                status: "ok",
                Profesores: result
            });
        })}
        if(id_materia){
            const sql = "SELECT * FROM LibroTema WHERE id_materia = ?";
            conexion.query(sql, [id_materia], function(error, result){
                if (error)return res.send("Ocurrio un error");
                res.json ({
                    status: "ok",
                    Materias: result
                });
            })}
            if(idCurso){
                const sql = "SELECT * FROM LibroTema WHERE idCurso = ?";
                conexion.query(sql, [idCurso], function(error, result){
                    if (error)return res.send("Ocurrio un error");
                    res.json ({
                        status: "ok",
                        Cursos: result
                    });
                })}
    })

router.get("/", function(req, res, next){

    const sql = "SELECT * FROM LibroTema";
    conexion.query(sql, function(error, result){
        if (error) {
            console.error(error);
            return res.send("Ocurrio un error");
        }
        res.json ({
            status: "ok",
            LibroDeTemas: result
        })
    });
    })

router.post("/", function (req, res, next){
    const { Dia_mes, ClaseN, UnidadN, Caract_clase, Tema_clase, Tema_aprox, idProfesor, id_materia, idCurso } = req.body;
        
    const sql = `INSERT INTO LibroTema (Dia_mes, ClaseN, UnidadN, Caract_clase, Tema_clase, Tema_aprox, idProfesor, id_materia, idCurso) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
        
        conexion.query(sql, [Dia_mes, ClaseN, UnidadN, Caract_clase, Tema_clase, Tema_aprox, idProfesor, id_materia, idCurso], function(error, result){
                if (error) {
                    console.error(error);
                    return res.send("Ocurrio un error");
                }
                res.json({status:"ok"})
        })
})

router.put("/", function(req, res, next){
    const { id_libroTemas } = req.query;
    const { Dia_mes, ClaseN, UnidadN, Caract_clase, Tema_clase, Tema_aprox, idProfesor, id_materia, idCurso } = req.body;

    const sql = `UPDATE LibroTema SET Dia_mes = ?, ClaseN = ?, UnidadN = ?, Caract_clase = ?, Tema_clase = ?, Tema_aprox = ?, idProfesor = ?, id_materia = ?, idCruso = ? WHERE id_libroTemas = ?`;
    conexion.query(
        sql,
        [Dia_mes, ClaseN, UnidadN, Caract_clase, Tema_clase, Tema_aprox, idProfesor, id_materia, idCurso, id_libroTemas],
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
    const { id_libroTemas } = req.query;

    const sql = "DELETE FROM LibroTema WHERE id_libroTemas = ?";

    conexion.query(sql, [id_libroTemas], function(error, result){
        if(error) {
            console.error(error);
            return res.status(500).send("Ocurrio un error");
        }
        res.json({status:"ok"})
    })
})

module.exports = router;