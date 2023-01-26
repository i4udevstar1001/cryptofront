import { Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Redux";
import Login from "./Page/Login";
import Landing from "./Page/Landing";
import Register from "./Page/Register";
import AppHelper from "./AppHelper";

const App = () => {
  return (
    <Switch>
      <Route path={"/login"}>
        <Login />
      </Route>
      <Route path={"/register"}>
        <Register />
      </Route>
      <Route path="/landing">
        <Landing />
      </Route>
      <Route path={"/"}>
        <Provider store={store}>
          <AppHelper />
        </Provider>
      </Route>
    </Switch>
  );
};

export default App;
