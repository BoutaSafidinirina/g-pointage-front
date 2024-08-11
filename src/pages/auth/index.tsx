
import React, { useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
// Chakra imports
import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import DefaultAuth from "./auth";
import axios from "axios";
import { useLocalStorage } from "../appContexte";
type Field = {
    value?: any,
    error?: string,
    isValid?: boolean
};

type Form = {
    username: Field,
    password: Field
}

function SignIn() {

    // Chakra color mode
    const textColor = useColorModeValue("navy.700", "navy.700");
    const textColorSecondary = "gray.400";
    const textColorDetails = useColorModeValue("navy.700", "navy.700");
    const textColorBrand = useColorModeValue("brand.500", "brand.500");
    const brandStars = useColorModeValue("brand.500", "red.500");
    const [forceRender, setForceRender] = useState<boolean>(false);
    const { setAuthData } = useLocalStorage()
    
    const [show, setShow] = React.useState(false);
    const handleClick = () => setShow(!show);
    const history = useHistory();

    const [form, setForm] = useState<Form>({
        username: { value: '' },
        password: { value: '' },
    });
    const [message, setMessage] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const fieldName: string = e.target.name;
    const fieldValue: string = e.target.value;
    const newField: Field = { [fieldName]: { value: fieldValue } };

    setForm({ ...form, ...newField});
  }

  const validateForm = () => {
    let newForm: Form = form;

    // Validator username
    if(form.username.value.length < 3) {
        const errorMsg: string = 'Vous devez mettre un email.';
        const newField: Field = { value: form.username.value, error: errorMsg, isValid: false };
        newForm = { ...newForm, ...{ username: newField } };
    } else {
        const newField: Field = { value: form.username.value, error: '', isValid: true };
        newForm = { ...newForm, ...{ username: newField } };
    }

    // Validator password
    if(form.password.value.length < 5) {
        const errorMsg: string = 'Votre mot de passe doit faire au moins 6 caractères de long.';
        const newField: Field = {value: form.password.value, error: errorMsg, isValid: false};
        newForm = { ...newForm, ...{ password: newField } };
    } else {
        const newField: Field = { value: form.password.value, error: '', isValid: true };
        newForm = { ...newForm, ...{ password: newField } };
    }

    setForm(newForm);

    return newForm.username.isValid && newForm.password.isValid;
  }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const isFormValid = validateForm();
        if(isFormValid) {
            setMessage('👉 Tentative de connexion en cours ...');
            try {
                axios.post('http://localhost:3001/api/user/login',{
                    email:form.username.value,
                    password:form.password.value
                }).then(res => {

                    if(res?.data.error) {
                        setMessage(`🔐 ${res?.data.error}.`);
                        return;
                    }else{
                        const jsonData = res?.data;
                        localStorage.setItem('userData', JSON.stringify(jsonData));
                        setAuthData(jsonData)
                        setForceRender(prev => !prev);
                        history.push('/admin')
                    }

                })
                
            } catch (error) {
                console.error('Erreur lors de la connexion :', error);
                // Gérer l'erreur (par exemple, afficher un message d'erreur)
          }
        }
    }
    useEffect(() => {
        if (localStorage.getItem("userData")) {
            console.log(localStorage.getItem("userData"));
        }
    }, [forceRender]);
return (
    <DefaultAuth >
        <Flex
            justify="center"  // Center horizontally
            align="center"    // Center vertically
            minHeight="100vh" // Full viewport height
            >
            <Box p={"40px"} borderRadius={"10px"}  boxShadow='0px 8px 16px rgba(0, 0, 0, 0.2)'>
                <Heading color={textColor} fontSize='36px' mb='10px'>
                    <Flex  justifyContent={"center"} alignItems={"ceneter"}>Connexion</Flex>
                </Heading>
                {message &&
                    <Text
                        mb='10px'
                        ms='4px'
                        color={"red.500"}
                        fontWeight='400'
                        fontSize='md'>
                        {message}
                        </Text>}
                <Divider my={4} borderColor="navy.800" />
                <form onSubmit={handleSubmit}>
                    <Flex
                        zIndex='2'
                        direction='column'
                        w={{ base: "100%", md: "420px" }}
                        maxW='100%'
                        background='transparent'
                        borderRadius='15px'
                        mx={{ base: "auto", lg: "unset" }}
                        me='auto'
                        mb={{ base: "20px", md: "auto" }}>
                        <FormControl>
                        <FormLabel
                            display='flex'
                            ms='4px'
                            fontSize='sm'
                            fontWeight='500'
                            color={textColor}
                            mb='8px'>
                            Email<Text color={brandStars}>*</Text>
                        </FormLabel>
                        <Input
                            isRequired={true}
                            variant='auth'
                            fontSize='sm'
                            ms={{ base: "0px", md: "0px" }}
                            type='email'
                            placeholder='mail@simmmple.com'
                            mb='24px'
                            fontWeight='500'
                            size='lg'
                            name="username"
                            value={form.username.value} 
                            onChange={e => handleInputChange(e)}
                        />
                        {form.username.error &&
                            <Text color={"red.500"} ms="4px" fontWeight='200'
                            fontSize='sm'>
                                {form.username.error}
                            </Text> 
                        }
                        <FormLabel
                            ms='4px'
                            fontSize='sm'
                            fontWeight='500'
                            color={textColor}
                            display='flex'>
                            Password<Text color={brandStars}>*</Text>
                        </FormLabel>
                        <InputGroup size='md'>
                            <Input
                                isRequired={true}
                                fontSize='sm'
                                placeholder='Min. 6 characters'
                                mb='24px'
                                size='lg'
                                type={show ? "text" : "password"}
                                variant='auth'
                                name="password"
                                value={form.password.value} 
                                onChange={e => handleInputChange(e)}
                            />
                            <InputRightElement display='flex' alignItems='center' mt='4px'>
                            <Icon
                                color={textColorSecondary}
                                _hover={{ cursor: "pointer" }}
                                as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                                onClick={handleClick}
                            />
                            </InputRightElement>
                        </InputGroup>
                        {form.password.error &&
                            <Text color={"red.500"} ms="4px" fontWeight='200'
                            fontSize='sm'>
                                {form.password.error} 
                            </Text>
                            }
                        <Flex justifyContent='space-between' align='center' mb='24px'>
                            <FormControl display='flex' alignItems='center'>
                            </FormControl>
                            <NavLink to='/'>
                                <Text
                                    color={textColorBrand}
                                    fontSize='sm'
                                    w='140px'
                                    fontWeight='500'>
                                    Mot de passe oublier?
                                </Text>
                            </NavLink>
                        </Flex>
                        <Button
                            fontSize='sm'
                            variant='brand'
                            fontWeight='500'
                            color={"white"}
                            w='100%'
                            h='50'
                            mb='24px' type="submit">
                                Se connecter
                        </Button>
                        </FormControl>
                        <Flex
                            flexDirection='column'
                            justifyContent='center'
                            alignItems='start'
                            maxW='100%'
                            mt='0px'>
                            <Text color={textColorDetails} fontWeight='400' fontSize='14px'>
                                Pas de compte?
                                <NavLink to='/auth/sign-up'>
                                    <Text
                                        color={textColorBrand}
                                        as='span'
                                        ms='5px'
                                        fontWeight='500'>
                                        Créer un compte
                                    </Text>
                                </NavLink>
                            </Text>
                        </Flex>
                    </Flex>
                </form>
            </Box>
        </Flex>   
    </DefaultAuth> 
  );
}

export default SignIn;
