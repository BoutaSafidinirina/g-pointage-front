import React, { ChangeEvent, FormEvent, FunctionComponent, useEffect, useRef, useState } from "react";
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
    FormLabel,
    Select,
    SimpleGrid,
    Box,
} from "@chakra-ui/react";

import Card from '../../components/card/Card';
import generateTableData from "../administration/post/variablePoste";
import Swal from "sweetalert2";
import axios from "axios";

interface AddModalProps {
    isOpen: boolean;
    onClose: () => void;
    updateDefaultData: () => void;
}
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
export const AddEmployer: FunctionComponent<AddModalProps> = ({
    isOpen,
    onClose,
    updateDefaultData
}) => {
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

    const inputStyle = {
        variant: "container",
        fontSize: "md",
        fontWeight: 500,
        mb: "16px",
        size: "md",
    };

    const buttonStyle = {
        fontSize: "md",
        fontWeight: 500,
        color: "white",
        h: "40px",
        w: "235px",
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
    const [ poste,  setDataPoste ] = useState([]);

    useEffect(() => {
        async function fetchData() {
        const data: any = await generateTableData();
            setDataPoste(data);
        }
        fetchData();
    }, []);

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

    const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const selectedPoste = e.target.value;
        setForm({
            ...form,
            poste: {
                ...form.poste,
                value: selectedPoste,
            },
        });
    };
    const [selectedFileName, setSelectedFileName] = useState<string | null>(null);

    const handleInputFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0] || null;
        if (selectedFile) {
            setSelectedFileName(selectedFile.name);
        } else {
            setSelectedFileName(null);
        }
        setForm({
            ...form,
            photo: {
                ...form.photo,
                value: selectedFile,
            },
        });
    };

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
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

            await axios.post('http://localhost:3001/api/employee', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }).then(()=>{
                onClose()
                updateDefaultData()
                Toast.fire({
                    icon: 'success',
                    title: 'Success'
                })
                setForm({
                    im: { value: "" },
                    nom: { value: "" },
                    prenom: { value: ""},
                    tel: { value: "" },
                    email: { value: "" },
                    adresse: { value: "" },
                    poste: { value: 0 },
                    photo: { value: null },
                    agence:{ value:""}
                })
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
            <ModalContent w={'auto'} p="24px"  backgroundColor= "transparent">
                <Card maxW={"600px"} mb={{ base: '0px', '2xl': '20px' }} gridArea={{ base: '2 / 1 / 3 / 2' }} minH='365px' pe='20px'>
                    <ModalCloseButton color="black" />
                    <ModalBody>
                        <>
                            <Heading
                                textAlign="center"
                                color="navy.800"
                                fontSize="lg"
                                fontWeight="bold"
                                mb="4"
                                >
                                <Text>Ajouter Nouvelle Employé</Text>
                            </Heading>
                            <Divider my={4} borderColor="navy.800" />
                        </>
                        <form onSubmit={handleSubmit}>
                            <SimpleGrid columns={2} gap='20px'>
                                <Box>
                                    <FormLabel
                                        display="flex"
                                        ms="4px"
                                        fontSize="sm"
                                        fontWeight="500"
                                        color={"navy.800"}
                                        mb="8px"
                                        >
                                        IM<Text color={"red.400"}>*</Text>
                                    </FormLabel>
                                    <Input
                                        isRequired={true}
                                        placeholder="IM"
                                        name="im"
                                        value={form.im.value}
                                        onChange={(e) => handleInputChange(e)}
                                        {...inputStyle}
                                    />
                                </Box>
                                <Box>
                                    <FormLabel
                                            display="flex"
                                            ms="4px"
                                            fontSize="sm"
                                            fontWeight="500"
                                            color={"navy.800"}
                                            mb="8px"
                                        >
                                        Nom<Text color={"red.400"}>*</Text>
                                    </FormLabel>
                                    <Input
                                        isRequired={true}
                                        placeholder="Nom"
                                        name="nom"
                                        value={form.nom.value}
                                        onChange={(e) => handleInputChange(e)}
                                        {...inputStyle}
                                    />
                                </Box>
                                <Box>
                                    <FormLabel
                                        display="flex"
                                        ms="4px"
                                        fontSize="sm"
                                        fontWeight="500"
                                        color={"navy.800"}
                                        mb="8px"
                                        >
                                        Prénom
                                    </FormLabel>
                                    <Input
                                        placeholder="Prénom"
                                        name="prenom"
                                        value={form.prenom.value}
                                        onChange={(e) => handleInputChange(e)}
                                        {...inputStyle}
                                        />
                                </Box>
                                <Box>
                                    <FormLabel
                                        ms="4px"
                                        fontSize="sm"
                                        fontWeight="500"
                                        color={"navy.800"}
                                        display="flex"
                                        >
                                        Mail<Text color={"red.400"}>*</Text>
                                    </FormLabel>
                                    <Input
                                        isRequired={true}
                                        placeholder="Mail"
                                        name="email"
                                        value={form.email.value}
                                        onChange={(e) => handleInputChange(e)}
                                        {...inputStyle}
                                    />
                                </Box>
                                <Box>
                                    <FormLabel
                                        display="flex"
                                        ms="4px"
                                        fontSize="sm"
                                        fontWeight="500"
                                        color={"navy.800"}
                                        mb="8px"
                                        >
                                        Contact<Text color={"red.400"}>*</Text>
                                    </FormLabel>
                                    <Input
                                        isRequired={true}
                                        placeholder="Contact"
                                        name="tel"
                                        value={form.tel.value}
                                        onChange={(e) => handleInputChange(e)}
                                        {...inputStyle}
                                    />
                                </Box>
                                <Box>
                                    <FormLabel
                                        display="flex"
                                        ms="4px"
                                        fontSize="sm"
                                        fontWeight="500"
                                        color={"navy.800"}
                                        mb="8px"
                                        >
                                        Adresse<Text color={"red.400"}>*</Text>
                                    </FormLabel>
                                    <Input
                                        isRequired={true}
                                        placeholder="Adresse"
                                        name="adresse"
                                        value={form.adresse.value}
                                        onChange={(e) => handleInputChange(e)}
                                        {...inputStyle}
                                    />
                                </Box>
                                <Box>
                                    <FormLabel
                                        display="flex"
                                        ms="4px"
                                        fontSize="sm"
                                        fontWeight="500"
                                        color={"navy.800"}
                                        mb="8px"
                                    >
                                    Poste<Text color={"red.400"}>*</Text>
                                    </FormLabel>
                                    <Select
                                        placeholder="Sélectionnez une Poste"
                                        display="flex"
                                        {...selectStyle}
                                        name="poste"
                                        value={form.poste.value}
                                        onChange={(e) => handleSelectChange(e)}
                                    >
                                    {poste?.map((option: any) => (
                                        <option key={option.id} value={option.id}>
                                        {option.libelle}
                                        </option>
                                    ))}
                                    </Select>
                                </Box>
                                <Box>
                                    <FormLabel
                                        display="flex"
                                        ms="4px"
                                        fontSize="sm"
                                        fontWeight="500"
                                        color={"navy.800"}
                                        mb="8px"
                                    >
                                    Agence<Text color={"red.400"}>*</Text>
                                    </FormLabel>
                                    <Input
                                        isRequired={true}
                                        placeholder="Agence"
                                        name="agence"
                                        value={form.agence.value}
                                        onChange={(e) => handleInputChange(e)}
                                        {...inputStyle}
                                    />
                                </Box>
                                <Box mb="16px">
                                    <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' color={"navy.800"} mb='8px'>
                                        Photo
                                    </FormLabel>
                                    <Input 
                                        accept="image/*"
                                        placeholder="Photo"
                                        name="photo"
                                        type="file"
                                        onChange={(e) => handleInputFileChange(e)}
                                        
                                        ref={fileInputRef}
                                        position="absolute"
                                        opacity="0"
                                        zIndex="-1"/>
                                    <Flex w={"100%"} p={"none"} borderRadius={"2px"}
                                            border ='1px solid'
                                            borderColor ='navy.100' display="flex" alignItems={"center"}>
                                        <Button
                                            fontWeight ='500'
                                            color = 'navy.700'
                                            borderRadius={"none"}
                                            bg ='gray.200'
                                            fontSize = "sm"
                                            size ="md"
                                            onClick={handleButtonClick}
                                        >
                                            Parcourir
                                        </Button>
                                        {selectedFileName && (
                                            <Text ml={"5px"} fontSize="sm" color="gray.800">
                                                {selectedFileName}
                                            </Text>
                                        )}
                                    </Flex>
                                </Box>
                            </SimpleGrid>
                        <Flex justifyContent="space-between" align="center" mb="24px">
                        <Button
                            variant="setup"
                            {...buttonStyle}
                            onClick={onClose}
                        >
                            Annuler
                        </Button>
                        <Button
                            variant="brand"
                            type="submit"
                            {...buttonStyle}
                        >
                            Ajouter
                        </Button>
                        </Flex>
                    </form>
                    </ModalBody>
                </Card>
            </ModalContent>
        </Modal>
    );
};
