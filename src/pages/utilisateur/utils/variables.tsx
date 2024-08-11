import { Icon } from "@chakra-ui/react";
import { MdCancel, MdCheckCircle, MdDelete } from "react-icons/md";
import axios from 'axios';


async function fetchData() {
    try {
        const response = await axios.get('http://localhost:3001/api/user'); 
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des données : ", error);
        return [];
    }
}

type RowObj = {
    id: number;
    email: string;
    pseudo:string;
    role: string;
    employee:string;
    action: JSX.Element[];
};

async function generateTableData() {
    const dataFromAxios = await fetchData();
    const tableData: RowObj[] = dataFromAxios?.map((item:any) => {
        return {
        id: item.id,
        im: item.employee.im ?item.employee.im :"",
        email: item.employee.email ? item.employee.email :"",
        role:item.role,
        pseudo: item.pseudo,
        employee : item.employee.prenoms ? `${item.employee.nom +" "+item.employee.prenoms}` :item.employee.nom,
        action: [
                <Icon as={MdDelete} w='24px' h='24px' me='5px' color='red.500' />,
                <Icon as={MdCheckCircle} w='24px' h='24px' me='5px' color='green.500' />,
                <Icon as={MdCancel} w='24px' h='24px' me='5px' color='gray.500' />
            ],
        };
    });
    return tableData;
}


export default generateTableData;
