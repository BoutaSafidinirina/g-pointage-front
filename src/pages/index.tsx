
import React, { useEffect, useState } from 'react';

// Chakra imports
import { Box, Flex, Grid, useColorModeValue, SimpleGrid, Icon } from '@chakra-ui/react';

import { MdEmojiPeople, MdCalendarViewDay, MdPerson } from 'react-icons/md';
import MiniCalendar from '../components/calendar/MiniCalendar';
import MiniStatistics from '../components/card/MiniStatistics';
import IconBox from '../components/icons/IconBox';
import TotalSpent from './utils/TotalSpent';
import axios from 'axios';

export default function Marketplace() {
	const [time, setTime] = useState(new Date());
	const [data,setData] = useState({emp:0,user:0})
	async function fetchData() {
		const dataEmp:any = await axios.get(`http://localhost:3001/api/employee/total`)
		const dataUser:any = await axios.get(`http://localhost:3001/api/user/total`)
		setData({emp:dataEmp?.data,user:dataUser?.data});
	}

	useEffect(() => {
		fetchData()
		const intervalId = setInterval(() => {
			setTime(new Date());
			time.setHours(time.getHours() + 2);
		}, 1000);
		return () => {
			clearInterval(intervalId);
		};
	}, []);
	const now = new Date();
	const year = now.getFullYear();
	const month = (now.getMonth() + 1).toString().padStart(2, '0');
	const day = now.getDate().toString().padStart(2, '0');
	const hours = time.getHours().toString().padStart(2, '0');
	const minutes = time.getMinutes().toString().padStart(2, '0');
	const seconds = time.getSeconds().toString().padStart(2, '0');
	
	// Chakra Color Mode
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	return (
		<Box pt={{ base: '180px', md: '80px', xl: '80px' }}>
			{/* Main Fields */}
			<SimpleGrid columns={{ base: 1, md: 2, lg: 3, '2xl': 6 }} gap='20px' mb='20px'>
						<MiniStatistics
							startContent={
								<IconBox
									w='56px'
									h='56px'
									bg={"gray.500"}
									icon={<Icon w='32px' h='32px' as={MdEmojiPeople} color={textColor} />}
								/>
							}
							name='Employée'
							value={data?.emp}
						/>
						<MiniStatistics
							startContent={
								<IconBox
									w='56px'
									h='56px'
									bg={"gray.500"}
									icon={<Icon w='32px' h='32px' as={MdPerson} color={textColor} />}
								/>
							}
							name='Utilisateur'
							value={data?.user}
						/>
						<MiniStatistics
							startContent={
								<IconBox
									w='56px'
									h='56px'
									bg={"gray.500"}
									icon={<Icon w='32px' h='32px' as={MdCalendarViewDay} color={textColor} />}
								/>
							}
							name={`${year}-${month}-${day}`}
							value={`${hours}:${minutes}:${seconds}`}
						/>
						
				</SimpleGrid>
			<Grid
				mb='20px'
				gridTemplateColumns={{ xl: 'repeat(3, 1fr)', '2xl': '1fr 0.46fr' }}
				gap={{ base: '20px', xl: '20px' }}
				display={{ base: 'block', xl: 'grid' }}>
				<Flex flexDirection='column' gridArea={{ xl: '1 / 1 / 2 / 3', '2xl': '1 / 1 / 2 / 2' }}>
					<TotalSpent />
				</Flex>
				<Flex flexDirection='column' gridArea={{ xl: '1 / 3 / 2 / 4', '2xl': '1 / 2 / 2 / 3' }}>
					<MiniCalendar h='100%' minW='100%' selectRange={false} />
				</Flex>
			</Grid>
			{/* Delete Product */}
		</Box>
	);
}
