const express = require('express');
const router = express.Router();
const {conexion} = require('../../bd/conexion');

router.get("/buscar", function (req, res, next) {
    const { id_libroTema, Dia_mes, ClaseN, UnidadN, Caract_clase, Tema_clase, Tema_aprox, idProfesor, id_materia, idCurso } = req.query;
    
    let Filtro = "WHERE ";
    
    if (id_libroTema) {
        Filtro += "id_libroTemas = " + id_libroTema;
    } else {
        if (idProfesor) {
            Filtro += "idProfesor = " + idProfesor;
        }
        if (id_materia) {
            if (idProfesor) {
                Filtro += " AND id_materia = " + id_materia;
            } else {
                Filtro += "id_materia = " + id_materia;
            }
        }
        if (idCurso) {
            if (id_materia || idProfesor) {
                Filtro += " AND idCurso = " + idCurso;
            } else {
                Filtro += "idCurso = " + idCurso;
            }
        }
    }
    
    const sql = "SELECT * FROM LibroTema ";
    console.log(sql + Filtro);
    conexion.query(sql + Filtro, function (error, result) {
        if (error) {
            console.log(error);
            return res.status(500).send("Ocurrió un error");
        }
        res.json({
            status: "ok",
            LibroDeTemas: result
        });
    });
});

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