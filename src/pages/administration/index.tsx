
import React, { useEffect, useState } from 'react';

// Chakra imports
import { Box, Flex, useColorModeValue, Text, SimpleGrid} from '@chakra-ui/react';

import TablePoste from './post/tablePoste';
import TableTypeConger from './type_conge/tableTypeConger';
import tableDataPoste from './post/variablePoste';
import generateTableData from './type_conge/variableTypeConger';

export default function Administration(){
	
	const textColor = useColorModeValue('navy.800', 'navy.800');
	const [defaultDataPoste, setdefaultDataPoste] = useState([]);
	const [defaultDataType, setdefaultDataType] = useState([]);
	async function fetchData(){
		const dataPoste:any =await tableDataPoste();
		const dataType:any = await generateTableData();
		console.log(dataType)
		setdefaultDataPoste(dataPoste);
		setdefaultDataType(dataType);
	}
	useEffect(() => {
		fetchData();
	}, []);
	console.log(defaultDataType)
	return (
		<Box pt={{ base: '180px', md: '80px', xl: '80px' }}>
			<Flex direction='column'>
				<Flex
					mt='45px'
					mb='20px'
					justifyContent='space-between'
					direction={{ base: 'column', md: 'row' }}
					align={{ base: 'start', md: 'center' }}>
					<Text color={textColor} fontSize='2xl' ms='24px' fontWeight='700'>
						Listes
					</Text>
				</Flex>
				<SimpleGrid mb='20px' columns={{ sm: 1, md: 2 }} spacing={{ base: '20px', xl: '20px' }}>
					<TablePoste  tableData={defaultDataPoste} updateDefaultData={fetchData}/>
					<TableTypeConger tableData={defaultDataType} updateDefaultData={fetchData}/>
				</SimpleGrid>
			</Flex>
		</Box>
	);
}

