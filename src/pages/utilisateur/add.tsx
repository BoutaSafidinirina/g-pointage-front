import React, { ChangeEvent, FormEvent, FunctionComponent, useEffect, useState } from "react";
import {
  Flex,
  Heading,
  Divider,
  Input,
  Select,
  Text,
  Button,
  Modal,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalOverlay,
  CSSObject,
  FormControl,
  FormLabel,
  InputGroup,
  InputRightElement,
  Icon,
  Grid,
} from "@chakra-ui/react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";

import generateTableData from '../../pages/employer/utils/variables';
import axios from "axios";
import Swal from "sweetalert2";

interface AddModalProps {
  isOpen: boolean;
  onClose: () => void;
}
type Field = {
    value?: any;
    error?: string;
    isValid?: boolean;
};
type Form = {
    pseudo: Field;
    password: Field;
    employee: Field;
};


export const AddUser: FunctionComponent<AddModalProps> = ({ isOpen, onClose }) => {
    const [show, setShow] = useState(false);
    const [showP, setShowP] = useState(false);
    const textColorSecondary = "gray.400";
    const handleClick = () => setShow(!show);
    const handleClickP = () => setShowP(!showP);
    
    const modalBlurStyle: CSSObject = {
        backdropFilter: "blur(5px)",
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        position: "fixed",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 999,
    };

    const selectStyle = {
        fontWeight: '500',
        color: 'navy.700',
        bg: 'white',
        border: '1px solid',
        borderColor: 'navy.100',
        _hover:{ bg:'secondaryGray.200'},
        fontSize: "sm",
        mb:"16px",
        size: "md"
    };

    const inputStyle = {
        variant:'container',
        fontSize: "md",
        fontWeight: 500,
        mb:"16px" ,
        size: "md",
    };

    const buttonStyle = {
        fontSize: "md",
        fontWeight: 500,
        h: "40px",
        w: "235px",
    };
    const [tableData, setTableData] = useState([]);
    useEffect(() => {
        async function fetchData() {
        const data:any = await generateTableData();
            setTableData(data);
        }
        fetchData();
    }, []);
    const [form, setForm] = useState<Form>({
        pseudo: { value: "" },
        password: { value: "" },
        employee: { value: 0}
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const fieldName: string = e.target.name;
        const fieldValue: string = e.target.value;
        const newField: Field = { [fieldName]: { value: fieldValue } };

        setForm({ ...form, ...newField });
    };
    const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const selectedPoste = e.target.value;
        setForm({
            ...form,
            employee: {
                ...form.employee,
                value: selectedPoste,
            },
        });
    };
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
            }
        });
        try {
            const formData = new FormData();
            formData.append("employee_id", form.employee.value);
            formData.append("password", form.password.value);
            formData.append("pseudo", form.pseudo.value);

            await axios.post('http://localhost:3001/api/user/register', formData).then(()=>{
                Toast.fire({
                    icon: 'success',
                    title: 'Success'
                })
                onClose()
            })
        } catch (error) {
            console.error(error)
            Toast.fire({
                icon: 'error',
                title: 'Error'
            })
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="auto">
            <ModalOverlay sx={modalBlurStyle} />
            <ModalContent maxW='600px' p="24px"  backgroundColor= "white">
                <ModalCloseButton color="black" />
                <ModalBody>
                    <Heading textAlign="center"
                        color="navy.800"
                        fontSize="lg" 
                        fontWeight="bold" 
                        mb="4">
                        <Text>Nouveau Compte</Text>
                    </Heading>
                    <Divider my={4} borderColor="navy.800" />
                    <form onSubmit={handleSubmit}>
                        <Grid
                            templateColumns={{ base: "1fr", md: "1fr 1fr" }}
                            gap={{ base: 4, md: 8 }}
                        >
                            <FormControl>
                                <FormLabel display='flex' ms='4px' fontSize='md' fontWeight='500' color={"navy.800"} mb='8px'>
                                    IM et Nom<Text color={"red.400"}>*</Text>
                                </FormLabel>
                                <Select placeholder="Im et Nom" display='flex' 
                                    name="employee"
                                    value={form.employee.value}
                                    onChange={(e) => handleSelectChange(e)}
                                {...selectStyle}>
                                    {tableData.map((option:any) => (
                                        <option value={option.id} >
                                            {option.im}/{option.nom} {option.prenoms ? option.prenoms :""}
                                        </option>
                                    ))}
                                </Select>
                                <FormLabel display='flex' ms='4px' fontSize='md' fontWeight='500' color={"navy.800"} mb='8px'>
                                    Nom d'utilisateur<Text color={"red.400"}>*</Text>
                                </FormLabel>
                                <Input
                                    isRequired={true}
                                    name="pseudo"
                                    value={form.pseudo.value}
                                    onChange={(e) => handleInputChange(e)}
                                    type='text'
                                    placeholder="Nom d'utilisateur"
                                    {...inputStyle}
                                />
                                
                            </FormControl>
                            <FormControl>
                                <FormLabel display='flex' ms='4px' fontSize='md' fontWeight='500' color={"navy.800"} mb='8px'>
                                    Mot de Passe<Text color={"red.400"}>*</Text>
                                </FormLabel>
                                <InputGroup size='md'>
                                    <Input
                                        placeholder="min 8 caractère"
                                        {...inputStyle}
                                        name="password"
                                        value={form.password.value}
                                        onChange={(e) => handleInputChange(e)}
                                        type={show ? "text" : "password"}
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
                                <FormLabel display='flex' ms='4px' fontSize='md' fontWeight='500' color={"navy.800"} mb='8px'>
                                    Confirm Mot de Passe<Text color={"red.400"}>*</Text>
                                </FormLabel>
                                <InputGroup size='md'>
                                    <Input
                                        placeholder="min 8 caractère"
                                        {...inputStyle}
                                        type={show ? "text" : "password"}
                                    />
                                    <InputRightElement display='flex' alignItems='center' mt='4px'>
                                    <Icon
                                        color={textColorSecondary}
                                        _hover={{ cursor: "pointer" }}
                                        as={showP ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                                        onClick={handleClickP}
                                    />
                                    </InputRightElement>
                                </InputGroup>
                            </FormControl>
                        </Grid>
                        <Flex justifyContent="space-between" align="center" mb="16px">
                            
                            <Button
                                variant="setup"
                                {...buttonStyle}
                                onClick={onClose}
                                >
                                Annuler
                            </Button>
                            &nbsp;
                            <Button
                                variant="brand"
                                color="white"
                                type="submit"
                                {...buttonStyle}
                                >
                                Ajouter
                            </Button>
                        
                            
                        </Flex>
                    </form>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
