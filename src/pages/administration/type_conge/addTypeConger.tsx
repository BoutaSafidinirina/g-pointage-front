import React, { ChangeEvent, FormEvent, FunctionComponent, useState } from "react";
import {
    Flex,
    Heading,
    Divider,
    Input,
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
} from "@chakra-ui/react";
import axios from "axios";
import Swal from "sweetalert2";

interface AddModalProps {
    isOpen: boolean;
    onClose: () => void;
    updateDefaultData: () => void;
}

export const AddTypeConger: FunctionComponent<AddModalProps> = ({ isOpen, onClose ,updateDefaultData}) => {
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
        variant:'container',
        fontSize: "md",
        fontWeight: 500,
        mb:"16px" ,
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
        color:"white",
        fontSize: "md",
        fontWeight: 500,
        h: "40px",
        w: "235px",
    };
    const [itemDesignation, setItemDesignation] = useState('');
    
    const handleItemDesignationChange = (e: ChangeEvent<HTMLInputElement>) => {
        setItemDesignation(e.target.value);
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

        axios.post('http://localhost:3001/api/type', {
            designation:itemDesignation
        }).then(()=>{
            Toast.fire({
                icon: 'success',
                title: 'Success'
            })
            updateDefaultData()
            onClose()
        })

        setItemDesignation('');
        } catch (error) {
            Toast.fire({
                icon: 'error',
                title: 'Error'
            })
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="400px">
            <ModalOverlay sx={modalBlurStyle} />
            <ModalContent maxW="400px" backgroundColor= "white" p={"24px"}>
                <ModalCloseButton color="black" />
                <ModalBody>
                    <>
                        <Heading textAlign="center"
                            color="navy.800"
                            fontSize="lg" 
                            fontWeight="bold" 
                            mb="4">
                            <Text>Ajouter Nouvelle type de congé</Text>
                        </Heading>
                        <Divider my={4} borderColor="navy.800" />
                    </>
                    <form onSubmit={handleSubmit}>
                        <FormControl>
                            <FormLabel
                            display="flex"
                                ms="4px"
                                fontSize="md" 
                                fontWeight="500"
                                color={"navy.800"}
                                mb="8px"
                                >
                                Designation<Text color={"red.400"}>*</Text>
                            </FormLabel>
                            <Input
                                isRequired={true}
                                type="text"
                                placeholder="Designation"
                                onChange={handleItemDesignationChange}
                                value={itemDesignation}
                                {...inputStyle}
                            />
                            
                        </FormControl>
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
                                {...buttonStyle}
                                type="submit"
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
