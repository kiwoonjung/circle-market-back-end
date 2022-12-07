/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("posts", (table) => {
    table.uuid("id").primary();
    table
      .uuid("user_id")
      .references("users.id")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table.string("title").notNullable();
    table.string("description").notNullable();
    table.string("category").notNullable();
    table.string("interested");
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {};
