
exports.up = function(knex) {
  return knex.schema.createTable('suppliers', suppliers => {
    suppliers.increments();
    suppliers.string('name', 255).notNullable();
  })
  .createTable('shippers', shippers => {
    shippers.increments();
  })

  .createTable('clients', clients => {

  })

  .createTable('products', products => {

  })

  .createTable('orders', products => {
    orders.increments();
    //unsigned for foreignkey
    // or .references('clients.id') then remeove .inTable()
    orders
    .integer('client')
    .unsigned()
    .notNullable()
    .references('id')
    .inTable('clients')
    .onUpdate('CASCADE')
    .onDelete('RESTRICT')
  })

  .createTable('order_shippers', orderShippers => {
  orderShippers.increments();

  orderShippers
  .integer("order")
  .unsigned()
  .notNullable()
  .references("id") // or .references('orders.id') then remove .inTable()
  .inTable("orders")
  .onUpdate("CASCADE") // RESTRICT, DO NOTHING, SET NULL, CASCADE
  .onDelete("RESTRICT");

orderShippers
  .integer("shipper")
  .unsigned()
  .notNullable()
  .references("id") // or .references('shippers.id') then remove .inTable()
  .inTable("shippers")
  .onUpdate("CASCADE") // RESTRICT, DO NOTHING, SET NULL, CASCADE
  .onDelete("RESTRICT");
  })

  .createTable('order_products', orderProducts => {

  })
};

exports.down = function(knex) {
  return knex.schema
  .dropTableIfExists("order_products")
  .dropTableIfExists("order_shippers")
  .dropTableIfExists("orders")
  .dropTableIfExists("products")
  .dropTableIfExists("clients")
  .dropTableIfExists("shippers")
  .dropTableIfExists("suppliers");
};
