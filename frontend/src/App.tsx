import React, { lazy, Suspense } from 'react';
import { HeaderWithRouter as Header } from "./Header";
//import { HomePage } from "./HomePage";
import HomePage from "./HomePage";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { fontFamily, fontSize, gray2 } from "./Styles";

import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
//import { AskPage } from "./AskPage";
import { SearchPage } from "./SearchPage";
import { SignInPage } from "./SignInPage";
import { NotFoundPage } from "./NotFoundPage";
import { QuestionPage } from "./QuestionPage";

import { Provider } from "react-redux";
import { configureStore } from "./Store";
import { SignOutPage } from "./SignOutPage";

import { AuthProvider } from "./Auth";
import { AuthorizedPage } from "./AuthorizedPage";

const AskPage = lazy(() => import("./AskPage"));

const store = configureStore();

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Provider store={store}>      
        <BrowserRouter>
          <div
            css={css`
              font-family: ${fontFamily};
              font-size: ${fontSize};
              color: ${gray2};
            `}
          
          >
            <Header />
            {/*<HomePage />*/}
            <Switch>
              <Redirect from="/home" to="/" />
              <Route exact path="/" component={HomePage} />
              <Route path="/search" component={SearchPage} />
              <Route path="/ask">
                <Suspense
                  fallback={
                    <div
                      css={css`
                        margin-top: 100px;
                        text-align: center;
                      `}
                    >
                      Loading...
                    </div>
                  }
                >
                  <AuthorizedPage>
                      <AskPage />
                  </AuthorizedPage>                  
                </Suspense>
              </Route>
              <Route
                path="/signin"
                render={() => <SignInPage action="signin" />} 
              />
              <Route
                path="/signin-callback"
                render={() => <SignInPage action="signin-callback" />} 
              />
              <Route
                path="/signout"
                render={() => <SignOutPage action="signout" />} 
              />
              <Route
                path="/signout-callback"
                render={() => <SignOutPage action="signout-callback" />} 
              />
              <Route path="/signin" component={SignInPage} />
              <Route path="/questions/:questionId" component={QuestionPage} />
              <Route component={NotFoundPage} />
            </Switch>        
          </div>
        </BrowserRouter>
      </Provider>
    </AuthProvider>
  );
}

export default App;
