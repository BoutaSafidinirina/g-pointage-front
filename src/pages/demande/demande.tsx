// Chakra imports
import { Avatar, Box, Button, Flex, Icon, Text, useColorModeValue } from '@chakra-ui/react';
import Card from '../../components/card/Card';
// Custom components
import SwitchField from '../../components/fields/SwitchField';
import { useLocalStorage } from '../appContexte';
import generateTableData from './variableDemandereçu';
import { useEffect, useState } from 'react';
import moment from 'moment';
import React from 'react';
import PDFViewer from './pdf/viewPdf';
import Swal from 'sweetalert2';
import { FaChevronLeft } from 'react-icons/fa';
import ReactToPrint from 'react-to-print';
import { MdDownload } from 'react-icons/md';
import { GeneratePdf } from './pdf/generatePdf';
import GeneratePdfPermission from './pdf/generatePdfPermission';

export default function NotificationDemande() {
	const { authData } = useLocalStorage();

	const id = authData?.auth.employee_id;
    const role = authData?.auth.role;
	const [lire,setLire] = useState(false)
	const [pdf, setPdf] = useState(false)
	const refTitle = React.createRef<HTMLDivElement>();
	const ref = React.createRef<HTMLDivElement>();
	const [url,setUrl] =useState<any>(null)
	const [type, setType] = useState<any>(null)
	const [itemId, setItemId] = useState<number>(0)
	
	const [defaultData, setdefaultData] = useState([]);
	
	async function fetchData() {
		if(id && role){
			const data:any = await generateTableData(id,role);
			setdefaultData(data);
		}
	}
	const textColorSecondary = useColorModeValue('navy.800', 'navy.800');
	const boxBg = useColorModeValue('secondaryGray.300', 'secondaryGray.300');

	const lirePiece = (url:any) =>{
		if(url === null){
			Swal.fire("Désolée! cette personne n'as pas de de pièce justificative!");
		}else{
			setLire(true)
		}
	}
	useEffect(() => {
		fetchData();
	}, [id,role]);		
	return (
		<Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
			{lire? (
				<><Card flexDirection='column' w='100%' p='24px' gridArea={{
					base: '3 / 1 / 4 / 2',
					lg: '2 / 1 / 3 / 3',
					'2xl': '1 / 3 / 2 / 4'
				}}>
					<Button bg={boxBg} onClick={()=>{setLire(false)}} mb={"20px"} mx={'10px'} fontSize='sm' fontWeight='500' color={textColorSecondary} borderRadius='7px'>
						<Icon as={FaChevronLeft} color={textColorSecondary} me='4px' />
						Retour
					</Button>
					<PDFViewer url={url}/> 
				</Card> 
				</>
			): pdf ?(
				<><Card flexDirection='column' w='100%' p='24px' gridArea={{
						base: '3 / 1 / 4 / 2',
						lg: '2 / 1 / 3 / 3',
						'2xl': '1 / 3 / 2 / 4'
					}}>
					<Flex w={"100%"} alignItems={"center"} justifyContent={"space-between"}>
						<Button bg={boxBg} onClick={()=>{setPdf(false)}} mb={"20px"} mx={'10px'} fontSize='sm' fontWeight='500' color={textColorSecondary} borderRadius='7px'>
							<Icon as={FaChevronLeft} color={textColorSecondary} me='4px' />
							Retour
						</Button>
						<ReactToPrint
							trigger={() => <Button bg={"navy.400"} color="white" mb={"20px"} mx={'10px'} borderRadius='7px' fontSize='sm' fontWeight='500'>
								<Icon as={MdDownload} color={textColorSecondary} me='4px' />
								Imprimer en PDF
							</Button>}
							content={() => (type !== null) ? refTitle.current : ref.current }
						/>
					</Flex>
					{type  !== null ? (
						<GeneratePdf ref={refTitle} id={itemId}/>
					):(
						<GeneratePdfPermission ref={ref} id={itemId}/>
					)}
				</Card> 
				</>
			):(
				defaultData && Array.isArray(defaultData) && defaultData.length > 0 ? (
					defaultData?.map((item: any) => (
						<><Card flexDirection='column' w='100%' mb={"20px"} p='24px' gridArea={{
								base: '3 / 1 / 4 / 2',
								lg: '2 / 1 / 3 / 3',
								'2xl': '1 / 3 / 2 / 4'
							}}>
							<SwitchField   data={defaultData} updateDefaultData ={fetchData} type_conge={item.type_conge != null ? item.type_conge.designation:null} reversed={true} action={item.action} photo={item.photo} fontSize='sm' mb='20px' id={item.id} 
								label={item.type_conge != null ? 
									`${item.employee} 
										vous envoie une demande de congé qui se debutera le ${moment.utc(item.debut).format("DD-MM-YYYY")} au ${moment.utc(item.fin).format("DD-MM-YYYY")} 
								`:`${item.employee} 
										vous demande une permission à ${moment.utc(item.debut).format("DD-MM-YYYY HH:mm")} jusqu'à
									le ${moment.utc(item.fin).format("DD-MM-YYYY HH:mm")}
								`} />
							<Flex w={"400px"} left={"50px"} justifyContent='space-between' align='center'>
									<Text
										color={"navy.600"}
										fontSize={"sm"}
										as='span'
										fontWeight='500'><Button bg={"none"} color={"navy.600"} onClick={()=> {
												setUrl(item.piece)
												lirePiece (item.piece)
											}}>
											{(item.piece === null) ? "Pas de Pièce justificative":"Lire pièce justificative"}</Button>
									</Text>
									<Text
										color={"navy.600"}
										as='span'
										fontSize={"sm"}
										fontWeight='500'>
											<Button bg={"none"} color={"navy.600"} onClick={()=> {
												setItemId(item.id)
												setType(item.type_conge != null ? item.type_conge.designation:null)
												setPdf(true)
											}}>
												Générer le PDF personnalisé
											</Button>
									</Text>
							</Flex>
						</Card> 
						</>
					))
				) : (
					<Card flexDirection='column' w='100%' p='24px' gridArea={{
						base: '3 / 1 / 4 / 2',
						lg: '2 / 1 / 3 / 3',
						'2xl': '1 / 3 / 2 / 4'
					}}>
					<SwitchField  data='' url='' updateDefaultData={fetchData}type_conge={null} reversed={false} action={null} photo={null} fontSize='sm' mb='20px' id={0} label="Vous avez aucune demande reçus pour le moment "/>
					</Card> 
				)
			)}
		</Box>
	);
}
