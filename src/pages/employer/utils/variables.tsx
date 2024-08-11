import { Icon } from "@chakra-ui/react";
import { MdDelete, MdEdit } from "react-icons/md";
import axios from 'axios';


async function fetchData() {
  try {
    const response = await axios.get('http://localhost:3001/api/employee'); 
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des données : ", error);
    return [];
  }
}

type RowObj = {
  id : number;     
  im :string;
  nom:string[];
  tel    : string;
  email  : string;
  adresse : string;
  photo   : string;
  poste_id  : number;
  poste : string;
  action: JSX.Element[];
};

async function generateTableData() {
  const dataFromAxios = await fetchData();
  const tableData: RowObj[] = dataFromAxios?.map((item:any) => {
    return {
      id : item.id,    
      im :item.im,
      nom: [item.nom, item.prenoms],
      tel    : item.tel,
      email  : item.email,
      adresse : item.adresse,
      photo   : `http://127.0.0.1:3001/${item.photo}`,
      poste_id  : item.poste_id,
      poste:  item.poste.libelle,
      action: [
        <Icon as={MdDelete} w='24px' h='24px' me='5px' color='red.500' />,
        <Icon as={MdEdit} w='24px' h='24px' me='5px' color='bleu.200' />
      ],
    };
  });
  return tableData;
}

export default generateTableData;
