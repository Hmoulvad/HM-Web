import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';

interface IAuthenticatedRoute {
    component: any;
    path: string;
    isAuth: boolean;
}

const AuthenticatedRoute: React.FC<IAuthenticatedRoute> = ({component: Component, isAuth, ...rest}) => {
    return (
        <Route {...rest} render={(props) => ( isAuth ) 
            ? <Component {...props} />
            : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
        />
    );
}

export default AuthenticatedRoute;
