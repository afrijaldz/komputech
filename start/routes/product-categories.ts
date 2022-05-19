import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.get("/", "ProductCategories.index");
  Route.get("/:id", "ProductCategories.detail");
  Route.post("/", "ProductCategories.create");
  Route.put("/:id", "ProductCategories.update");
  Route.delete("/:id", "ProductCategories.delete");
}).prefix("/product-categories");
