import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import VisualizerPage from "./containers/VisualizerPage/VisualizerPage";
import TheoryPage from "./containers/TheoryPage/TheoryPage";
import HomePage from "./containers/HomePage/HomePage";
import ErrorPage from "./containers/ErrorPage/ErrorPage";

import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import data from "./components/VisualizerComponents/data";
import {TreeNode} from "./containers/VisualizerPage/Types/TreeNode";
import {Container} from "@material-ui/core";


function App() {
  return (
    <div className="App">
      <Router>
          <Header/>
              <Switch>
                  <Route path="/visualizer" exact={true}>
                      <VisualizerPage  tree={data as unknown as TreeNode}/>
                  </Route>
                  <Route path="/theory" exact={true}>
                      <TheoryPage />
                  </Route>
                  <Route path="/" exact={true}>
                      <HomePage />
                  </Route>
                  <Route>
                      <ErrorPage />
                  </Route>
              </Switch>
          <Footer/>
      </Router>
    </div>
  );
}

export default App;
