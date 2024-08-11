import React, { useEffect, useRef, useState } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Td,

} from "@chakra-ui/react";
import axios from 'axios';
import moment from 'moment';
interface ChildComponentProps {
    id: number,
}
const GeneratePdfPermission = React.forwardRef<HTMLDivElement, ChildComponentProps>(({id }: ChildComponentProps,ref: React.ForwardedRef<HTMLDivElement>,): JSX.Element => {
    console.log(id)

    const [defaultData,setDefaultData] = useState<any>()
    const [differenceHeures, setDifferenceHeures] = useState(0);
    const [differenceMinutes, setDifferenceMinutes] = useState(0);
    const [differenceSecondes, setDifferenceSecondes] = useState(0);

    useEffect(() => {
        console.log('useEffect is triggered'+ id);
		async function fetchData() {
		try {
			const response = await axios.get(`http://localhost:3001/api/demande/info/permission/${id}`);
			setDefaultData(response.data);
            const heure1 = defaultData && moment.utc(defaultData?.heure_debut).format("DD-MM-YYYY HH:mm")
            const heure2 = defaultData && moment.utc(defaultData?.heure_fin).format("DD-MM-YYYY HH:mm")

            const difference = moment.duration(heure2.diff(heure1));

            setDifferenceHeures(difference.hours());
            setDifferenceMinutes(difference.minutes());
            setDifferenceSecondes(difference.seconds());

		} catch (error) {
			console.error("Une erreur s'est produite lors de la récupération des données :", error);
			}
		}
		fetchData();
    }, [id]);
    console.log(defaultData)
    return (
        <div style={{padding:"10px"}} ref={ref}>
            <h4 style={{ textAlign: "center" ,marginBottom:"10px"}}>DEMANDE DE PERMISSION</h4>
            <Table width="100%" border={"none"} borderTop={"1px solid gray.800"}>
                <Thead>
                </Thead>
                <Tbody>
                    <Tr>
                        <Td  colSpan={1} color={"gray.400"} textAlign="left" border={"none"}>Nom</Td>
                        <Td colSpan={4} textAlign="left" border={"none"}>{defaultData && defaultData?.employee.nom}</Td>
                    </Tr>
                    <Tr>
                        <Td colSpan={1} color={"gray.400"} textAlign="left" border={"none"}>Prénom</Td>
                        <Td colSpan={4} textAlign="left" border={"none"}>{defaultData && defaultData?.employee.prenoms ? defaultData?.employee.prenoms:""}</Td>
                    </Tr>
                    <Tr>
                        <Td colSpan={1} color={"gray.400"} textAlign="left" border={"none"}>Fonction :</Td>
                        <Td colSpan={1} textAlign="left" border={"none"}>{defaultData && defaultData?.employee.poste.libelle}</Td>
                        <Td color={"gray.400"} textAlign="left" border={"none"}>Agence :  {defaultData && defaultData?.employee.agence}</Td>
                    </Tr>
                    <Tr>
                        <Td colSpan={1} color={"gray.400"}textAlign="left" border={"none"}>Durée du permission</Td>
                        <Td colSpan={4} textAlign="left" border={"none"}>{defaultData && defaultData?.duree} heures</Td>
                    </Tr>
                    <Tr>
                        <Td colSpan={1} color={"gray.400"}textAlign="left" border={"none"}>Date</Td>
                        <Td colSpan={1} textAlign="left" border={"none"}>Depart: {defaultData && moment.utc(defaultData?.heure_debut).format("DD-MM-YYYY HH:mm")}</Td>
                        <Td colSpan={3} textAlign="left" border={"none"}>Reprise : {defaultData && moment.utc(defaultData?.heure_fin).format("DD-MM-YYYY HH:mm")}</Td>
                    </Tr>
                    <Tr>
                        <Td colSpan={1}textAlign="left" color={"gray.400"} border={"none"}>Motif :</Td>
                        <Td colSpan={5} textAlign="left" border={"none"}>{defaultData && defaultData?.motif ? defaultData?.motif : ""}</Td>
                    </Tr>
                    <Tr>
                        <Td colSpan={3} color={"gray.400"} textAlign="left" border={"none"}>Reste droit de l'année :</Td>
                        <Td colSpan={2} textAlign="left" border={"none"}></Td>
                    </Tr>
                    <Tr>
                        <Td colSpan={1} textAlign="left" border={"none"}>La direction</Td>
                        <Td colSpan={1.5} textAlign="left" border={"none"}>Le responsable du personnelle</Td>
                        <Td colSpan={1.5} textAlign="left" border={"none"}>Le supérieure hiérarchique</Td>
                        <Td colSpan={1} textAlign="left" border={"none"}>L'intéressée</Td>
                    </Tr>
                </Tbody>
            </Table>
        </div>
    );
})

export default GeneratePdfPermission