import ProductCategory from "App/Models/ProductCategory";
import { DateTime } from "luxon";
import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column()
  public price: number;

  @column()
  public product_category_id: number;

  @column()
  public description: string;

  @column()
  public specification: string;

  @column()
  public image: string;

  @belongsTo(() => ProductCategory, {
    foreignKey: "product_category_id",
  })
  public product_category: BelongsTo<typeof ProductCategory>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
