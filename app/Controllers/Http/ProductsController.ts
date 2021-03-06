import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Product from "App/Models/Product";
import Database from "@ioc:Adonis/Lucid/Database";

export default class ProductsController {
  public async index({ request, response }) {
    const products = await Product.query().preload("product_category");

    response.json({
      data: products,
    });
  }

  public async detail({ request, response }) {
    const { id } = request.params();

    const data = await Product.find(id);

    response.json({
      data,
    });
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
      price: parseFloat(price),
      product_category_id,
      description,
      specification,
      image: `products/${image.fileName}`,
    };

    const data = await Product.create(productData);

    response.json({
      data,
    });
  }

  public async delete({ request, response }) {
    const { id } = request.params();

    const data = await Product.findOrFail(id);
    await data.delete();

    response.json({
      data: data,
    });
  }
}
