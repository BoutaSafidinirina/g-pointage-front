import React, { ChangeEvent, FormEvent, FunctionComponent, useEffect, useState } from "react";
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
  Select,
} from "@chakra-ui/react";
import Swal from "sweetalert2";
import axios from "axios";
import generateTableData from "./variablePoste";

interface AddModalProps {
  isOpen: boolean;
  onClose: () => void;
  updateDefaultData:() => void;
  id: number;
}
type Field = {
    value?: any;
    error?: string;
    isValid?: boolean;
};
type Form = {
    libelle: Field;
    superieur: Field;
};
export const EditPost: FunctionComponent<AddModalProps> = ({ isOpen, onClose,updateDefaultData,id}) => {
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
        variant:'container',
        fontSize: "md",
        fontWeight: 500,
        mb:"16px" ,
        size: "md",
    };
    const buttonStyle = {
        fontSize: "md",
        color:"white",
        fontWeight: 500,
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

    const [form, setForm] = useState<Form>({
        libelle: { value: "" },
        superieur:{ value:"" }
    });
    
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const fieldName: string = e.target.name;
        const fieldValue: string = e.target.value;
        const newField: Field = { [fieldName]: { value: fieldValue } };

        setForm({ ...form, ...newField });
    };
    const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const selectedPoste = e.target.value;
        setForm({
            ...form,
            superieur: {
                ...form.superieur,
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

        axios.put(`http://localhost:3001/api/post/${id}`, {
            libelle: form.libelle.value,
            n_plus_un: form.superieur.value
        }).then(()=>{
            Toast.fire({
                icon: 'success',
                title: 'Success'
            })
            updateDefaultData()
            onClose()
            
        })

        } catch (error) {
            Toast.fire({
                icon: 'error',
                title: 'Error'
            })
        }
    };
    const [ poste,  setDataPoste ] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const data: any = await generateTableData();
            setDataPoste(data);
            const response = await axios.get(`http://localhost:3001/api/post/${id}`);
            setForm({
                libelle: {value : response?.data.libelle},
                superieur :{value : response?.data.n_plus_un}
            });
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
                            <Text>Modification</Text>
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
                                Libellé<Text color={"red.400"}>*</Text>
                            </FormLabel>
                            <Input
                                isRequired={true}
                                type="text"
                                placeholder="Libellé"
                                name="libelle"
                                value={form.libelle.value}
                                onChange={handleInputChange}
                                {...inputStyle}
                            />
                            <FormLabel
                                display="flex"
                                ms="4px"
                                fontSize="md" 
                                fontWeight="500"
                                color={"navy.800"}
                                
                                mb="8px"
                                >
                                Supérieur<Text color={"red.400"}>*</Text>
                            </FormLabel>
                            <Select
                                    placeholder="Sélectionnez une Poste"
                                    display="flex"
                                    {...selectStyle}
                                    name="superieur"
                                    value={form.superieur.value}
                                    onChange={(e) => handleSelectChange(e)}
                                >
                                {poste?.map((option: any) => (
                                    <option key={option.id} value={option.id}>
                                    {option.libelle}
                                    </option>
                                ))}
                            </Select>
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
                                type="submit"
                                variant="brand"
                                {...buttonStyle}
                                >
                                Modifier
                            </Button>
                            
                        </Flex>
                    </form>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
