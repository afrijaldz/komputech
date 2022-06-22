import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "regencies";

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table
        .integer("province_id")
        .unsigned() // 👈
        .references("id")
        .inTable("provinces")
        .alter();
    });
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer("province_id").alter();
    });
  }
}
