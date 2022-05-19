import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class ProductsController {
  public async index(ctx: HttpContextContract) {
    return "bisa";
  }

  public async detail(ctx: HttpContextContract) {
    return "detail";
  }
}
