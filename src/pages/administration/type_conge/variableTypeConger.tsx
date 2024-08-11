import { Icon } from "@chakra-ui/react";
import { MdDelete, MdEdit } from "react-icons/md";
import axios from 'axios';


async function fetchData() {
  try {
    const response = await axios.get('http://localhost:3001/api/type'); 
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des données : ", error);
    return [];
  }
}

type RowObj = {
  id: number;
  designation: string;
  action: JSX.Element[];
};

async function generateTableData() {
  const dataFromAxios = await fetchData();
  const tableData: RowObj[] = dataFromAxios?.map((item:any) => {
    return {
      id: item.id,
      designation: item.designation ? item.designation:"",
      action: [
        <Icon as={MdDelete} w='24px' h='24px' me='5px' color='red.500' />,
        <Icon as={MdEdit} w='24px' h='24px' me='5px' color='bleu.200' />
      ],
    };
  });
  return tableData;
}


export default generateTableData;
