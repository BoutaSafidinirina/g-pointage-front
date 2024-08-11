import React, { ChangeEvent, FormEvent, FunctionComponent, useEffect, useRef, useState } from "react";
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
  FormLabel,
  Textarea,
  SimpleGrid,
  Box,
} from "@chakra-ui/react";

import generateTableData from '../../administration/type_conge/variableTypeConger';
import axios from "axios";
import Swal from "sweetalert2";
import { useLocalStorage } from "../../appContexte";
import Card from '../../../components/card/Card';
interface AddModalProps {
  isOpen: boolean;
  onClose: () => void;
  updateDefaultData : () => void;
}
type Field = {
    value?: any;
    error?: string;
    isValid?: boolean;
};
type Form = {
    date_debut: Field;
    date_fin: Field;
    motif: Field;
    status: Field;
    piece_justificative: Field;	
    type_conge_id: Field;
    emp_id : Field;	
    destinataire: Field;
};
export const AddConger: FunctionComponent<AddModalProps> = ({ isOpen, onClose,updateDefaultData }) => {
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
        color:"white",
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
    const [tableData, setTableData] = useState([]);
    const [destina, setDestinataire] = useState<any>();
    const { authData } = useLocalStorage();
	const idEmpl = authData?.auth.employee_id;
    
    useEffect(() => {
        async function fetchData() {
            if(idEmpl){
                const data:any = await generateTableData();
                setTableData(data);
                const destinataire:any = await axios.get(`http://localhost:3001/api/employee/list-destinataire/${idEmpl}`)
                setDestinataire(destinataire?.data);
            }
        }
        fetchData();
    }, [idEmpl]);
    const [form, setForm] = useState<Form>({
        date_debut: { value: "" },
        date_fin: { value: "" },
        motif: { value: ""},
        destinataire: { value: "" },
        status: { value: "" },
        type_conge_id: { value: 0 },
        emp_id: { value: 0 },
        piece_justificative: { value: null }
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const fieldName: string = e.target.name;
        const fieldValue: string = e.target.value;
        const newField: Field = { [fieldName]: { value: fieldValue } };

        setForm({ ...form, ...newField });
    };

    const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const fieldName: string = e.target.name;
        const fieldValue: string = e.target.value;
        const newField: Field = { [fieldName]: { value: fieldValue } };

        setForm({ ...form, ...newField });
    };
    const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const textareaValue = e.target.value;
        setForm({
            ...form,
            motif: {
                ...form.motif,
                value: textareaValue,
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
            piece_justificative: {
                ...form.piece_justificative,
                value: selectedFile,
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
            formData.append("date_debut", form.date_debut.value);
            formData.append("date_fin", form.date_fin.value);
            formData.append("destinataire", form.destinataire.value);
            formData.append("emp_id", idEmpl);
            formData.append("motif", form.motif.value);
            formData.append("type_conge_id", form.type_conge_id.value);
            
            if (form.piece_justificative.value) {
                formData.append("piece_justificative", form.piece_justificative.value);
            }

            await axios.post('http://localhost:3001/api/conge/request', formData, {
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
                    date_debut: { value: "" },
                    date_fin: { value: "" },
                    motif: { value: ""},
                    destinataire: { value: "" },
                    status: { value: "" },
                    type_conge_id: { value: 0 },
                    emp_id: { value: 0 },
                    piece_justificative: { value: null }
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
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };
    return (
        <Modal isOpen={isOpen} onClose={onClose} size="auto">
            <ModalOverlay sx={modalBlurStyle} />
            <ModalContent w="auto" p='24px' backgroundColor= "transparent">
                <Card maxW={"600px"} mb={{ base: '0px', '2xl': '20px' }} gridArea={{ base: '2 / 1 / 3 / 2' }} minH='365px' pe='20px'>
                    <ModalCloseButton color="black" />
                    <ModalBody>
                        <Heading textAlign="center"
                            color="navy.800"
                            fontSize="lg" 
                            fontWeight="bold" 
                            mb="4">
                            <Text>NOUVEAU DEMANDE CONGÉ</Text>
                        </Heading>
                        <Divider my={4} borderColor="navy.800" />
                        <form onSubmit={handleSubmit}>
                            <SimpleGrid columns={2} gap='20px'>
                                <Box>
                                    <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' color={"navy.800"} mb='8px'>
                                        Im et Nom<Text color={"red.500"}>*</Text>
                                    </FormLabel>
                                    <Input isRequired={true}
                                        disabled  
                                        name="employee"
                                        value={authData?.auth.info}
                                        onChange={(e) => handleInputChange(e)}
                                        type='text' placeholder='employee' {...inputStyle} 
                                    />
                                </Box>
                                <Box>
                                    <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' color={"navy.800"} mb='8px'>
                                        Destinataire<Text color={"red.500"}>*</Text>
                                    </FormLabel>
                                    <Box>
                                    <Select placeholder="Destinataire" 
                                        display='flex' 
                                        value={form.destinataire.value}
                                        name="destinataire"
                                        onChange={(e) => handleSelectChange(e)} 
                                        {...selectStyle}>
                                        {destina && Array.isArray(destina) && destina.length > 0 ? (
                                            destina?.map((option: any) => (
                                                <option value={option.id}>
                                                    {option.im} : {option.nom} {option.prenoms ? option.prenoms : ""}
                                                </option>
                                            ))
                                        ) : (
                                            <option value={""}>
                                                Aucun Destinataire à afficher
                                            </option>
                                        )}
                                    </Select>
                                </Box>
                                </Box>
                                <Box> 
                                    <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' color={"navy.800"} mb='8px'>
                                        Date de début<Text color={"red.500"}>*</Text>
                                    </FormLabel>
                                    <Input isRequired={true}  
                                        name="date_debut"
                                        value={form.date_debut.value}
                                        onChange={(e) => handleInputChange(e)}
                                        type='date' placeholder='Date de début' {...inputStyle} 
                                    />
                                </Box>
                                <Box>
                                    <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' color={"navy.800"} mb='8px'>
                                        Date de fin<Text color={"red.500"}>*</Text>
                                    </FormLabel>
                                    <Input isRequired={true} 
                                        name="date_fin"
                                        value={form.date_fin.value}
                                        onChange={(e) => handleInputChange(e)}
                                        type='date' placeholder='Date de fin' 
                                        {...inputStyle} />
                                </Box>
                                <Box>
                                    <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' color={"navy.800"} mb='8px'>
                                        Type<Text color={"red.500"}>*</Text>
                                    </FormLabel>
                                    <Select placeholder="Type Congé" 
                                        value={form.type_conge_id.value}
                                        name="type_conge_id"
                                        onChange={(e) => handleSelectChange(e)} display='flex'
                                        {...selectStyle}>
                                        {tableData.map((option:any) => (
                                            <option key={option.id} value={option.id}>
                                                {option.designation}
                                            </option>
                                        ))}
                                    </Select>
                                </Box>
                                <Box>
                                    <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' color={"navy.800"} mb='8px'>
                                        Pièce jointe
                                    </FormLabel>
                                    <Input
                                            name="piece_justificative"
                                            onChange={(e) => handleInputFileChange(e)}
                                            type='file'
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
                                            <Text fontSize="sm" ml={"5px"} color="gray.800">
                                                {selectedFileName}
                                            </Text>
                                        )}
                                    </Flex>
                                </Box>
                            </SimpleGrid>
                            <Box width="100%" mb={"10px"}>
                                <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' color={"navy.800"} mb='8px'>
                                    Motif<Text color={"red.500"}>*</Text>
                                </FormLabel>
                                <Textarea  ms='4px'isRequired={true} 
                                    name="motif"
                                    value={form.motif.value}
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
