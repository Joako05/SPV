const express = require('express');
const router = express.Router();
const {conexion} = require('../../bd/conexion');

router.get("/buscar", function(req, res, next) {
    const { idInforme, idEstudiante, id_materia, Nota, PrimerInf, SegInf, PrimerPerioFort, PrimerCuatr, TercerInf, CuartoInf, SegPerioFort, SegCuatri, PerioComDi, PerioComFe, idCurso } = req.query;
    
    let Filtro = "WHERE ";

    if (idInforme) {
        Filtro += "idInforme = " + idInforme;
    } else {
        if (idEstudiante) {
            Filtro += "idEstudiante = " + idEstudiante;
        }
        if (id_materia) {
            if (idEstudiante) {
                Filtro += " AND id_materia = " + id_materia;
            } else {
                Filtro += "id_materia = " + id_materia;
            }
        }
        if (idCurso) {
            if (idEstudiante || id_materia) {
                Filtro += " AND idCurso = " + idCurso;
            } else {
                Filtro += "idCurso = " + idCurso;
            }
        }
    }

    const sql = "SELECT * FROM Informes ";
    console.log(sql + Filtro);
    conexion.query(sql + Filtro, function(error, result) {
        if (error) {
            console.error(error);
            return res.status(500).send("Ocurrio un error");
        }
        res.json({
            status: "ok",
            Informes: result
        });
    });
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