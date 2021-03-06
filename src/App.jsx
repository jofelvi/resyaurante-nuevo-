import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";

//ProtectedRoute
import ProtectedRouter from "./components/ProtectedRoute";

import AuthLoading from "./components/AuthLoading";

// Views
import { SignInView, SignUpView } from "./views/auth";
import DashboardView from "./views/dashboard";
import { AllProducts } from "./views/product";
import { AllMenu } from "./views/allMenu";
import { FormIngredientes } from "./views/ingredientes";
import { AllTables, AddTable } from "./views/table";
import { AllDeliverys } from "./views/delivery";
import { AllKitchens } from "./views/kitchen";
import { AllBars } from "./views/bar";
import { Error404 } from "./views/errors";
import { Pedidos } from "./views/Pedidos";
import { ListaPedidos } from "./views/ListaPedidos";
import { Calculadora } from "./views/Calculadora";
import { AllSectors, AddSector } from "./views/sectors";
import Clients from "./views/clients";
import Reportes from "./views/resports";
import Usuarios from "./views/users";
import { AllReserved, AddReserved } from "./views/reserved";

const App = () => {
	// if (loggedIn) {
	return (
		<Provider store={store}>
			<AuthLoading>
				<BrowserRouter>
					<Switch>
						<ProtectedRouter exact path="/" component={DashboardView} />
						<ProtectedRouter exact path="/crear-menu" component={AllProducts} />
						<ProtectedRouter exact path="/all-menu" component={AllMenu} />
						<ProtectedRouter exact path="/pedidos" component={Pedidos} />
						<ProtectedRouter exact path="/users" component={Usuarios} />
						<ProtectedRouter exact path="/lista-ordenes" component={ListaPedidos} />
						<ProtectedRouter exact path="/ingredientes" component={FormIngredientes} />
						<ProtectedRouter exact path="/calcular-pago" component={Calculadora} />
						<ProtectedRouter exact path="/clients" component={Clients} />

						<ProtectedRouter exact path="/reportes" component={Reportes} />
						<ProtectedRouter exact path="/tables" component={AllTables} />
						<ProtectedRouter exact path="/addTable" component={AddTable} />
						<ProtectedRouter exact path="/sectors" component={AllSectors} />
						<ProtectedRouter exact path="/addSector" component={AddSector} />
						<ProtectedRouter exact path="/deliverys" component={AllDeliverys} />
						<ProtectedRouter exact path="/kitchens" component={AllKitchens} />
						<ProtectedRouter exact path="/bars" component={AllBars} />
						<ProtectedRouter exact path="/reserved" component={AllReserved} />
						<ProtectedRouter exact path="/addReserved" component={AddReserved} />
						<Route exact path="/sign-in" component={SignInView} />
						<Route exact path="/sign-up" component={SignUpView} />
						<Route component={Error404} />
					</Switch>
				</BrowserRouter>
			</AuthLoading>
		</Provider>
	);
};

export default App;
