// Chakra imports
import { Avatar, Box, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import Card from '../../../components/card/Card';

export default function Banner(props: {
	banner: string;
	avatar: string;
	name: string;
	job: string;
	roleUser: number | string;
	agence: number | string;
	// following: number | string;
	[x: string]: any;
}) {
	const { banner,roleUser, avatar, name, agence,job, ...rest } = props;
	// Chakra Color Mode
	const textColorPrimary = useColorModeValue('secondaryGray.900', 'navy.800');
	const textColorSecondary = 'gray.500';
	const borderColor = useColorModeValue('white !important', '#111C44 !important');
	return (
		<Card mb="0px" alignItems='center' {...rest}>
			<Box bg={`url(${banner})`} bgSize='cover' borderRadius='16px' h='131px' w='100%' />
			<Avatar mx='auto' src={avatar} h='87px' w='87px' mt='-43px' border='4px solid' borderColor={borderColor} />
			<Text color={textColorPrimary} fontWeight='bold' fontSize='xl' mt='10px'>
				{name}
			</Text>
			{/* <Text color={textColorSecondary} fontSize='sm'>
				{job}
			</Text> */}
			<Flex w='max-content' mx='auto' mt='26px'>
				<Flex mx='auto' me='60px' alignItems='center' flexDirection='column'>
					<Text color={textColorPrimary} fontSize='md' fontWeight='700'>
						{roleUser}
					</Text>
					<Text color={textColorSecondary} fontSize='sm' fontWeight='400'>
						Role
					</Text>
				</Flex>
				<Flex mx='auto' me='60px' alignItems='center' flexDirection='column'>
					<Text color={textColorPrimary} fontSize='md' fontWeight='700'>
						{agence}
					</Text>
					<Text color={textColorSecondary} fontSize='sm' fontWeight='400'>
						Agence
					</Text>
				</Flex>
				<Flex mx='auto' alignItems='center' flexDirection='column'>
					<Text color={textColorPrimary} fontSize='md' fontWeight='700'>
						{job}
					</Text>
					<Text color={textColorSecondary} fontSize='sm' fontWeight='400'>
						Poste
					</Text>
				</Flex>
			</Flex>
		</Card>
	);
}
