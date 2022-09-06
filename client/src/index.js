import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

//for admin
// import App from "./App";
//for User
import App from './Components/UserUI/App';
ReactDOM.render(
  <>
    <BrowserRouter>
      {/* admin */}
      {/* <App /> */}

      {/* for users */}
      <App/>
    </BrowserRouter>
  </>,
  document.getElementById("root")
);
