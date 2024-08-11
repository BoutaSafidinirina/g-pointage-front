// Chakra imports
import { Flex } from '@chakra-ui/react';
import PropTypes from 'prop-types';

function SignIllustration(props: { children: JSX.Element  }) {
	const { children } = props;
	// Chakra color mode
	return (
		<Flex position='relative' h='max-content'>
			<Flex
				h={{
					sm: 'initial',
					md: 'unset',
					lg: '100vh',
					xl: '97vh'
				}}
				w='100%'
				maxW={{ md: '66%', lg: '1313px' }}
				mx='auto'
				pt={{ sm: '50px', md: '0px' }}
				px={{ lg: '30px', xl: '0px' }}
				ps={{ xl: '70px' }}
				justifyContent='start'
				direction='column'>
				{children}
			</Flex>
		</Flex>
	);
}

SignIllustration.propTypes = {
	illustrationBackground: PropTypes.string,
	image: PropTypes.any
};

export default SignIllustration;
