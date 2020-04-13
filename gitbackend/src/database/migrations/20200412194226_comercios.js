
exports.up = function(knex) {
    return  knex.schema.createTable('comercios_tables', function (table) {
        table.string('id').primary();
        table.string('nomeComercio').notNullable();
        table.string('nomeProprietario').notNullable();
        table.string('cnpj').notNullable();
        table.string('cpf').notNullable();
        table.string('email').notNullable();
        table.string('whatsapp').notNullable();
        table.string('cidade').notNullable();
        table.string('uf', 2).notNullable();
        table.timestamps();
      })
};

exports.down = function(knex) {
    return knex.schema.dropTable('comercios_tables');
};
