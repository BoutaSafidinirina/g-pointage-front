import React, { ChangeEvent, FormEvent, FunctionComponent, useEffect, useState } from "react";
import {
  Flex,
  Heading,
  Divider,
  Text,
  Button,
  Modal,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalOverlay,
  CSSObject,
  FormLabel,
  Box,
  Textarea,
} from "@chakra-ui/react";
import Swal from "sweetalert2";
import axios from "axios";

interface AddModalProps {
    id: number;
    isOpen: boolean;
    onClose: () => void;
    updateDefaultData:() => void;
}

export const RemarquePointage: FunctionComponent<AddModalProps> = ({ id,isOpen, onClose,updateDefaultData }) => {
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
    const buttonStyle = {
        fontSize: "md",
        color:"white",
        fontWeight: 500,
        h: "40px",
        w: "235px",
    };
    const textareaStyles = {
        fontWeight: '500',
        color: 'navy.700',
        bg:  'transparent',
        border: '1px solid',
        borderColor: 'navy.100',
        borderRadius: '2px',
        fontSize: "md",
        _placeholder: { color: 'secondaryGray.600', fontWeight: '400' },
        _focus: {  border: '1px solid',
        borderColor: 'navy.100'},
        _hover: {  border: '1px solid',
        borderColor: 'navy.100'}
    }
    const [remarque, setRemaque] = useState<any>();
    const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const textareaValue = e.target.value;
        setRemaque(textareaValue)
    };
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onClose()
        const result = await Swal.fire({
			title: 'Êtes-vous sûr ?',
			icon: 'question',
			showCancelButton: true,
			confirmButtonText: 'Oui,Envoyer!',
			cancelButtonText: 'Annuler',
			confirmButtonColor: "#3085d6",
			customClass: {
				popup: 'custom-popup-class', // Classe CSS pour personnaliser la taille de la fenêtre
				confirmButton: 'custom-confirm-button-class', // Classe CSS pour personnaliser le bouton "Confirmer"
				title: 'custom-title-class', // Classe CSS pour personnaliser le titre
				icon: 'custom-icon-class', // Classe CSS pour personnaliser l'icône
			},
			backdrop: `
			  rgba(0,0,123,0.4)
			`
		});
		if (result.isConfirmed) {
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
                    axios.put(`http://localhost:3001/api/pointage/remarque/${id}`,{
                        remarque: remarque,
                        user_id:id
                    }).then(()=>{
                        Toast.fire({
                            icon: 'success',
                            title: 'Success'
                        })
                        onClose()
                        updateDefaultData()
                    });
			} catch (error) {
				Toast.fire({
					icon: 'error',
					title: 'Error'
				})
			}
		}
    };
    useEffect(() => {
        async function fetchData() {
            const response :any = await axios.get(`http://localhost:3001/api/pointage/${id}`)
            setRemaque(response?.data.remarque);
        }
        fetchData();
    }, []);

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="400px">
            <ModalOverlay sx={modalBlurStyle} />
                <ModalContent maxW="400px"  backgroundColor= "white" p={"24px"}>
                    <ModalCloseButton color="black" />
                    <ModalBody>
                    <>
                        <Heading textAlign="center"
                            color="navy.800"
                            fontSize="lg" 
                            fontWeight="bold" 
                            mb="4">
                            <Text>Ajouter vos remaque</Text>
                        </Heading>
                        <Divider my={4} borderColor="navy.800" />
                    </>
                    <form onSubmit={handleSubmit}>
                        <Box w="100%" mb="16px">
                            <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' color={"navy.800"} mb='8px'>
                                Remarque<Text color={"red.500"}>*</Text>
                            </FormLabel>
                            <Textarea isRequired={true} 
                                name="motif"
                                value={remarque}
                                onChange={(e) => handleTextareaChange(e)}
                                rows={2} placeholder='Motif' 
                                {...textareaStyles} />
                        </Box>
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
                                type="submit"
                                variant="brand"
                                {...buttonStyle}
                                >
                                Envoyer
                            </Button>
                            
                        </Flex>
                    </form>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
