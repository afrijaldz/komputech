import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.get("/", "ProductsController.index");
  Route.get("/:id", "ProductsController.detail");
}).prefix("/products");
