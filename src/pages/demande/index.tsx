
import React, { useState } from 'react';

// Chakra imports
import { Box, Flex,useColorModeValue, Text, Button} from '@chakra-ui/react';

import Permission from './permission';
import Conger from './conger';

export default function Demande(){
    const [afichage, setAfichage] = useState("Congé");
    const textColorBrand = useColorModeValue('brand.500', 'navy.800');
	return (
        <Box pt={{ base: '180px', md: '80px', xl: '80px' }}>
            <Flex direction='column'>
                <Flex
                    mt='25px'
                    mb='20px'
                    justifyContent='space-between'
                    direction={{ base: 'column', md: 'row' }}
                    align={{ base: 'start', md: 'center' }}>
                    <Text color={textColorBrand} fontSize='2xl' ms='24px' fontWeight='700'>
                        Liste {afichage}
                    </Text>
                    <Flex>
						<Button
							bg={'transparent'}
							color={textColorBrand}
							fontWeight='800'
							boxShadow='0px 8px 16px rgba(0, 0, 0, 0.2)'
							fontSize='18px'
							borderRadius={"10px"}
							me={{ base: '34px', md: '44px' }}
							onClick={() => setAfichage("Congé")}>
								CONGÉ
						</Button>
						<Button
							bg={'transparent'}
							color={textColorBrand}
							fontWeight='800'
							fontSize='18px'
							onClick={() => setAfichage("Permission")}
							boxShadow='0px 8px 16px rgba(0, 0, 0, 0.2)'
							borderRadius={"10px"}
								>
								PERMISSION
						</Button>
					</Flex>
                </Flex>
                { afichage == "Congé" ? 
                        <Conger/>
                    :  <Permission/>
                }
            </Flex>
        </Box>
	);
}

