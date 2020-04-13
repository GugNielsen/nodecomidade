const conection = require('../database/conection');
module.exports ={
 async index(req,res){
    const {page = 1} = req.query
    const [count] =await conection("incidentes_tables").count();
    const incidentes = await conection('incidentes_tables')
    .limit(5)
    .offset((page -1)*5)
    .select('*');

    res.header('X-Total-Count',count['count(*)']);
    return res.json(incidentes);
 },
 async creat (req,res){
     const {titulo,descricao,valor} = req.body;
     const comercio_id = req.headers.authorization;

     const[id] = await conection('incidentes_tables').insert({
         titulo,
         descricao,
         valor,
         comercio_id

     });

     return res.json({id})
 },
async delete (req,res){
    const {id} = req.params;
    const comercio_id = req.headers.authorization;
    console.log(comercio_id);

    const  incidentes = await conection('incidentes_tables')
        .where('id',id)
        .select('comercio_id')
        .first()
       

        if(incidentes.comercio_id !=comercio_id){
            return res.status(401).json({erro:'Operação não permetida'});
        }
        await conection('incidentes_tables').where('id',id).delete();
        return res.status(204).send();
} 
}