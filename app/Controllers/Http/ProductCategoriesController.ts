import ProductCategory from "App/Models/ProductCategory";

export default class ProductCategoriesController {
  public async index({ response }) {
    const data = await ProductCategory.all();

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
      return;
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
}
