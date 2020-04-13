const conection = require('../database/conection');
module.exports ={
    async login (req,res){
        const {id}  = req.body
        console.log(id);
        const comercio= await conection('comercios_tables')
        .where('id',id)
        .select('nomeComercio')
        .first();
    
        console.log(comercio);
      

        res.json(comercio)
    }
}