import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.get("/", "ProductsController.index");
  Route.get("/:id", "ProductsController.detail");
  Route.post("/", "ProductsController.create");
  Route.put("/:id", "ProductsController.update");
  Route.delete("/:id", "ProductsController.delete");
}).prefix("/products");
