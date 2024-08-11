import { Box, Text, useColorModeValue ,Input} from '@chakra-ui/react';

export default function Information(props: { name:string;onChange:(e:any) => void, title: string; value: number | string; [x: string]: any }) {
	const { title,onChange,name, value, ...rest } = props;
	// Chakra Color Mode
	const textColorPrimary = useColorModeValue('navy.800', 'navy.800');
	const textColorSecondary = 'gray.500';
	const bg = useColorModeValue('gray.300', 'gray.300');
	return (
		<Box {...rest}>
			<Text fontWeight='500' color={textColorSecondary} fontSize='sm'>
				{title}
			</Text>
			<Text borderColor={bg} color={textColorPrimary} fontWeight='500' fontSize='md'>
				<Input name={name} onChange={onChange} bg={'transparent'} w="100%" defaultValue={value}/>
			</Text>
		</Box>
	);
}
