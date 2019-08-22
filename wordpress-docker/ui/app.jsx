import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link} from "react-router-dom";

import Header from "./components/header";
import PostList from "./components/postList.jsx";
// import PostView from "./components/postView";

const App = () => (
	<Router> 	
		<div>
			<Header />
			<section className="section container content">
				<h1> Hello World </h1>
				<Route exact path="/" component={PostList}/> 
				{/* <Route exact path="/:slug" component={PostView}/>  */}
			</section>
		</div>
	</Router>
);

ReactDOM.render(<App />, document.getElementById("app"));