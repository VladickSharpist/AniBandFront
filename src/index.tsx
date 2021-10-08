import React from 'react';
import ReactDOM from 'react-dom';
import LoginPage from "./pages/auth/LoginPage"
import {
  BrowserRouter, 
  Route,
  Switch
  } from "react-router-dom"
import { queryClient } from './config';
import HomePage from "./pages/video/HomePage"
import { CookiesProvider } from 'react-cookie';
import { RegistrationPage} from "./pages/auth/RegistrationPage"
import { SeasonPage } from "./pages/video/SeasonPage"
import { AdminPage } from "./pages/admin/AdminPage"
import { routes } from "./routes"
import AuthorizedRoute from "./components/AuthorizedRoute"
import { Roles } from "./utils/Roles"
import { QueryClientProvider } from 'react-query';
import { PropsWithChildren } from 'react';
import { NoAccessPage } from "./pages/auth/NoAccessPage"
import { ToastContainer } from 'react-toastify';
import { Layout } from './components/Layout';

function Application() {
  return (
    <Switch>
      <Route exact path={ routes.home } component={ HomePage } />
      <Route path={ routes.login } component={ LoginPage } />
      <Route path={ routes.registration } component={ RegistrationPage } />
      <Route path={ routes.season('1') } component={ SeasonPage } />
      <AuthorizedRoute component={ AdminPage } path={ routes.admin } forRole={Roles.admin}/>
      <Route path={ routes.noAccess } component={ NoAccessPage } />
    </Switch>
  );
}


function ApplicationWrapper(props: PropsWithChildren<unknown>) {

  return (
    <CookiesProvider>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
            <Layout>
              <ToastContainer/>
              {props.children}
            </Layout>
        </QueryClientProvider>
      </BrowserRouter>
    </CookiesProvider>
  );
}

ReactDOM.render(
  <ApplicationWrapper>
    <Application />
  </ApplicationWrapper>,
  document.getElementById('root')
);
