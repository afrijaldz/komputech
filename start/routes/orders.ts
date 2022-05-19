import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.get("/checkout", "OrdersController.checkout");
}).prefix("/orders");
