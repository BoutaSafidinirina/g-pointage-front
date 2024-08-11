
import React, {  useEffect, useState } from 'react';

import {Box, Button, Flex, Icon, SimpleGrid, useColorModeValue } from '@chakra-ui/react';
import TablePointage from './utils/tablePointage';
import { MdOutlineCalendarToday} from 'react-icons/md';
import generateTableData from './utils/variable';
import { useLocalStorage } from '../appContexte';
import Menu from './utils/menu';
import generateTable from '../../pages/employer/utils/variables';
import TableEntre from './utils/tableEntre';

export default function Conger(){
	const textColorSecondary = useColorModeValue('white', 'white');
	const boxBg = useColorModeValue('secondaryGray.500', 'secondaryGray.500');
	
	const [defaultData, setdefaultData] = useState([]);
	// const val = localStorage.getItem('userData');
	const { authData,searchValue,filter,setFilter } = useLocalStorage();
	const id = authData?.auth.employee_id;
    const role = authData?.auth.role;
	async function fetchData() {
		if (id && role) {
			const data:any = await generateTableData(id,role,searchValue,filter);
			setdefaultData(data);
		}
	}
	const [tableData, setTableData] = useState([]);
	useEffect(() => {
		async function fetchDataEmp() {
		const data:any = await generateTable();
			setTableData(data);
		}
		fetchDataEmp();
		fetchData();
	}, [searchValue, filter, id, role]);

	return (
		<Box pt={{ base: '180px', md: '80px', xl: '80px' }}>
			{role == "admin" ? (
				<Flex direction='column'>
					<Flex
						mt='45px'
						mb='20px'
						justifyContent='space-between'
						direction={{ base: 'column', md: 'row' }}
						align={{ base: 'start', md: 'center' }}>
							<div>
								<Button bg={boxBg} mx={'10px'} fontSize='sm' onClick={()=>
									{ setFilter("")
										fetchData()}} fontWeight='500' color={textColorSecondary} borderRadius='7px'>
									Tous
								</Button>
								<Button bg={boxBg} mx={'10px'} onClick={()=>{
										setFilter("")
										setFilter('current_year')
									}
								} fontSize='sm' fontWeight='500' color={textColorSecondary} borderRadius='7px'>
									<Icon as={MdOutlineCalendarToday}  color={textColorSecondary} me='4px' />
									Cette année
								</Button>
								<Button bg={boxBg} mx={'10px'}fontSize='sm' onClick={()=>
									{	setFilter("")
										setFilter('current_month')
									}} fontWeight='500' color={textColorSecondary} borderRadius='7px'>
									<Icon as={MdOutlineCalendarToday} color={textColorSecondary} me='4px' />
									Ce mois
								</Button>
								<Button bg={boxBg} mx={'10px'} fontSize='sm' onClick={()=>
									{	setFilter("")
										setFilter('current_week')}} fontWeight='500' color={textColorSecondary} borderRadius='7px'>
									<Icon as={MdOutlineCalendarToday} color={textColorSecondary} me='4px' />
									Cette semaine
								</Button>
							</div>
							<Flex px='25px' mb="8px" justifyContent='space-between' align='center'>
								<Menu />
							</Flex>
					</Flex>
					<SimpleGrid mb='20px' columns={{ sm: 1, md: 2 }} spacing={{ base: '20px', xl: '20px' }}>
						<TableEntre tableData={tableData} updateDefaultData={fetchData}/>
						<TablePointage tableData={defaultData} updateDefaultData={fetchData}/>
					</SimpleGrid>
				</Flex>
			):(
				<Flex flexDirection='column' gridArea={{ xl: '1 / 3 / 2 / 4', '2xl': '1 / 2 / 2 / 3' }}>
					<Flex px='5px' mb="8px" justifyContent='space-between' align='center'>
						<div>
							<Button bg={boxBg} mx={'10px'} fontSize='sm' onClick={()=>
								{ setFilter("")
									fetchData()}} fontWeight='500' color={textColorSecondary} borderRadius='7px'>
								Tous
							</Button>
							<Button bg={boxBg} mx={'10px'} onClick={()=>{
									setFilter("")
									setFilter('current_year')
								}
							} fontSize='sm' fontWeight='500' color={textColorSecondary} borderRadius='7px'>
								<Icon as={MdOutlineCalendarToday}  color={textColorSecondary} me='4px' />
								Cette année
							</Button>
							<Button bg={boxBg} mx={'10px'}fontSize='sm' onClick={()=>
								{	setFilter("")
									setFilter('current_month')
								}} fontWeight='500' color={textColorSecondary} borderRadius='7px'>
								<Icon as={MdOutlineCalendarToday} color={textColorSecondary} me='4px' />
								Ce mois
							</Button>
							<Button bg={boxBg} mx={'10px'} fontSize='sm' onClick={()=>
								{	setFilter("")
									setFilter('current_week')}} fontWeight='500' color={textColorSecondary} borderRadius='7px'>
								<Icon as={MdOutlineCalendarToday} color={textColorSecondary} me='4px' />
								Cette semaine
							</Button>
						</div>
					</Flex>
					<TablePointage tableData={defaultData} updateDefaultData={fetchData}/>
				</Flex>
			)}
        </Box>
	);
}

