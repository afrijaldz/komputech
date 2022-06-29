import ProductCategory from "App/Models/ProductCategory";
import Drive from "@ioc:Adonis/Core/Drive";

export default class ProductCategoriesController {
  public async index({ response }) {
    const data = await ProductCategory.all();

    response.json({
      data,
    });
  }

  public async detail({ request, response }) {
    const { id } = request.params();

    const data = await ProductCategory.find(id);

    response.json({
      data,
    });
  }

  public async create({ request, response }) {
    const name = request.input("name");

    const image = request.file("image", {
      size: "2mb",
      extnames: ["jpg", "png", "gif"],
    });

    if (!image) {
      return response.status(422).send("Image not found");
    }

    if (!image.isValid) {
      return image.errors;
    }

    await image.moveToDisk("./product-categories");

    const filename = image.fileName;

    const category = await ProductCategory.create({
      name,
      image: `product-categories/${filename}`,
    });

    response.json({
      data: category,
    });
  }

  public async update({ request, response }) {
    const name = request.input("name");

    const image = request.file("image", {
      size: "2mb",
      extnames: ["jpg", "png", "gif"],
    });

    const { id } = request.params();

    let category;

    if (image) {
      if (!image.isValid) {
        return response
          .status(422)
          .send(image.errors.map((a) => a.message).join(", "));
      }

      await image.moveToDisk("./product-categories");

      const data = await ProductCategory.find(id);

      if (data) {
        await Drive.delete(data.image);
      }

      const filename = image.fileName;
      category = await ProductCategory.query()
        .where("id", id)
        .update({
          name,
          image: `product-categories/${filename}`,
        });
    } else {
      category = await ProductCategory.query().where("id", id).update({
        name,
      });
    }

    const newData = await ProductCategory.find(id);

    response.json({
      data: newData,
    });
  }
}
