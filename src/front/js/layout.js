import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./pages/home";
import { DetailPage } from "./pages/detail";

import { NormalLoginForm } from "./pages/login";
import { RegistrationForm } from "./pages/register";

import injectContext from "./store/appContext";

//create your first component
const Layout = () => {
	//the basename is used when your project is published in a subdirectory and not in the root of the domain
	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
	const basename = process.env.BASENAME || "";

	return (
		<BrowserRouter basename={basename}>
			<ScrollToTop>
				<Switch>
					<Route exact path="/">
						<Home />
					</Route>

					<Route exact path="/single/:theid" />
					<Route exact path="/login">
						<NormalLoginForm />
					</Route>
					<Route exact path="/register">
						<RegistrationForm />
					</Route>
					<Route exact path="/detail/:indicator/:index">
						<DetailPage />
					</Route>
				</Switch>
			</ScrollToTop>
		</BrowserRouter>
	);
};

export default injectContext(Layout);
