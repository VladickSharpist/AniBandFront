import { Route, Redirect } from 'react-router-dom';
import { routes } from "../routes"
import { RouteProps } from 'react-router';
import { useAuthState } from '../hooks/useAuthState'
import React from 'react';
import { UserContext } from '../utils/userContext';

type AuthorizedRoteProps ={
    forRole?: string
} & RouteProps;

export default function AuthorizedRoute ( { forRole, ...routeProps }: AuthorizedRoteProps) {
    const userInfo = useAuthState();

    if ( userInfo.isAuthenficated ) {
        if( forRole ? userInfo.isInRole(forRole) : true ){
            return <UserContext.Provider value = {userInfo.getAccessToken()}>
                        <Route {...routeProps} />
                   </UserContext.Provider>
        }
        return <Redirect to={routes.noAccess} />
    }

    return <Redirect to={ routes.login } />
};

