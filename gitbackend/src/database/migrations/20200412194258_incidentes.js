
exports.up = function(knex) {
    return  knex.schema.createTable('incidentes_tables', function (table) {
        table.increments();

        table.string('titulo').notNullable();
        table.string('descricao').notNullable();
        table.decimal('valor').notNullable();
      
        table.string('comercio_id').notNullable();

        table.foreign('comercio_id').references('id').inTable('comercios_tables');
       
      })
};

exports.down = function(knex) {
    return knex.schema.dropTable('incidentes_tables');
};
