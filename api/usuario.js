const router = require('express').Router();
const {hashPass, verificarPass, generarToken, verificarToken} = require('@damianegreco/hashpass')
const {conexion} = require('../db/conexion');
const TOKEN_SECRET = "educacion";

const checkUsuario = function(user){
    return new Promise((resolve, reject) => {
        const sql = "SELECT id FROM usuarios WHERE nombreUsu = ?";
        conexion.query(sql, [nombreUsu], function(error, result){
            if (error) return reject(error);
            if (result.length > 0) return reject("Usuario ya registrado");
            return resolve();
        })
    })
}

const guardarUsuario = function(nombreUsu, passHasheada){
    return new Promise ((resolve, reject) => {
        const sql = "INSERT INTO usuarios (nombreUsu, constraseña) VALUE (?, ?) RETURNING id_usuario";
        conexion.query(sql, [nombreUsu, passHasheada], function(error, result){
            if(error) return reject(error);
            resolve(result[0].id);
        })
    })
}

router.post('/' , (req, res, next)=>{
    const {nombreUsu, contraseña} = req.body;

    checkUsuario(nombreUsu)
    .then(() => {
        const passHasheada = hashPass(contraseña);

        guardarUsuario(nombreUsu, passHasheada)
        .then((usuario_id) => {
             res.json({status:'ok', usuario_id});
        })

        
    })
    .catch((error) => {
        console.error(error);
        res.json({status:'error', error});
    });
})


router.post('/login', function(req, res, next){
    const {nombreUsu, contraseña} = req.body;
    //JWT 
    const sql = 'SELECT id_usuario, contraseña FROM usuarios WHERE nombreUsu = ?';
    conexion.query(sql, [nombreUsu], function(error, result){

    if(error){
        console.error(error);
        return res.json({status:'error', error})
    } else {
        if (result.length === 0){
            console.error("usuario no existe");
            return res.json({status:'error', error:"usuario no existe"});
        } else {
            if (verificarPass(contraseña, result[0].contraseña)) {
               const token = generarToken(TOKEN_SECRET, 6, {usuario_id: result[0].id_usuario, usuario: nombreUsu })
               console.log(token);
               res.json({status:'ok', token});
               
            }else {
                console.error("usuario/contraseña incorrecta");
                return res.json({status:'error', error:"usuario/contraseña incorrecta"});
            }
        }
    }
    })
})

module.exports = router;