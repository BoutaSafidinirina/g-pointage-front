/* eslint-disable */

import { NavLink, useLocation,Link } from 'react-router-dom';
// chakra imports
import { Box, Flex, HStack, Text, useColorModeValue } from '@chakra-ui/react';
import { useLocalStorage } from '../../../pages/appContexte';

export function SidebarLinks(props: {
	routes: RoutesType[];
}) {
	//   Chakra color mode
	let location = useLocation();
	let activeColor = useColorModeValue('white', 'white');
	let inactiveColor = useColorModeValue('secondaryGray.600', 'secondaryGray.600');
	let activeIcon = useColorModeValue('white', 'white');
	let textColor = useColorModeValue('white', 'white');
	let brandColor = useColorModeValue('brand.400', 'brand.400');

	const { routes } = props;
	const { authData } = useLocalStorage();
	const role = authData?.auth.role
	
	// verifies if routeName is the one active (in browser input)
	const activeRoute = (routeName: string) => {
		return location.pathname.includes(routeName);
	};

	// this function creates the links from the secondary accordions (for example auth -> sign-in -> default)
	const createLinks = (
		routes: RoutesType[], 
	) => {
		if(role === "utilisateur"){
			return routes.map(
				(
					route: RoutesType,
					index: number
				) => {
					if (route.layout === '/admin' &&  route.path !== '/admini' &&  route.path !== '/employe' &&  route.path !== '/utilisateur' && route.path !== '/notice') {
						return (
							<Link key={index} to={route.layout + route.path}>
								{route.icon ? (
									<Box>
										<HStack
											spacing={activeRoute(route.path.toLowerCase()) ? '22px' : '26px'}
											fontSize="lg"
											py='5px'
											ps='10px'>
											<Flex w='100%' alignItems='' justifyContent='center'>
												<Box
													color={activeRoute(route.path.toLowerCase()) ? activeIcon : textColor}
													me='10px'>
													{route.icon}
												</Box>
												<Text
													me='auto'
													color={activeRoute(route.path.toLowerCase()) ? activeColor : textColor}
													fontWeight={activeRoute(route.path.toLowerCase()) ? 'bold' : 'normal'}>
													{route.name}
												</Text>
											</Flex>
											<Box
												h='36px'
												w='4px'
												bg={activeRoute(route.path.toLowerCase()) ? brandColor : 'transparent'}
												borderRadius='5px'
											/>
										</HStack>
									</Box>
								) : (
									<Box>
										<HStack
											spacing={activeRoute(route.path.toLowerCase()) ? '22px' : '26px'}
											py='5px'
											ps='10px'>
											<Text
												me='auto'
												color={activeRoute(route.path.toLowerCase()) ? activeColor : inactiveColor}
												fontWeight={activeRoute(route.path.toLowerCase()) ? 'bold' : 'normal'}>
												{route.name}
											</Text>
											<Box h='36px' w='4px' bg='brand.400' borderRadius='5px' />
										</HStack>
									</Box>
								)}
							</Link>
						);
					}
				}
			);
		}else{
			return routes.map(
				(
					route: RoutesType,
					index: number
				) => {
					if (route.layout === '/admin' &&  route.path !== '/profile' &&  route.path !== '/notice') {
						return (
							<Link key={index} to={route.layout + route.path}>
								{route.icon ? (
									<Box>
										<HStack
											spacing={activeRoute(route.path.toLowerCase()) ? '22px' : '26px'}
											fontSize="lg"
											py='5px'
											ps='10px'>
											<Flex w='100%' alignItems='' justifyContent='center'>
												<Box
													color={activeRoute(route.path.toLowerCase()) ? activeIcon : textColor}
													me='10px'>
													{route.icon}
												</Box>
												<Text
													me='auto'
													color={activeRoute(route.path.toLowerCase()) ? activeColor : textColor}
													fontWeight={activeRoute(route.path.toLowerCase()) ? 'bold' : 'normal'}>
													{route.name}
												</Text>
											</Flex>
											<Box
												h='36px'
												w='4px'
												bg={activeRoute(route.path.toLowerCase()) ? brandColor : 'transparent'}
												borderRadius='5px'
											/>
										</HStack>
									</Box>
								) : (
									<Box>
										<HStack
											spacing={activeRoute(route.path.toLowerCase()) ? '22px' : '26px'}
											py='5px'
											ps='10px'>
											<Text
												me='auto'
												color={activeRoute(route.path.toLowerCase()) ? activeColor : inactiveColor}
												fontWeight={activeRoute(route.path.toLowerCase()) ? 'bold' : 'normal'}>
												{route.name}
											</Text>
											<Box h='36px' w='4px' bg='brand.400' borderRadius='5px' />
										</HStack>
									</Box>
								)}
							</Link>
						);
					}
				}
			);
		}
	};
	
	return <>{createLinks(routes)}</>
}

export default SidebarLinks;
