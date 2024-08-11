import React, { useEffect, useState } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Checkbox,
} from "@chakra-ui/react";
import axios from 'axios';
import moment from 'moment';
interface ChildComponentProps {
    id: number,
}
export const GeneratePdf = React.forwardRef<HTMLDivElement, ChildComponentProps>(({ id}: ChildComponentProps,ref: React.ForwardedRef<HTMLDivElement>,): JSX.Element => {
    console.log(id)
    const [defaultData,setDefaultData] = useState<any>()
    
    useEffect(() => {
        console.log('useEffect is triggered'+ id);
		async function fetchData() {
		try {
			const response = await axios.get(`http://localhost:3001/api/demande/info/conge/${id}`);
			setDefaultData(response.data);
			console.log(response.data);
		} catch (error) {
			console.error("Une erreur s'est produite lors de la récupération des données :", error);
			}
		}
		fetchData();
    }, [id]);
    console.log(defaultData)
    return (
        <div style={{padding:"10px"}} ref={ref}>
            <h4 style={{ textAlign: "center" ,marginBottom:"10px"}}>DEMANDE DE CONGE</h4>
            <Table width="100%" border={"1px solid black"}>
                <Thead>
                    <Tr>
                        <Th colSpan={6} border={"1px solid black"} textAlign="center" bgColor="secondaryGray.400">Information sur le congé</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    <Tr>
                        <Td  colSpan={1} color={"gray.400"} textAlign="left" border={"1px solid black"}>Nom de l'employé</Td>
                        <Td colSpan={5} textAlign="left" border={"1px solid black"}>{defaultData && defaultData?.employee.nom} {defaultData && defaultData?.employee.prenoms ? defaultData?.employee.prenoms :""}</Td>
                    </Tr>
                    <Tr>
                        <Td colSpan={1} textAlign="left" border={"1px solid black"}>Matricule</Td>
                        <Td colSpan={5} textAlign="left" border={"1px solid black"}>{defaultData && defaultData?.employee.im}</Td>
                    </Tr>
                    <Tr>
                        <Td colSpan={1} textAlign="left" border={"1px solid black"}>Fonction</Td>
                        <Td colSpan={5} textAlign="left" border={"1px solid black"}>{defaultData && defaultData?.employee.poste.libelle}</Td>
                    </Tr>
                    <Tr>
                        <Td colSpan={1} textAlign="left" border={"1px solid black"}>Durée du congé</Td>
                        <Td colSpan={2} textAlign="left" border={"1px solid black"}>Départ: {defaultData && moment.utc(defaultData?.date_debut).format("DD-MM-YYYY")}</Td>
                        <Td colSpan={1} textAlign="left" border={"1px solid black"}>Reprise: {defaultData && moment.utc(defaultData?.date_fin).add(1, 'days').format("DD-MM-YYYY")}</Td>
                        <Td colSpan={1} textAlign="left" border={"1px solid black"}>Soit: {defaultData &&  defaultData?.nb_jour ?`${defaultData?.nb_jour +'jours'}`:""} </Td>
                    </Tr>
                    <Tr>
                        <Td colSpan={1}textAlign="left" border={"1px solid black"}>Motif</Td>
                        <Td colSpan={4} textAlign="left" border={"1px solid black"}>{defaultData && defaultData?.motif}</Td>
                    </Tr>
                    <Tr>
                        <Td colSpan={1} textAlign="left" border={"1px solid black"}>
                        <i>La demande de congé de plus de 3 jours doit être déposée au moins 5 jours avant la date de départ du demandeur</i>
                        </Td>
                        <Td colSpan={2} textAlign="left" border={"1px solid black"}><u>Signature de l'employé</u></Td>
                        <Td colSpan={2} textAlign="left" border={"1px solid black"}>date de la demande: <u>{defaultData && moment.utc(defaultData?.date_demande).format("DD-MM-YYYY")}</u></Td>
                    </Tr>
                    <Tr>
                        <Th colSpan={5} textAlign="center" bgColor="secondaryGray.400" border={"1px solid black"}>Avis et approbations</Th>
                    </Tr>
                    <Tr>
                        <Td colSpan={1} textAlign="left" border={"1px solid black"}>Le supérieur hiérarchique</Td>
                        <Td colSpan={2} textAlign="left" border={"1px solid black"}>Le responsable de service</Td>
                        <Td colSpan={2}  textAlign="left" border={"1px solid black"}>La direction</Td>
                    </Tr>
                    <Tr>
                        <Td colSpan={1} textAlign="left" border={"1px solid black"}>
                            Approuvé
                            &nbsp;
                            <Checkbox id="CaseACocherAccorde" name="CaseACocherAccorde" value="valeur" 
                            isChecked={
                                defaultData && defaultData?.approved_by_superior === true
                            }/>
                            &nbsp;
                            &nbsp;
                            Rejeté
                            &nbsp;
                            <Checkbox id="CaseACocherAccorde" name="CaseACocherAccorde"
                            isChecked={
                                defaultData && defaultData?.approved_by_superior === false
                            } value="valeur" />
                            <br /><br />
                            <u>commentaires: {defaultData && defaultData?.remarque}</u><br /><br />
                            <br /><u>Signature</u><span style={{ marginRight: "80px" }}></span><u>date du visa</u>
                        </Td>
                        <Td colSpan={2} textAlign="left" border={"1px solid black"}>
                            Approuvé
                            &nbsp;
                            <Checkbox id="CaseACocherAccorde" name="CaseACocherAccorde" value="valeur" 
                            isChecked={
                                defaultData && defaultData?.approved_by_superior === true
                            }/>
                            &nbsp;
                            &nbsp;
                            Rejeté
                            &nbsp;
                            <Checkbox id="CaseACocherAccorde" name="CaseACocherAccorde"
                            isChecked={
                                defaultData && defaultData?.approved_by_superior === false
                            } value="valeur" />
                            <br /><br />
                            <u>commentaires: {defaultData && defaultData?.remarque}</u><br /><br />
                            <br /><u>Signature</u><span style={{ marginRight: "80px" }}></span><u>date du visa</u>
                        </Td>
                        <Td colSpan={2} textAlign="left" border={"1px solid black"}>
                            Approuvé
                            &nbsp;
                            <Checkbox id="CaseACocherAccorde" name="CaseACocherAccorde" value="valeur" 
                            isChecked={
                                defaultData && defaultData?.approved_by_admin === true
                            }/>
                            &nbsp;
                            &nbsp;
                            Rejeté
                            &nbsp;
                            <Checkbox id="CaseACocherAccorde" name="CaseACocherAccorde"
                            isChecked={
                                defaultData && defaultData?.approved_by_admin === false
                            } value="valeur" />
                            <br /><br />
                            <u>commentaires: {defaultData && defaultData?.remarque}</u><br /><br />
                            <br /><u>Signature</u><span style={{ marginRight: "80px" }}></span><u>date du visa</u>
                        </Td>
                    </Tr>
                    <Tr>
                        <Th colSpan={5} textAlign="center" bgColor="secondaryGray.400" border={"1px solid black"}>Approbation du Responsable des Ressources Humaines</Th>
                    </Tr>
                    <Tr>
                        <Td colSpan={1} textAlign="left" border={"1px solid black"}>Reste congés payés</Td>
                        <Td colSpan={4} textAlign="left" border={"1px solid black"}><span style={{ marginRight: "80px" }}>{defaultData && defaultData?.nbJourRestant}</span></Td>
                    </Tr>
                    <Tr>
                        <Td colSpan={2} textAlign="left" border={"1px solid black"}>Signature du Responsable des Ressources Humaines</Td>
                        <Td colSpan={2} textAlign="left" border={"1px solid black"}>Date:</Td>
                    </Tr>
                </Tbody>
            </Table>
        </div>
    );
})
