import { IconButton, Input, InputGroup, InputLeftElement, useColorModeValue } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { useLocalStorage } from '../../../pages/appContexte';
export function SearchBar(props: {
	variant?: string;
	background?: string;
	children?: JSX.Element;
	placeholder?: string;
	borderRadius?: string | number;
	[x: string]: any;
}) {
	const { searchValue, setSearchValue } = useLocalStorage();
  
	const { variant, background, children, placeholder, borderRadius, ...rest } = props;

	const searchIconColor = useColorModeValue('gray.700', 'white');
	const inputBg = useColorModeValue('secondaryGray.300', '#ffffff');
	const inputText = useColorModeValue('gray.700', 'navy.800');
	return (
		<InputGroup w={{ base: '100%', md: '200px' }} {...rest}>
			<InputLeftElement
				children={
					<IconButton
						aria-label='search'
						bg='inherit'
						borderRadius='inherit'
						_active={{
							bg: 'inherit',
							transform: 'none',
							borderColor: 'transparent'
						}}
						_focus={{
							boxShadow: 'none'
						}}
						icon={<SearchIcon color={searchIconColor} w='15px' h='15px' />}
					/>
				}
			/>
			<Input
				variant='search'
				fontSize='sm'
				bg={background ? background : inputBg}
				color={inputText}
				fontWeight='500'
				value={searchValue}
        		onChange={(e) => setSearchValue(e.target.value)}
				_placeholder={{ color: 'gray.400', fontSize: '14px' }}
				borderRadius={borderRadius ? borderRadius : '30px'}
				placeholder={placeholder ? placeholder : 'Search...'}
			/>
		</InputGroup>
	);
}
