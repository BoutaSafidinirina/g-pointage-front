import { Icon } from "@chakra-ui/react";
import { MdDelete, MdEdit } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import axios from 'axios';


async function fetchData(id:number,role:string,searchValue:string,filter:string) {
  try {
	if(searchValue !== ""){
		const response = await axios.get(`http://localhost:3001/api/conge/search/${searchValue}`); 
    	return response.data;
	}else if(filter !== ""){
		const response = await axios.get(`http://localhost:3001/api/conge/filter/${filter}`); 
		return response.data;
	}{
		if(id && role){
			const response = await axios.get(`http://localhost:3001/api/conge/${role}/${id}`); 
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
	date_debut: string;
	date_fin: string;
	nb_jour_restant:number;
	status : string ;
	destinataire: string ;
	remarque: string ;
	type_conge: string;
	employee : string ; 
	motif: string ; 
	piece: string ;
  	action: JSX.Element[];
};

async function generateTableData(id:number,role:string,searchValue:string,filter:string) {
	const dataFromAxios = await fetchData(id,role,searchValue,filter);
	const tableData: RowObj[] =  dataFromAxios?.map((item:any) => {
		return {
			id :item.id,
			im:item.employee.im ? item.employee.im :"",
			date_debut: item.date_debut,
			date_fin: item.date_fin,
			status :item.status ? item.status :"",
			remarque: item.remarque ?item.remarque:"",
			nb_jour_restant: item.nb_jour_restant,
			motif: item.motif ? item.motif:"",
			piece: item.piece_justificative ? item.piece_justificative:null,
			destinataire: item.destinataire_info.prenoms? `${item.destinataire_info.nom+" "+item.destinataire_info.prenoms}` :item.destinataire_info.nom,
			type_conge	: item.type_conge.designation,
			employee : item.employee.prenoms  ?`${item.employee.nom +" "+item.employee.prenoms}`:item.employee.nom,
			action: [
				<Icon as={MdDelete} w='24px' h='24px' me='5px' color='red.500' />,
				<Icon as={MdEdit} w='24px' h='24px' me='5px' color='bleu.200' />,
				<Icon as={RiEyeCloseLine} w='24px' h='24px' me='5px' color='green.500' />
		],
		};
	});
 	 return tableData;
}


export default generateTableData;
