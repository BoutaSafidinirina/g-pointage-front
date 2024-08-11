// chakra imports
import { Icon, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { MdNewspaper } from "react-icons/md"; 

export function ItemContent(props:{info:string}) {
    const textColor = useColorModeValue("navy.700", "white");
    return (
        <>
        <Flex
            justify='center'
            align='center'
            borderRadius='16px'
            minH={{ base: "60px", md: "70px" }}
            h={{ base: "60px", md: "70px" }}
            minW={{ base: "60px", md: "70px" }}
            w={{ base: "60px", md: "70px" }}
            me='14px'
            bg='white'>
            <Icon as={MdNewspaper} color='linear-gradient(135deg, #868CFF 0%, #4318FF 100%)' w={8} h={14} />
        </Flex>
        <Flex flexDirection='column'>
            <Text
            mb='5px'
            fontWeight='bold'
            color={textColor}
            fontSize={{ base: "md", md: "md" }}>
            {props.info}
            </Text>
            <Flex alignItems='center'>
            <Text
                fontSize={{ base: "sm", md: "sm" }}
                lineHeight='100%'
                color={textColor}>
                Une nouvelle Notification pour vous
            </Text>
            </Flex>
        </Flex>
        </>
    );
}
