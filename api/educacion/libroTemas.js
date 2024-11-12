const express = require('express');
const router = express.Router();
const {conexion} = require('../../bd/conexion');

router.get("/", function(req, res, next){
    const {Dia_mes, ClaseN, UnidadN, Caract_clase, Tema_clase, Tema_aprox, idProfesor, id_materia} = req.query;
    
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

    router.get("/:id", function(req, res, next){
        res.send(`Ruta de dias de la semana id ${req.params.id}`);
        })

router.post("/", function (req, res, next){
    const { Dia_mes, ClaseN, UnidadN, Caract_clase, Tema_clase, Tema_aprox, idProfesor, id_materia } = req.body;
        
    const sql = `INSERT INTO LibroTema (Dia_mes, ClaseN, UnidadN, Caract_clase, Tema_clase, Tema_aprox, idProfesor, id_materia) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
        
        conexion.query(sql, [Dia_mes, ClaseN, UnidadN, Caract_clase, Tema_clase, Tema_aprox, idProfesor, id_materia], function(error, result){
                if (error) {
                    console.error(error);
                    return res.send("Ocurrio un error");
                }
                res.json({status:"ok"})
        })
})

router.put("/", function(req, res, next){
    const { id_libroTemas } = req.query;
    const { Dia_mes, ClaseN, UnidadN, Caract_clase, Tema_clase, Tema_aprox, idProfesor, id_materia } = req.body;

    const sql = `UPDATE LibroTema SET Dia_mes = ?, ClaseN = ?, UnidadN = ?, Caract_clase = ?, Tema_clase = ?, Tema_aprox = ?, idProfesor = ?, id_materia = ? WHERE id_libroTemas = ?`;
    conexion.query(
        sql,
        [Dia_mes, ClaseN, UnidadN, Caract_clase, Tema_clase, Tema_aprox, idProfesor, id_materia, id_libroTemas],
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