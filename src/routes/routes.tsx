import { Icon } from '@chakra-ui/react';
import { MdPerson, MdHome, MdControlPoint, MdScale ,MdSettings, MdPersonPinCircle} from 'react-icons/md';

// Admin Imports
import MainDashboard from '../pages/index';
import Utilisateur from '../pages/utilisateur/index';
import Profile from '../pages/auth/profile'
import Demande from '../pages/demande/index';
import NotificationDemande from '../pages/demande/demande';
import Pointage from '../pages/pointage/index';
import Administration from '../pages/administration/index';
import Employe from '../pages/employer/index';

const routes = [
	{
		name: 'Tableau de bord ',
		layout: '/admin',
		path: '/default',
		icon: <Icon as={MdHome} width='25px' height='25px'  color='inherit' />,
		component: MainDashboard,
	},
	{
		name: 'Pointage',
		layout: '/admin',
		icon: <Icon as={MdControlPoint} width='25px' height='25px'  color='inherit' />,
		path: '/pointage',
		component: Pointage,
		secondary: true
	},
	{
		name: 'Demande',
		layout: '/admin',
		path: '/demande',
		icon: <Icon as={MdScale} width='25px' height='25px'  color='inherit' />,
		component: Demande,
		secondary: true
	},
	
	{
		name: 'Administration',
		layout: '/admin',
		path: '/admini',
		icon: <Icon as={MdSettings} width='25px' height='25px'  color='inherit' />,
		component: Administration,
		secondary: true
	},
	{
		name: 'Employée',
		layout: '/admin',
		path: '/employe',
		icon: <Icon as={MdPerson} width='25px' height='25px'  color='inherit' />,
		component: Employe,
		secondary: true
	},
	{
		name: 'Utilisateur',
		layout: '/admin',
		path: '/utilisateur',
		icon: <Icon as={MdPerson} width='25px' height='25px'  color='inherit' />,
		component: Utilisateur,
		secondary: true
	},
	{
		name: 'Profile',
		layout: '/admin',
		path: '/profile',
		icon: <Icon as={MdPersonPinCircle} width='25px' height='25px' color='inherit' />,
		component: Profile,
		secondary: true
	},
	{
		name: 'Demande Reçu',
		layout: '/admin',
		path: '/notice',
		icon: <Icon as={MdPersonPinCircle} width='25px' height='25px' color='inherit' />,
		component: NotificationDemande,
		secondary: true
	}
];

export default routes;
