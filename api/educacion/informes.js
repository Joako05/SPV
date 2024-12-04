const express = require('express');
const router = express.Router();
const {conexion} = require('../../bd/conexion');

router.get("/", function(req, res, next){
    const {idInforme, idEstudiante,	id_materia,	Nota, PrimerInf, SegInf, PrimerPerioFort, PrimerCuatr, TercerInf, CuartoInf, SegPerioFort, SegCuatri, PerioComDi,	PerioComFe, idCurso} = req.query;
    if (idInforme) {
        const sql = "SELECT * FROM Informes WHERE idInforme = ?";
        conexion.query(sql, [idInforme], function(error, result){
         if (error)return res.send("Ocurrio un error");
         res.json ({
            status: "ok",
            Informes: result
            });
     })}
    if (idEstudiante) {
        const sql = "SELECT * FROM Informes WHERE idEstudiante = ?";
        conexion.query(sql, [idEstudiante], function (error, result){
            if (error) return res.status(500).send("Ocurrio un error");
            res.json({
                status: "ok",
                Estudiantes: result
            });
        });
    }
    if (id_materia) {
        const sql = "SELECT * FROM Informes WHERE id_materia = ? "
        conexion.query(sql, [id_materia], function(error, result){
            if (error)return res.status(500).send("Ocurrio un error");
            res.json({
                status: "ok",
                Materias: result
            });
        });
    }
    if (idCurso) {
        const sql = "SELECT * FROM Informes WHERE idCurso = ? "
        conexion.query(sql, [idCurso], function(error, result){
            if(error)return res.status(500).send("Ocurrio un error");
            res.json({
                status:"ok",
                Cursos: result
            });
        });
    }
    });

    router.get("/", function (req, res, next) {
        const sql = "SELECT * FROM Informes";
        conexion.query(sql, function (error, result){
            if (error)return res.send("Ocurrio un error");
            res.json({
                status:"ok",
                Informes: result
            })
        })
    })

router.post("/", function (req, res, next){
    const {idInforme, idEstudiante,	id_materia,	Nota, PrimerInf, SegInf, PrimerPerioFort, PrimerCuatr, TercerInf, CuartoInf, SegPerioFort, SegCuatri, PerioComDi,	PerioComFe, idCurso} = req.body;
        
   const sql = `INSERT INTO Informes (idInforme, idEstudiante, id_materia, Nota, PrimerInf, SegInf, PrimerPerioFort, PrimerCuatr, TercerInf, CuartoInf, SegPerioFort, SegCuatri, PerioComDi, PerioComFe, idCurso) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
        
      conexion.query(sql, [idInforme, idEstudiante, id_materia, Nota, PrimerInf, SegInf, PrimerPerioFort, PrimerCuatr, TercerInf, CuartoInf, SegPerioFort, SegCuatri, PerioComDi, PerioComFe, idCurso], function(error, result){
                if (error) {
                    console.error(error);
                    return res.send("Ocurrio un error");
                }
                res.json({status:"ok"})
       })
})

router.put("/", function(req, res, next){
    const { idInforme } = req.query;
    const { idEstudiante, id_materia, Nota, PrimerInf, SegInf, PrimerPerioFort, PrimerCuatr, TercerInf, CuartoInf, SegPerioFort, SegCuatri, PerioComDi, PerioComFe, idCurso } = req.body;

    const sql = `UPDATE Informes SET idEstudiante = ?, id_materia = ?, Nota = ?, PrimerInf = ?, SegInf = ?, PrimerPerioFort = ?, PrimerCuatr = ?, TercerInf = ?, CuartoInf = ?, SegPerioFort = ?, SegCuatri = ?, PerioComDi = ?, PerioComFe = ?, idCurso = ? WHERE idInforme = ?`;
    conexion.query(sql,[idEstudiante, id_materia, Nota, PrimerInf, SegInf, PrimerPerioFort, PrimerCuatr, TercerInf, CuartoInf, SegPerioFort, SegCuatri, PerioComDi, PerioComFe, idCurso, idInforme],
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
    const { idInforme } = req.query;

    const sql = "DELETE FROM Informes WHERE idInforme = ?";

    conexion.query(sql, [idInforme], function(error, result){
        if(error) {
            console.error(error);
            return res.status(500).send("Ocurrio un error");
        }
        res.json({status:"ok"})
    })
})

module.exports = router;