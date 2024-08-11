import { Icon } from "@chakra-ui/react";
import { MdDelete, MdEdit } from "react-icons/md";
import axios from 'axios';

async function fetchData(id:number,role:string,searchValue:string,filter:string) {
    try {
        if(searchValue !== ""){
            const response = await axios.get(`http://localhost:3001/api/pointage/search/${searchValue}`); 
            return response.data;
        }else if(filter !== ""){
            const response = await axios.get(`http://localhost:3001/api/pointage/filter/${filter}`); 
            return response.data;
        }else{
            const response = await axios.get(`http://localhost:3001/api/pointage/${role}/${id}`); 
            return response.data;
        }
    } catch (error) {
        console.error("Erreur lors de la récupération des données : ", error);
        return [];
    }
}

type RowObj = {
	id :number;
    im: string;
	date_heure_entree: string;
	date_heure_sortie: string;
	status : string ;
	remarque: string ;
	employee_id: number;
	employee : string ; 
  	action: JSX.Element[];
};

async function generateTableData(id:number, role:string,searchValue:string,filter:string) {
    const dataFromAxios = await fetchData(id,role,searchValue,filter);
    const tableData: RowObj[] = dataFromAxios?.map((item:any) => {
        return {
            id :item.id,
            im:item.employee.im,
            date_heure_entree: item.date_heure_entree,
            date_heure_sortie: item.date_heure_sortie,
            status :item.status !== null ? item.status:"",
            remarque: item.remarque !== null ? item.remarque:"",
            employee_id: item.employee_id,
            employee :item.employee.prenoms !== null? `${item.employee.nom +" "+item.employee.prenoms}`: `${item.employee.nom}`,
            action: [
                <Icon as={MdDelete} w='24px' h='24px' me='5px' color='red.500' />,
                <Icon as={MdEdit} w='24px' h='24px' me='5px' color='bleu.200' />
            ],
        };
    });
    return tableData;
}


export default generateTableData;
