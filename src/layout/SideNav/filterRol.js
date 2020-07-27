export const filterUserRol = (userRol) => {
  const roles = ["MESONERO", "CLIENTE", "CAJA", "COCINA", "ADMIN", "ADMIN_MASTER"];
  const mesero = ["/", "/lista-ordenes", "/pedidos"];
  const cajero = ["/", "/lista-ordenes", "/pedidos", "/all-menu", "/deliverys", "/kitchens"];
  const clients = ["/", "/pedidos"];

  const routes = [
    {
      label: "Dashboard",
      path: "/",
    },
    {
      label: "Lista de Ordenes",
      path: "/lista-ordenes",
    },
    {
      label: "Pedidos",
      path: "/pedidos",
    },
    {
      label: "Menu Lista",
      path: "/all-menu",
    },
    {
      label: "Ingredientes",
      path: "/ingredientes",
    },
    {
      label: "Crear menu",
      path: "/crear-menu",
    },
    {
      label: "Mesas",
      path: "/tables",
    },
    {
      label: "Deliverys",
      path: "/deliverys",
    },
    {
      label: "Cocinas",
      path: "/kitchens",
    },
    {
      label: "Barras",
      path: "/bars",
    },
  ];
  let authorizationRoutes;
  let authorizationUser = roles.indexOf(userRol) !== -1 ? userRol : false;

  if (authorizationUser === "ADMIN_MASTER" || "ADMIN") authorizationRoutes = routes;

  if (authorizationUser === "MESONERO") {
    authorizationRoutes = routes.filter((items) => mesero.indexOf(items.path) !== -1);
  }
  if (authorizationUser === "CAJA") {
    authorizationRoutes = routes.filter((items) => cajero.indexOf(items.path) !== -1);
  }
  if (authorizationUser === "CLIENTE") {
    authorizationRoutes = routes.filter((items) => clients.indexOf(items.path) !== -1);
  }

  return authorizationRoutes;
};
