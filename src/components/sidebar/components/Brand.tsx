// Chakra imports
import { Flex, Text, useColorModeValue } from '@chakra-ui/react';

import { HSeparator } from '../../separator/Separator';

export function SidebarBrand() {
	//   Chakra color mode
	let logoColor = useColorModeValue('white', 'white');

	return (
		<Flex alignItems='center' flexDirection='column'>
			<Text fontSize={'xl'} fontWeight={'bold'} my='30px' color={logoColor}>G-POINTAGE</Text>
			<HSeparator mb='20px' />
		</Flex>
	);
}

export default SidebarBrand;
