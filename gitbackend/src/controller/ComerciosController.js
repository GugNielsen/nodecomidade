const crypto = require('crypto')
const conection = require('../database/conection');
const { cnpj, cpf  } = require('cpf-cnpj-validator');
const cnpjValid = cnpj
const cpfValid = cpf;
const  validatorEmail = require("email-validator");
module.exports ={
async creat (req,res){
    
    const{nomeComercio,nomeProprietario,email,cpf,cnpj,whatsapp,cidade,uf} = req.body;
  
    // verificar ser CNPJ CPF e valido
    var valCNPJ = cnpjValid.isValid(cnpj);
    var ValCPF = cpfValid.isValid(cpf);
    if(valCNPJ == false || ValCPF == false){
        return res.status(401).json({erro:"CPF ou CNPJ invalido"})
    }
    // Verificar se o Email e Valido
    if(!validatorEmail(email)){
        return res.status(401).json({erro:"Email Invalido"})
    }

    //Verificar se CPF CNPj ja esta cadastrado
    const  resgistroCnpj = await conection('comercios_tables')
        .where('cnpj',cnpj)
        .select('nomeComercio')
        .first();

        const  resgistroCPF = await conection('comercios_tables')
        .where('cpf',cpf)
        .select('nomeComercio')
        .first();

        
        console.log(resgistroCPF);
        console.log(resgistroCnpj);
        if(resgistroCPF != undefined || resgistroCnpj != undefined)
        {
            return res.status(401).json({erro:"CPF ou CNPJ já registrado"})
        }
   
        // ver email ja foi registrado
        const  resgistroEmail = await conection('comercios_tables')
        .where('email',email)
        .select('nomeComercio')
        .first();

        if(resgistroEmail != undefined ){
            return res.status(401).json({erro:"Email já registrado"})
        }

    // Criando o Item 
    const id = crypto.randomBytes(4).toString('HEX');
 
    await conection('comercios_tables').insert({
        id,
        nomeComercio,
        nomeProprietario,
        cnpj,
        cpf,
        email,
        whatsapp,
        cidade,
        uf
    })
 
    return res.json({id:id})
},

async list (req,res){
    const comercio = await conection("comercios_tables").select('*');
    
    return res.json(comercio);
}

}