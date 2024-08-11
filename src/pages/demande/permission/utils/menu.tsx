import React, { useEffect, useState } from 'react';

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
	useColorModeValue,
	Button
} from '@chakra-ui/react';
// Assets
import {
	MdImportExport,
	MdPictureAsPdf,
	MdFileDownload
} from 'react-icons/md';
import { ExportPermission } from '../export/exportPdf';
import { useLocalStorage } from '../../../appContexte';
import generateTableData from './variable';
import ReactToPrint from 'react-to-print';
import { ExportToExcel } from '../../../exportExcel';

export default function Banner(props: { [x: string]: any }) {
	const { ...rest } = props;

	const bgHover = useColorModeValue({ bg: '#1A62ED' }, { bg: '#1A62ED' });
	const bgFocus = useColorModeValue({ bg: '#1A62ED' }, { bg: '#1A62ED' });

	const refTitle = React.createRef<HTMLDivElement>();
	
	const { isOpen: isOpen1, onOpen: onOpen1, onClose: onClose1 } = useDisclosure();
	const { authData,searchValue,filter } = useLocalStorage();
	const [defaultData, setdefaultData] = useState([]);
	const id = authData?.auth.employee_id;
    const role = authData?.auth.role;
	async function fetchData() {
		if (id && role) {
			const data:any = await generateTableData(id,role,searchValue,filter);
			setdefaultData(data);
		}
	}
	useEffect(() => {
		fetchData();
	}, [id,role,searchValue,filter]);
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
				<Icon as={MdFileDownload } color={"#ffffff"} w='24px' h='24px' />
			</MenuButton>
			<MenuList
				boxShadow={'14px 17px 40px 4px rgba(112, 144, 176, 0.18)'} p='0px' mt='10px' borderRadius='20px' bg={"white"} border='none'>
				<ExportToExcel apiData={defaultData} filename={"permission"}/>
				<ReactToPrint
					trigger ={() =>
						<MenuItem
							_hover={{ bg: 'blue.200' }}
							_focus={{ bg: 'blue.200' }}
							color='red.500'
							bg={"none"}
							borderRadius='8px'
							px='14px'>
							<Flex align='center'>
								<Icon as={MdPictureAsPdf} h='16px' w='16px' me='8px' />
								<Text fontSize='sm' fontWeight='400'>
									PDF
								</Text>
							</Flex>
						</MenuItem>
				}
				content={() => refTitle.current }
				/>
			</MenuList>
			<ExportPermission ref={refTitle} tableData={defaultData}></ExportPermission>
		</Menu>
	);
}
