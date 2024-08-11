import { Box, Button, Flex,Text, Grid, SimpleGrid, useColorModeValue, Input } from '@chakra-ui/react';

import banner from '../../assets/img/auth/banner.png';
import Banner from './components/Banner';
import { useLocalStorage } from '../appContexte';
import React,{ FormEvent, useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../../components/card/Card';
import Information from './components/Information';
import Swal from 'sweetalert2';

type Field = {
    value?: any;
    error?: string;
    isValid?: boolean;
};
type Form = {
    im: Field;
    nom: Field;
    prenom: Field;
    tel: Field;
    email: Field;
    adresse: Field;
    poste: Field,
    photo: Field,
    agence:Field
};
export default function Profile () {
	const { authData } = useLocalStorage();
	const [ data, setData ] = useState<any>()
	const id = authData?.auth.employee_id;
	const role = authData?.auth.role;
	console.log(id)

	const [form, setForm] = useState<Form>({
        im: { value: "" },
        nom: { value: "" },
        prenom: { value: ""},
        tel: { value: "" },
        email: { value: "" },
        adresse: { value: "" },
        poste: { value: 0 },
        photo: { value: null },
        agence:{ value:""}
    });


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const fieldName: string = e.target.name;
        const fieldValue: string = e.target.value;
        const newField: Field = { [fieldName]: { value: fieldValue } };

        setForm({ ...form, ...newField });
    };
	async function fetchData() {
		try {
			const response = await axios.get(`http://localhost:3001/api/employee/${id}`);
			setData(response?.data)
			setForm({
				im: { value: response?.data && response?.data.im },
				nom: { value: response?.data && response?.data.nom },
				prenom: {value: response?.data && response?.data.prenoms},
				tel: { value: response?.data && response?.data.tel},
				email: { value: response?.data && response?.data.email },
				adresse: { value: response?.data && response?.data.adresse },
				poste: { value: response?.data && response?.data.poste_id },
				agence: { value: response?.data && response?.data.agence},
				photo: { value: response?.data && response?.data.photo }
			});
		} catch (error) {
				console.error("Une erreur s'est produite lors de la récupération des données :", error);
		}
	}
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
            formData.append("im", form.im.value);
            formData.append("nom", form.nom.value);
            formData.append("prenoms", form.prenom.value);
            formData.append("tel", form.tel.value);
            formData.append("email", form.email.value);
            formData.append("adresse", form.adresse.value);
			formData.append("poste_id", form.poste.value);
			formData.append("agence", form.agence.value);
           
			if (form.photo.value) {
                formData.append("photo", form.photo.value);
            }

            await axios.put(`http://localhost:3001/api/employee/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }).then(()=>{
                Toast.fire({
                    icon: 'success',
                    title: 'Success'
                })
                fetchData()
            })
        } catch (error) {
            console.error(error)
            Toast.fire({
                icon: 'error',
                title: 'Error'
            })
        }
    };
    useEffect(() => {
		fetchData();
	}, [id,role]);
	const textColorPrimary = useColorModeValue('secondaryGray.900', 'navy.800');
	const cardShadow = useColorModeValue('0px 18px 40px rgba(112, 144, 176, 0.12)', 'unset');
	
	return (
		<Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
			<Grid
				templateColumns={{
					base: '1fr',
					lg: '1.44fr 1.62fr'
				}}
				templateRows={{
					base: 'repeat(2, 1fr)',
					lg: '1fr'
				}}
				gap={{ base: '20px', xl: '20px' }}>
				<Banner
					gridArea='1 / 1 / 2 / 2'
					banner={banner}
					avatar={`http://127.0.0.1:3001/${authData?.auth.photo}`}
					name={data && data.prenoms ? `${data?.nom} ${data?.prenoms}`:`${data?.nom}`}
					job={data ? `${data?.poste.libelle}`:''}
					roleUser={role}
					agence={data ? `${data?.agence}`:''}
				/>
				<form onSubmit={handleSubmit}>
					<Card mb={{ base: '0px', '2xl': '20px' }} gridArea={{ base: '2 / 1 / 3 / 2', lg: '1 / 2 / 2 / 3' }} minH='365px' pe='20px'>
						<Text color={textColorPrimary} fontWeight='bold' fontSize='2xl' mt='10px' mb='4px'>
							Information Generale
						</Text>
						<SimpleGrid columns={2} gap='20px'>
							<Information name ="im" boxShadow={cardShadow} title='IM' value={form.im.value ? form.im.value:''} onChange={(e) => handleInputChange(e)} />
							<Information name = "nom" boxShadow={cardShadow} title='Nom' value={form.nom.value ? form.nom.value:''} onChange={(e) => handleInputChange(e)}/>
							<Information name="prenom"boxShadow={cardShadow} title='Prénom' value={form.prenom.value ? form.prenom.value:''} onChange={(e) => handleInputChange(e)}/>
							<Information name ="email"boxShadow={cardShadow} title='Email' value={form.email.value ? form.email.value:""} onChange={(e) => handleInputChange(e)}/>
							<Information name= "tel" boxShadow={cardShadow} title='Contact' value={form.tel.value  ? form.tel.value :""} onChange={(e) => handleInputChange(e)}/>
							<Information name="adresse" boxShadow={cardShadow} title='Adresse' value={form.adresse.value  ? form.adresse.value :""} onChange={(e) => handleInputChange(e)}/>
						</SimpleGrid>
						<Flex w='100%' float={"right"}>
							<Button
								me='100%'
								ml='300px'
								w='140px'
								minW='140px'
								mt={{ base: '20px', '2xl': 'auto'}}
								variant='brand'
								type='submit'
								color={"white"}
								fontWeight='500'>
								Modifier
							</Button>
						</Flex>
					</Card>
				</form>
			</Grid>
		</Box>
	);
}