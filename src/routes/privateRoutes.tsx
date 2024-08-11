// routes/PrivateRoute.tsx
import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useLocalStorage } from '../pages/appContexte';

interface PrivateRouteProps extends RouteProps {
  // Add any additional props you need
  component: React.ComponentType<any>;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, ...rest }) => {
  const { authData } = useLocalStorage();
  const isAuthetificated = localStorage.getItem('userData');
  return (
    <Route
      {...rest}
      render={(props) =>
        authData || isAuthetificated ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/auth', state: { from: props.location } }} />
        )
      }
    />
  );
};

export default PrivateRoute;
