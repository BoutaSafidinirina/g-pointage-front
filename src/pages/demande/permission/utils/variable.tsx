import { Icon } from "@chakra-ui/react";
import { MdDelete, MdEdit } from "react-icons/md";
import axios from 'axios';


async function fetchData(id:number, role:string,searchValue:string,filter:string) {
    try {
        if(searchValue !== ""){
			const response = await axios.get(`http://localhost:3001/api/permission/search/${searchValue}`); 
        	return response.data;
		}else if(filter !== ""){
			const response = await axios.get(`http://localhost:3001/api/permission/filter/${filter}`); 
        	return response.data;
		}else{
			if(id && role){
			const response = await axios.get(`http://localhost:3001/api/permission/${role}/${id}`); 
        	return response.data;
		}
		}
    } catch (error) {
        console.error("Erreur lors de la récupération des données : ", error);
        return [];
    }
}

type RowObj = {
	id :number;
	heure_debut: string;
	heure_fin: string;
	status : string ;
	destinataire: string ;
	employee : string ; 
	piece:string;
  	action: JSX.Element[];
};

async function generateTableData(id:number,role:string,searchValue:string,filter:string) {
	const dataFromAxios = await fetchData(id,role,searchValue,filter);
	const tableData: RowObj[] = dataFromAxios?.map((item:any) => {
		return {
			id :item.id,
			im:item.employee.im,
			heure_debut: item.heure_debut,
			heure_fin: item.heure_fin,
			status :item.status ? item.status :"",
			piece: item.piece_justificative ? item.piece_justificative:null,
			destinataire:item.destinataire_info.prenoms? `${item.destinataire_info.nom+" "+item.destinataire_info.prenoms}`:item.destinataire_info.nom,
			employee :item.destinataire_info.prenoms ? `${item.employee.nom +" "+item.employee.prenoms}`:item.employee.nom,
			action: [
				<Icon as={MdDelete} w='24px' h='24px' me='5px' color='red.500' />,
				<Icon as={MdEdit} w='24px' h='24px' me='5px' color='bleu.200' />
		],
		};
	});
 	 return tableData;
}

export default generateTableData;
