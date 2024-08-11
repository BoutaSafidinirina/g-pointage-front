import React from 'react';

// Chakra imports
import {
	Icon,
	Flex,
	Text,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	useDisclosure,
	useColorModeValue
} from '@chakra-ui/react';
// Assets
import {
	MdImportExport,
	MdPictureAsPdf,
	MdFileDownload
} from 'react-icons/md';

export default function Banner(props: { [x: string]: any }) {
	const { ...rest } = props;

	const textHover = useColorModeValue(
		{ color: 'White', bg: 'unset' },
		{ color: 'white', bg: 'unset' }
	);
	const iconColor = useColorModeValue('white', 'white');
	const bgList = useColorModeValue('#1A62ED', '#1A62ED');
	const bgShadow = useColorModeValue('14px 17px 40px 4px rgba(112, 144, 176, 0.08)', 'unset');
	const bgHover = useColorModeValue({ bg: '#1A62ED' }, { bg: '#1A62ED' });
	const bgFocus = useColorModeValue({ bg: '#1A62ED' }, { bg: '#1A62ED' });

	// Ellipsis modals
	const { isOpen: isOpen1, onOpen: onOpen1, onClose: onClose1 } = useDisclosure();

	return (
		<Menu isOpen={isOpen1} onClose={onClose1}>
			<MenuButton
				alignItems='center'
				justifyContent='center'
				bg={'#1A62ED'}
				_hover={bgHover}
				_focus={bgFocus}
				_active={bgFocus}
				w='37px'
				h='37px'
				lineHeight='100%'
				onClick={onOpen1}
				borderRadius='10px'
				{...rest}>
				<Icon as={MdFileDownload } color={iconColor} w='24px' h='24px' />
			</MenuButton>
			<MenuList
				w='150px'
				minW='unset'
				maxW='150px !important'
				border='transparent'
				backdropFilter='blur(63px)'
				bg={bgList}
				boxShadow={bgShadow}
				borderRadius='20px'
				p='15px'>
				<MenuItem
					transition='0.2s linear'
					color={"white"}
					_hover={textHover}
					p='0px'
					borderRadius='8px'
					_active={{
						bg: 'transparent'
					}}
					_focus={{
						bg: 'transparent'
					}}
					mb='10px'>
					<Flex align='center'>
						<Icon as={MdImportExport} h='16px' w='16px' me='8px' />
						<Text fontSize='sm' fontWeight='400'>
							EXCEL
						</Text>
					</Flex>
				</MenuItem>
				<MenuItem
					transition='0.2s linear'
					p='0px'
					fontWeight={'400px'}
					borderRadius='8px'
					color={"white"}
					_hover={textHover}
					_active={{
						bg: 'transparent'
					}}
					_focus={{
						bg: 'transparent'
					}}
					mb='10px'>
					<Flex align='center'>
						<Icon as={MdPictureAsPdf} h='16px' w='16px' me='8px' />
						<Text fontSize='sm' fontWeight='400'>
							PDF
						</Text>
					</Flex>
				</MenuItem>
			</MenuList>
		</Menu>
	);
}
