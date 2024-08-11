import { Icon } from "@chakra-ui/react";
import { MdDelete, MdEdit } from "react-icons/md";
import axios from 'axios';


async function fetchData() {
  try {
    const response = await axios.get('http://localhost:3001/api/post'); 
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des données : ", error);
    return [];
  }
}

type RowObj = {
    id: number;
    libelle: string;
    superieur:string;
    action: JSX.Element[];
};


async function generateTableData() {
    const dataFromAxios = await fetchData();
    const tableData: RowObj[] = dataFromAxios ? dataFromAxios?.map((item:any) => {
        return {
        id: item.id,
        libelle: item.libelle ? item.libelle:"",
        superieur: item.poste?.libelle ? item.poste?.libelle:"",
        action: [
            <Icon as={MdDelete} w='24px' h='24px' me='5px' color='red.500' />,
            <Icon as={MdEdit} w='24px' h='24px' me='5px' color='bleu.200' />
        ],
        };
    }):{};
  return tableData;
}


export default generateTableData;
