import React from 'react';
import SingIn from './pages/auth/index';
import './assets/css/App.css';
import AdminLayout from './pages/admin/index';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme/theme';
import { HashRouter, Redirect, Route, Switch,  } from 'react-router-dom';
import PrivateRoute from './routes/privateRoutes';
import SignUp from './pages/auth/register';
function App() {
  return (
	<ChakraProvider theme={theme}>
		<React.StrictMode>
			<HashRouter>
				<Switch>
					<Route exact path="/auth" component={SingIn} />
					<Route exact path="/auth/sign-up" component={SignUp} />
					<PrivateRoute path="/admin" component={AdminLayout} />
					<Redirect from='/' to='/auth' />
				</Switch>
			</HashRouter>
		</React.StrictMode>
	</ChakraProvider>
  );
}

export default App;
