import React from 'react';

import { Route, Redirect, RouteProps } from 'react-router-dom';

const isAuth = () => {
    if(localStorage.getItem('token') !== null) {
        return true
    }
    return false;
};

interface Props extends RouteProps{
  component: any
}

const PrivateRoute = ({component: ComponentProps, ...rest}: Props) => {
    return (
        <Route 
            {...rest}
            render={props =>(isAuth() ? (
              <ComponentProps {...props} />
            ): (
                <Redirect 
                    to={{
                        pathname: '/',
                        state: { message: 'Usuário não autorizado' }
                    }}
                />
            ))}
        />
    );
}

export default PrivateRoute;