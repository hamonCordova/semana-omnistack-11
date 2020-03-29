
exports.up = function(knex) {
  return knex.schema.createTable('ongs', (table) => {
         table.increments('id').primary(),
             table.string('login').notNullable(),
             table.string('password').notNullable(),
         table.string('name').notNullable(),
         table.string('email_contact').notNullable(),
         table.string('whatsapp').notNullable(),
         table.string('city').notNullable(),
         table.string('uf', 2).notNullable()
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('ongs');
};
