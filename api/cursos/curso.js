const express = require('express');
const router = express.Router();
const { conexion } = require('../../bd/conexion');

router.get("/", function (req, res, next) {
    const { idCurso, idAnio, idDivision } = req.query;

    let Filtro = "WHERE ";

    if (idCurso){
        Filtro += "idCurso = " + idCurso;
    }
    if (idAnio) {
        if (idCurso){
            Filtro += "AND idAnio = " + idAnio;
        }
        else {
            Filtro += "idAnio = " + idAnio;
        }
    }
    if (idDivision){
        if(idCurso || idAnio){
            Filtro += "AND idDivision = " + idDivision;
        }
        else {
            Filtro += "idDvision = " + idDivision;
        }
    }
    const sql = "SELECT * FROM Cursos ";
    console.log(sql+Filtro);
    conexion.query(sql + Filtro, function (error, result) {
        if (error){
            console.log(error)
            return res.status(500).send("Ocurrió un error");
        }
        res.json({
            status: "ok",
            cursos: result
        });
    })

    // if (idCurso) {
    //     const sql = "SELECT * FROM Cursos WHERE idCurso = ?";
    //     conexion.query(sql, [idCurso], function (error, result) {
    //         if (error)return res.status(500).send("Ocurrió un error");
    //         res.json({
    //             status: "ok",
    //             cursos: result
    //         });
    //     })}

    // if (idAnio) {
    //         const sql = "SELECT * FROM Cursos WHERE idAño = ?";
    //         conexion.query(sql, [idAnio], function (error, result) {
    //             if (error)return res.status(500).send("Ocurrió un error");
    //             res.json({
    //                 status: "ok",
    //                 Años: result
    //             });
    //         });
    //     }
    //     if (idDivision) {
    //         const sql = "SELECT * FROM Cursos WHERE idDivision = ?";
    //         conexion.query(sql, [idDivision], function (error, result) {
    //             if (error) {
    //                 console.error(error);
    //                 return res.status(500).send("Ocurrió un error");
    //             }
    //             res.json({
    //                 status: "ok",
    //                 Divisiones: result
    //             });
    //         });
    //     }
});

router.get("/", function (req, res, next) {
    const sql = "SELECT * FROM Cursos";
    conexion.query(sql, function (error, result) {
        if (error)
            console.error(error);
            return res.send("Ocurrio un error");
        res.json({
            status: "ok",
            Cursos: result
        })
    });
})

router.post("/", function (req, res) {
    const { idAño, idDivision } = req.body;

    const sql = `INSERT INTO Cursos (idAño, idDivision) VALUES (?, ?)`

    conexion.query(sql, [idAño, idDivision], function (error, result) {
        if (error) {
            console.error(error);
            return res.send("Ocurrio un error");
        }
        res.json({ status: "ok" })
    })
})

router.put("/", function (req, res) {
    const { idCurso } = req.query;
    const { idAño, idDivision } = req.body;

    const sql = `UPDATE Cursos SET idAño = ?, idDivision = ? WHERE idCurso = ?`;
    conexion.query(
        sql,
        [idAño, idDivision, idCurso],
        function (error, result) {
            if (error) {
                console.error(error);
                res.status(500).send("ocurrio un error")
            }
            res.json({ status: "ok" })
        }
    )
})

router.delete("/", function (req, res) {
    const { id } = req.query;

    const sql = "DELETE FROM Cursos WHERE idCurso = ?";

    conexion.query(sql, [idCurso], function (error, result) {
        if (error) {
            console.error(error);
            return res.status(500).send("Ocurrio un error");
        }
        res.json({ status: "ok" })
    })
})

module.exports = router;