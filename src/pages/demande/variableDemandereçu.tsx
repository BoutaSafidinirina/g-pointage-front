import { Icon } from "@chakra-ui/react";
import { MdCancel, MdCheckCircle, MdDelete, MdEdit } from "react-icons/md";
import axios from 'axios';


async function fetchData(id:number, role:string) {
    try {
        const response = await axios.get(`http://localhost:3001/api/demande/${role}/${id}`); 
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des données : ", error);
        return [];
    }
}

type RowObj = {
	id :number;
	im :string;
	debut: string;
	fin: string;
	status : string ;
	motif: string ;
	piece: string ;
	employee : string ; 
  	action: JSX.Element[];
};

async function generateTableData(id:number,role:string) {
	const dataFromAxios = await fetchData(id,role);
	const tableData: RowObj[] = dataFromAxios ? dataFromAxios?.map((item:any) => {
		return {
			id :item.id,
			im:item.employee.im,
			debut: item.heure_debut ? item.heure_debut : item.date_debut ? item.date_debut :"",
			fin: item.heure_fin ? item.heure_fin : item.date_fin ? item.date_fin:"",
			status :item.status ? item.status:"",
			piece: item.piece_justificative ? item.piece_justificative:null,
			type_conge : item.type_conge ? item.type_conge.designation: null,
			motif:item.motif ? item.motif:"",
			photo:item.employee.photo ? item.employee.photo :"",
			employee :item.employee.prenoms ? `${item.employee.nom +" "+item.employee.prenoms}`:item.employee.nom,
			action: [
				<Icon as={MdCheckCircle} w='24px' h='24px' me='5px' color='green.500' />,
				<Icon as={MdCancel} w='24px' h='24px' me='5px' color='red.200' />
			],
		};
	}):{};
 	 return tableData;
}


export default generateTableData;
