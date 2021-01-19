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

export const MAIN_PATH = '/dpst';

function App() {
  return (
    <div className="App">
      <Router>
          <Header/>
              <Switch>
                  <Route path={MAIN_PATH + "/visualizer"} exact={true}>
                      <VisualizerPage  tree={data as unknown as TreeNode}/>
                  </Route>
                  <Route path={MAIN_PATH + "/theory"} exact={true}>
                      <TheoryPage />
                  </Route>
                  <Route path={MAIN_PATH} exact={true}>
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
