import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Product from "App/Models/Product";
import Database from "@ioc:Adonis/Lucid/Database";

export default class ProductsController {
  public async index(ctx: HttpContextContract) {
    return "bisa";
  }

  public async newest({ response }) {
    const data = await Database.query()
      .from("products")
      .orderBy("id", "desc")
      .limit(6);

    response.json({
      data,
    });
  }

  public async detail(ctx: HttpContextContract) {
    return "detail";
  }

  public async create({ request, response }) {
    const { name, price, product_category_id, description, specification } =
      request.all();

    const image = request.file("image", {
      size: "2mb",
      extnames: ["jpg", "png", "gif"],
    });

    if (!image) {
      response.json({
        error: "no image",
      });
    }

    if (!image.isValid) {
      return image.errors;
    }

    await image.moveToDisk("./products");

    const productData = {
      name,
      price,
      product_category_id,
      description,
      specification,
      image: image.fileName,
    };

    const data = await Product.create(productData);

    response.json({
      data,
    });
  }
}
