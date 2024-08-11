
import React, { useEffect, useState } from 'react';

import TableConger from './utils/tablePermission';
import { Button, Card, Flex, Icon } from '@chakra-ui/react';
import { AddPermission } from './add';
import generateTableData from './utils/variable';
import { useLocalStorage } from '../../appContexte';
import { MdAdd, MdOutlineCalendarToday } from 'react-icons/md';
import Menu from './utils/menu';

export default function Permission(){
	const [isAddPermissionModalOpen, setIsAddPermissionModalOpen] = useState(false);

    const [defaultData, setdefaultData] = useState([]);
	const { authData,searchValue,filter,setFilter } = useLocalStorage();

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
    
    const openAddPermissionModal = () => {
        setIsAddPermissionModalOpen(true);
    };

    const closeAddPermissionModal = () => {
        setIsAddPermissionModalOpen(false);
    };
	const textColorSecondary = 'navy.800'
	const boxBg ='secondaryGray.800';
	const bgHover = { bg:'bleu.300'  }
	
	return (
		<Flex flexDirection='column' >
			<Card flexDirection='column' w='100%' pt={"20px"} px='0px' >
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
					<Flex px='25px' mb="8px" justifyContent='space-between' align='center'>
						<Button
							bg={"#1A62ED"}
							alignItems='center'
							w='37px'
							h='37px'
							mx={'5px'}
							_hover={bgHover}
							lineHeight='100%'
							borderRadius='10px' color={"white"}
							onClick={openAddPermissionModal}>
							<Icon w='24px' h='24px' as={MdAdd} color={"white"} />
						</Button>
						{role === "admin" && <Menu />}
					</Flex>
				</Flex>
				<TableConger tableData={defaultData} updateDefaultData={fetchData}/>
				<AddPermission isOpen={isAddPermissionModalOpen} onClose={closeAddPermissionModal} updateDefaultData={fetchData}/>
			</Card>
		</Flex>
	);
}

