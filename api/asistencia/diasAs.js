const express = require('express');
const router = express.Router();
const {conexion} = require('../../bd/conexion');

router.get("/", function (req, res, next){
    const { idDA, D1, D2, D3, D4, D5, D6, D7, D8, D9, D10, D11, D12, D13, D14, D15, D16, D17, D18, D19, D20, D21, D22, D23, D24, D25, D26, D27, D28, D29, D30, D31, idEstudiante, idMes } = req.query;
    if (idDA){
        const sql = "SELECT * FROM DiasAs WHERE idDA = ?";
        conexion.query(sql, [idDA], function (error, result) {
            if (error)return res.status(500).send("Ocurrió un error");
            res.json({
                status: "ok",
                DiasAsistencia: result
            });
        })}
    if (idEstudiante){ 
        const sql = "SELECT * FROM DiasAs WHERE idEstudiante = ?";
        conexion.query(sql, [idEstudiante], function (error, result) {
            if (error)return res.status(500).send("Ocurrió un error");
            res.json({
                status: "ok",
                Estudiantes: result
            });
        })}
    if (idMes){ 
        const sql = "SELECT * FROM DiasAs WHERE idMes = ?";
        conexion.query(sql, [idMes], function (error, result) {
            if (error)return res.status(500).send("Ocurrió un error");
            res.json({
                status: "ok",
                meses: result
            });
        })}
})

router.get("/", function(req, res, next){
    
    const sql = "SELECT * FROM DiasAs";
    conexion.query(sql, function(error, result){
        if (error) {
            console.error(error);
            return res.send("Ocurrio un error");
        }
        res.json ({
            status: "ok",
            DiasAsistencia: result
        })
    });
    })


router.post("/", function (req, res, next){
    const { D1, D2, D3, D4, D5, D6, D7, D8, D9, D10, D11, D12, D13, D14, D15, D16, D17, D18, D19, D20, D21, D22, D23, D24, D25, D26, D27, D28, D29, D30, D31, idEstudiante, idMes } = req.body;
        
    const sql = `INSERT INTO DiasAs (D1, D2, D3, D4, D5, D6, D7, D8, D9, D10, D11, D12, D13, D14, D15, D16, D17, D18, D19, D20, D21, D22, D23, D24, D25, D26, D27, D28, D29, D30, D31, idEstudiante, idMes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        
        conexion.query(sql, [D1, D2, D3, D4, D5, D6, D7, D8, D9, D10, D11, D12, D13, D14, D15, D16, D17, D18, D19, D20, D21, D22, D23, D24, D25, D26, D27, D28, D29, D30, D31, idEstudiante, idMes], function(error, result){
                if (error) {
                    console.error(error);
                    return res.send("Ocurrio un error");
                }
                res.json({status:"ok"})
        })
})

router.put("/", function(req, res, next){
    const { idDA } = req.query;
    const { D1, D2, D3, D4, D5, D6, D7, D8, D9, D10, D11, D12, D13, D14, D15, D16, D17, D18, D19, D20, D21, D22, D23, D24, D25, D26, D27, D28, D29, D30, D31, idEstudiante, idMes } = req.body;

    const sql = `UPDATE DiasAs SET D1 = ?, D2 = ?, D3 = ?, D4 = ?, D5 = ?, D6 = ?, D7 = ?, D8 = ?, D9 = ?, D10 = ?, D11 = ?, D12 = ?, D13 = ?, D14 = ?, D15 = ?, D16 = ?, D17 = ?, D18 = ?, D19 = ?, D20 = ?, D21 = ?, D22 = ?, D23 = ?, D24 = ?, D25 = ?, D26 = ?, D27 = ?, D28 = ?, D29 = ?, D30 = ?, D31 = ?, idEstudiante = ?, idMes = ? WHERE idDA = ?`;
    conexion.query(
        sql,
        [D1, D2, D3, D4, D5, D6, D7, D8, D9, D10, D11, D12, D13, D14, D15, D16, D17, D18, D19, D20, D21, D22, D23, D24, D25, D26, D27, D28, D29, D30, D31, idEstudiante, idMes, idDA],
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

    const sql = "DELETE FROM DiasAs WHERE idDA = ?";

    conexion.query(sql, [idDA], function(error, result){
        if(error) {
            console.error(error);
            return res.status(500).send("Ocurrio un error");
        }
        res.json({status:"ok"})
    })
})

module.exports = router;    