import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "products";

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropForeign("product_category_id");
      table
        .integer("product_category_id")
        .notNullable()
        .unsigned()
        .references("id")
        .inTable("product_categories")
        .alter();
    });
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table
        .integer("product_category_id")
        .unsigned()
        .references("id")
        .inTable("product_categories")
        .alter();
    });
  }
}
