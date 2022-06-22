import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.get("/", "ProductCategoriesController.index");
  Route.get("/:id", "ProductCategoriesController.detail");
  Route.post("/", "ProductCategoriesController.create");
  Route.put("/:id", "ProductCategoriesController.update");
  Route.delete("/:id", "ProductCategoriesController.delete");
}).prefix("/product-categories");
