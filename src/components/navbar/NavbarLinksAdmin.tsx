// Chakra Imports
import {
	Avatar,
	Box,
	Flex,
	Icon,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Text,
	useColorModeValue,
	useDisclosure,
} from '@chakra-ui/react';
// Custom Components
import { ItemContent } from '../menu/ItemContent';
import { SearchBar } from './searchBar/SearchBar';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { MdNotificationsNone} from 'react-icons/md';

import { Link, useHistory } from 'react-router-dom';
import { useLocalStorage } from '../../pages/appContexte';
import axios from 'axios';

export default function HeaderLinks(props: { secondary: boolean }) {
	const { secondary } = props;
	
	const navbarIcon = useColorModeValue('navy.800', 'navy.800');
	let menuBg = useColorModeValue('white', 'white');
	const textColor = useColorModeValue('white', 'white');
	const textColorBrand = useColorModeValue('brand.400', 'brand.400');
	const borderColor = useColorModeValue('rgba(135, 140, 189, 0.3)', 'rgba(135, 140, 189, 0.3)');
	const shadow = useColorModeValue(
		'14px 17px 40px 4px rgba(112, 144, 176, 0.18)',
		'14px 17px 40px 4px rgba(112, 144, 176, 0.06)'
	);
	const { authData , setAuthData } = useLocalStorage();
	const history = useHistory();
	const [time, setTime] = useState(new Date());
	const [demandeCount,setDemandeCount] = useState<number>(0);

	const id = authData?.auth.employee_id;
    const role = authData?.auth.role;

	const fetchData = () => {
		axios.get(`http://localhost:3001/api/demande/total/${role}/${id}`).then((res)=>{
			console.log("data"+ res?.data)
			setDemandeCount(res?.data)
		})
		console.log(demandeCount)
	}
	useEffect(() => {
		fetchData()
		const intervalId = setInterval(() => {
			setTime(new Date());
			time.setHours(time.getHours() + 2);
		}, 1000);
		const data = setInterval(() => fetchData(),60000)
		return () => {
			clearInterval(intervalId);
			clearInterval(data);
		};
	}, []);
	
	const hours = time.getHours().toString().padStart(2, '0');
	const minutes = time.getMinutes().toString().padStart(2, '0');
	const seconds = time.getSeconds().toString().padStart(2, '0');
	const { isOpen: isOpen1, onOpen: onOpen1, onClose: onClose1 } = useDisclosure();
	const { isOpen: isOpen2, onOpen: onOpen2, onClose: onClose2 } = useDisclosure();
	
	const handleLogout = () => {
		localStorage.removeItem('userData');
		setAuthData(null)
		history.push('/');
	}

	return (
		<Flex
			w={{ sm: '100%', md: 'auto' }}
			alignItems='center'
			flexDirection='row'
			bg={menuBg}
			flexWrap={secondary ? { base: 'wrap', md: 'nowrap' } : 'unset'}
			p='10px'
			borderRadius='30px'
			boxShadow='0px 8px 16px rgba(0, 0, 0, 0.2)'>
			<SearchBar
				mb={() => {
					if (secondary) {
						return { base: '10px', md: 'unset' };
					}
					return 'unset';
				}}
				me='10px'
				borderRadius='30px'
			/>
			<Flex
				bg={"secondaryGray.300"}
				display={secondary ? 'flex' : 'none'}
				borderRadius='30px'
				ms='auto'
				p='6px'
				align='center'
				me='6px'>
				<Text w='max-content' color={"gray.700"} fontSize='sm' fontWeight='700' me='6px'>
					{hours}:{minutes}:{seconds}
				</Text>
			</Flex>
			<Menu isOpen={isOpen1} onClose={onClose1}>
				<MenuButton p='0px' onClick={onOpen1}>
					<Box position="relative" display="inline-block">
						<Icon mt='6px' as={MdNotificationsNone} color={navbarIcon} w='25px' h='25px' me='10px' />
						{ demandeCount && demandeCount > 0 ? (
							<Box
								position="absolute"
								top="-10px"
								right="12px"
								bg="transparent"
								fontWeight="500"
								color="red"
								fontSize="md"
							>
								{demandeCount}
							</Box>
						):""}
					</Box>
				</MenuButton>
				<MenuList
					boxShadow={shadow}
					p='20px'
					borderRadius='20px'
					bg={menuBg}
					border='none'
					mt='22px'
					me={{ base: '30px', md: 'unset' }}
					minW={{ base: 'unset', md: '400px', xl: '450px' }}
					maxW={{ base: '360px', md: 'unset' }}>
					<Flex w='100%' justifyContent='space-between' align={"center"} content='space' mb='20px'>
						<Text fontSize='md' fontWeight='600' color={textColor}>
							Notifications
						</Text>
						<Link to={'/admin/notice'} onClick={onClose1}>
							<Text fontSize='sm' fontWeight='500' color={textColorBrand} ms='auto' cursor='pointer'>
								VOIR TOUT
							</Text>
						</Link>
					</Flex>
					<Flex flexDirection='column'>
						<MenuItem _hover={{ bg: 'blue.200' }}  bg={"none"} _focus={{ bg: 'none' }} color={"navy.800"} px='0' borderRadius='8px' mb='10px'>
							{ demandeCount && demandeCount > 0 ?(
								<ItemContent info={`Vous avez ${demandeCount} demande reçu`}/>
							):(
								<ItemContent info={`Aucune demande pour le moment`}/>
							)}
						</MenuItem>
					</Flex>
				</MenuList>
			</Menu>
			<Menu isOpen={isOpen2} onClose={onClose2}>
				<MenuButton p='0px' onClick={onOpen2}>
					<Avatar
						_hover={{ cursor: 'pointer' }}
						color='white'
						src={`http://127.0.0.1:3001/${authData?.auth.photo}`}
						size='sm'
						w='40px'
						h='40px'
					/>
				</MenuButton>
				<MenuList boxShadow={shadow} p='0px' mt='10px' borderRadius='20px' bg={menuBg} border='none'>
					<Flex w='100%' mb='0px'>
						<Text
							ps='20px'
							pt='16px'
							pb='10px'
							w='100%'
							borderBottom='1px solid'
							borderColor={borderColor}
							fontSize='sm'
							fontWeight='700'
							color={"navy.800"}>
							👋&nbsp; Bonjour, {`${authData?.auth.pseudo}`}
						</Text>
					</Flex>
					<Flex flexDirection='column' p='10px'>
						<Link to={`/admin/profile`} onClick={onClose2}>
							<MenuItem 
								_hover={{ bg: 'blue.200' }}
								_focus={{ bg: 'blue.200' }} 
								color={"navy.800"}
								borderRadius='8px' px='14px' bg={"none"}>
								<Text fontSize='sm'>Profile</Text>
							</MenuItem>
						</Link>
						<MenuItem
							_hover={{ bg: 'blue.200' }}
							_focus={{ bg: 'blue.200' }}
							color='red.500'
							bg={"none"}
							onClick={handleLogout}
							borderRadius='8px'
							px='14px'>
							<Text fontSize='sm'>Se deconnecter</Text>
						</MenuItem>
					</Flex>
				</MenuList>
			</Menu>
		</Flex>
	);
}

HeaderLinks.propTypes = {
	variant: PropTypes.string,
	fixed: PropTypes.bool,
	secondary: PropTypes.bool,
	onOpen: PropTypes.func
};
