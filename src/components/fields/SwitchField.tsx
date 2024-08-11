// Chakra imports
import { Avatar, Box, Button, Flex, FormLabel, Text, useColorModeValue } from '@chakra-ui/react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useLocalStorage } from '../../pages/appContexte';
import { RefusedRequest } from '../../pages/demande/refused';
import { useState } from 'react';

export default function Default(props: {
	id: number;
	type_conge:any;
	label?: string;
	textWidth?: string | number;
	reversed?: boolean;
	[x: string]: any;
	action:any;
	data:any;
	photo:any;
	updateDefaultData :()=> void;
}) {
	const {action,data, id, label,type_conge,photo, textWidth, reversed, fontSize, ...rest } = props;
	const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
	const { authData } = useLocalStorage();
    const role = authData?.auth.role;

	const [isOpen, setIsOpen] = useState(false);
	
    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

	const handleValidate = async () => {
		const result = await Swal.fire({
			title: 'Êtes-vous sûr de vouloir valider cette demande?',
			icon: 'question',
			showCancelButton: true,
			confirmButtonText: 'Oui,valider!',
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
				if(role == "admin"){
					if(type_conge !== null){
						axios.put(`http://localhost:3001/api/conge/approve/${id}`,{
							approved_by_admin: true
						}).then(()=>{
							Toast.fire({
								icon: 'success',
								title: 'Success'
							})
							props.updateDefaultData()
						});
					}else{
						axios.put(`http://localhost:3001/api/permission/approve/${id}`,{
							approved_by_admin: true
						}).then(()=>{
							Toast.fire({
								icon: 'success',
								title: 'Success'
							})
							props.updateDefaultData()
						});
					}
				}else{
					if(type_conge !== null){
						axios.put(`http://localhost:3001/api/conge/approve/${id}`,{
							approved_by_superior: true
						}).then(()=>{
							Toast.fire({
								icon: 'success',
								title: 'Success'
							})
							props.updateDefaultData()
						});
					}else{
						axios.put(`http://localhost:3001/api/permission/approve/${id}`,{
							approved_by_superior: true
						}).then(()=>{
							Toast.fire({
								icon: 'success',
								title: 'Success'
							})
							props.updateDefaultData()
						});
					}
				}
			} catch (error) {
				Toast.fire({
					icon: 'error',
					title: 'Error'
				})
			}
		}
	};
	
	return (
		<Box w='100%' fontWeight='500' {...rest}>
			<>
				{ reversed  ? 
					<Flex align='center' justifyContent='space-between' borderRadius='16px'>
						<Flex align='center' w={"600px"}>
							<Flex align='center'>
								<Avatar
									src={`http://127.0.0.1:3001/${photo}`}
									w='30px'
									h='30px'
									me='8px'
								/>
								<FormLabel
									ms='15px'
									_hover={{ cursor: 'pointer' }}
									flexDirection='column'
									mb='0px'
									maxW={textWidth ? textWidth : '75%'}>
									<Text color={textColorPrimary} fontSize='md' fontWeight='500'>
										{label}
									</Text>
								</FormLabel>
							</Flex>
						</Flex>
						<Flex align='center' borderRadius='16px'>
							<Button bg={"green.300"} mx={'10px'}fontSize='sm' fontWeight='500' color={"#ffffff"}  onClick={handleValidate} borderRadius='7px'>
								{action[0]}Valider
							</Button>
							<Button bg={"red.300"} mx={'10px'}fontSize='sm' fontWeight='500' color={"#ffffff"} onClick={openModal} borderRadius='7px'>
								{action[1]} Refuser
							</Button>
						</Flex>
					</Flex>	
				: (
					<Flex mx={"50px"} justify='space-between' align='center' borderRadius='16px'>
						<FormLabel
							_hover={{ cursor: 'pointer' }}
							flexDirection='column'
							maxW={textWidth ? textWidth : '75%'}>
							<Text color={textColorPrimary} fontSize='md' fontWeight='500'>
								{label}
							</Text>
						</FormLabel>
					</Flex>
				)}
			</>
			<RefusedRequest type_conge={type_conge} isOpen={isOpen} id={id} onClose={closeModal} updateDefaultData={props.updateDefaultData} />
		</Box>
	);
}
