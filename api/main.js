const router = require('express').Router();
//datos generales
const personasRouter = require('./personas');

//roles
const adminRouter = require('./roles/admin');
const estudiantesRouter = require('./roles/estudiantes');
const preceptoresRouter = require('./roles/preceptores');
const profesoresRouter = require('./roles/profesores');
const responsablesRouter = require('./roles/responsable');
//libroTemas

//horarios
const c_m_hRouter = require('./horarios/c_m_h');
const DiasSemanaRouter = require('./horarios/diasSemana');
const mesesRouter = require('./horarios/diasSemana');
//cursos
const añosRouter = require('./cursos/año');
const divisionesRouter = require('./cursos/divisiones');
const cursosRouter = require('./cursos/curso');
//asistencia 

//info
const localidadesRouter = require('./info/localidades');
const nacionalidadesRouter = require('./info/nacionalidades');
const profesionesRouter = require('./info/profesiones');

router.use('/personas', personasRouter);

router.use('/administradores', adminRouter);
router.use('/estudiantes', estudiantesRouter);
router.use('/preceptores', preceptoresRouter);
router.use('/profesores', profesoresRouter);
router.use('/responsables', responsablesRouter);

router.use('/localidades', localidadesRouter);
router.use('/nacionalidades', nacionalidadesRouter);
router.use('/profesiones', profesionesRouter);

router.use('/c_m_h', c_m_hRouter);
router.use('/DiasSemana', DiasSemanaRouter);
router.use('/meses', mesesRouter);

router.use('/años', añosRouter);
router.use('/divisiones', divisionesRouter);
router.use('/cursos', cursosRouter);


module.exports = router;