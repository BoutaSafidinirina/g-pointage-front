// Chakra imports
import { Box, Button, Flex, Icon, Text, useColorModeValue } from '@chakra-ui/react';
// Custom components
import Card from '../../components/card/Card';
import LineChart from '../../components/charts/LineChart';
import { IoCheckmarkCircle } from 'react-icons/io5';
import { MdBarChart, MdOutlineCalendarToday } from 'react-icons/md';
// Assets
import { RiArrowUpSFill } from 'react-icons/ri';
import { lineChartDataTotalSpent, lineChartOptionsTotalSpent } from '../../variables/charts';

export default function TotalSpent(props: { [x: string]: any }) {
	const { ...rest } = props;

	// Chakra Color Mode

	const textColor = useColorModeValue('secondaryGray.900', 'secondaryGray.900');
	const textColorSecondary = useColorModeValue('secondaryGray.600', 'secondaryGray.600');
	const boxBg = useColorModeValue('secondaryGray.300', 'secondaryGray.300');
	const iconColor = useColorModeValue('brand.500', 'white');
	const bgButton = useColorModeValue('secondaryGray.300', 'secondaryGray.900');
	const bgHover = useColorModeValue({ bg: 'secondaryGray.400' }, { bg: 'secondaryGray.400' });
	const bgFocus = useColorModeValue({ bg: 'secondaryGray.300' }, { bg: 'secondaryGray.400' });
	return (
		<Card justifyContent='center' alignItems='center' flexDirection='column' w='100%' mb='0px' {...rest}>
			<Flex align='center' justify='space-between' w='100%' pe='20px' pt='5px'>
				<Button bg={boxBg} fontSize='sm' fontWeight='500' color={textColorSecondary} borderRadius='7px'>
					<Icon as={MdOutlineCalendarToday} color={textColorSecondary} me='4px' />
					This month
				</Button>
				<Button
					ms='auto'
					alignItems='center'
					justifyContent='center'
					bg={bgButton}
					_hover={bgHover}
					_focus={bgFocus}
					_active={bgFocus}
					w='37px'
					h='37px'
					lineHeight='100%'
					borderRadius='10px'
					{...rest}>
					<Icon as={MdBarChart} color={iconColor} w='24px' h='24px' />
				</Button>
			</Flex>
			<Flex w='100%' flexDirection={{ base: 'column', lg: 'row' }}>
				<Flex flexDirection='column' me='20px' mt='28px'>
					<Text color={textColor} fontSize='20px' textAlign='start' fontWeight='700' lineHeight='100%'>
						Absence et Permission
					</Text>
				</Flex>
				<Box minH='260px' minW='75%' mt='auto'>
					<LineChart chartData={lineChartDataTotalSpent} chartOptions={lineChartOptionsTotalSpent} />
				</Box>
			</Flex>
		</Card>
	);
}
