import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import ImagesContainer from "./components/ImagesContainer/";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SingleImgCont from "./components/ImagePage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path='/'>
            <ImagesContainer />
          </Route>
          <Route path='/images/:imageId'>
            <SingleImgCont />
          </Route>
        </Switch>
      )}
    </>
  );

}

export default App;