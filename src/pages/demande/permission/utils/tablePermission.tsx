import { Box, Button, Flex, Icon, Table, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue } from '@chakra-ui/react';
import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	SortingState,
	useReactTable
} from '@tanstack/react-table';
// Custom components
import Card from '../../../../components/card/Card';
// Assets
import { MdCancel, MdCheckCircle, MdOutlineCached, MdOutlineRemoveRedEye, MdDownload} from 'react-icons/md';
import React,{ useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../../../../assets/css/sweetalert.css'
import moment from 'moment';
import { EditPermission } from '../edit';
import { FaChevronLeft } from 'react-icons/fa';
import ReactToPrint from 'react-to-print';
import GeneratePdfPermission from '../../pdf/generatePdfPermission';
import PDFViewer from '../../pdf/viewPdf';
import { useLocalStorage } from '../../../appContexte';

type RowObj = {
	id :number;
	im:string;
	heure_debut: string;
	heure_fin: string;
	piece:string;
	status : string ;
	destinataire: string ;
	employee : string ; 
  	action: JSX.Element[];
};


const columnHelper = createColumnHelper<RowObj>();

// const columns = columnsDataCheck;
export default function TablePermission(props: { tableData: any,updateDefaultData:() => void }) {
	const { tableData } = props;
	const [ sorting, setSorting ] = React.useState<SortingState>([]);
	const textColor = useColorModeValue('black', 'black');
	const borderColor = useColorModeValue('gray.200', 'gray.200');
	
	const columns = [
		columnHelper.accessor('im', {
			id: 'im',
			header: () => (
				<Text
					justifyContent='space-between'
					align='center'
					fontSize={{ sm: '10px', lg: '12px' }}
					color='gray.400'>
					IM
				</Text>
			),
			cell: (info: any) => (
				<Flex align='center'>
					<Text color={textColor} fontSize='sm' fontWeight='500'>
						{info.getValue()}
					</Text>
				</Flex>
			)
		}),
		columnHelper.accessor('employee', {
			id: 'employee',
			header: () => (
				<Text
					justifyContent='space-between'
					align='center'
					fontSize={{ sm: '10px', lg: '12px' }}
					color='gray.400'>
					Nom et Prenom
				</Text>
			),
			cell: (info) => (
				<Text color={textColor} fontSize='sm' fontWeight='500'>
					{info.getValue()}
				</Text>
			)
		}),
		columnHelper.accessor('destinataire', {
			id: 'destinataire',
			header: () => (
				<Text
					justifyContent='space-between'
					align='center'
					fontSize={{ sm: '10px', lg: '12px' }}
					color='gray.400'>
					DESTINATAIRE
				</Text>
			),
			cell: (info) => (
				<Text color={textColor} fontSize='sm' fontWeight='500'>
					{info.getValue()}
				</Text>
			)
		}),
		columnHelper.accessor('status', {
			id: 'status',
			header: () => (
				<Text
					justifyContent='space-between'
					align='center'
					fontSize={{ sm: '10px', lg: '12px' }}
					color='gray.400'>
					STATUS
				</Text>
			),
			cell: (info) => (
			<Flex align='center'>
				<Icon
					w='24px'
					h='24px'
					me='5px'
					color={
						info.getValue() === 'accepté' ? 'green.500' :
						info.getValue() === 'refusé' ? 'red.500' :
						info.getValue() === 'en attente' ? 'orange.500' :
						'gray.500' // Valeur par défaut en cas de non correspondance
					}
					as={
						info.getValue() === 'accepté' ? MdCheckCircle :
						info.getValue() === 'refusé' ? MdCancel :
						info.getValue() === 'en attente' ?  MdOutlineCached:
						MdCheckCircle // Icône par défaut en cas de non correspondance
					}
				/>
				<Text color={textColor} fontSize='sm' fontWeight='500'>
					{info.getValue()}
				</Text>
			</Flex> 
			)
		}),
		columnHelper.accessor('heure_debut', {
			id: 'heure_debut',
			header: () => (
				<Text
					justifyContent='space-between'
					align='center'
					fontSize={{ sm: '10px', lg: '12px' }}
					color='gray.400'>
					HEURRE DEBUT
				</Text>
			),
			cell: (info) => {
				const dateValue = info.getValue(); 
				const formattedDate = moment.utc(dateValue).format("DD-MM-YYYY HH:mm"); 

				return (
					<Text color={textColor} fontSize='sm' fontWeight='500'>
						{formattedDate}
					</Text>
				);
			}
		}),
		columnHelper.accessor('heure_fin', {
			id: 'heure_fin',
			header: () => (
				<Text
					justifyContent='space-between'
					align='center'
					fontSize={{ sm: '10px', lg: '12px' }}
					color='gray.400'>
					HEURE FIN
				</Text>
			),
			cell: (info) =>{
				const dateValue = info.getValue(); 
				const formattedDate = moment.utc(dateValue).format("DD-MM-YYYY HH:mm"); 

				return (
					<Text color={textColor} fontSize='sm' fontWeight='500'>
						{formattedDate}
					</Text>
				);
			}
		}),
		columnHelper.accessor('piece', {
			id: 'piece',
			header: () => (
				<Text
					justifyContent='space-between'
					align='center'
					fontSize={{ sm: '10px', lg: '12px' }}
					color='gray.400'>
					Pièce justificative
				</Text>
			),
			cell: (info) => (
				<Text fontSize='sm' fontWeight='500'>
					<Button bg={"none"} fontSize={'sm'} color={"blue.400"} onClick={() => handlePiece(info.row.original.id,info.getValue())}>
						{info.getValue() !== null ? info.getValue():"Pas de Piece"}
					</Button>
				</Text>
			)
		}),
		columnHelper.accessor('action', {
			id: 'action',
			header: () => (
				<Text
					justifyContent='space-between'
					align='center'
					fontSize={{ sm: '10px', lg: '12px' }}
					color='gray.400'>
					Action
				</Text>
			),
			cell: (info) => (
				<Flex align='center'>
					{info.row.original.status === "accepté" || info.row.original.status === "refusé" ? (
						<Button bg={"transparent"} _hover={{bg:'transparent'}} p={"0"} width={"25px"} height={"25px"} onClick={() => handleLire(info.row.original.id)}>
							<Icon as={MdOutlineRemoveRedEye} w='24px' h='24px' me='5px' color='gray.500' />
						</Button>
					):(
						role  === "utilisateur" ? (
							<Button bg={"transparent"} _hover={{bg:'transparent'}} p={"0"} width={"25px"} height={"25px"} onClick={() => handleEdit(info.row.original.id)} >
								{info.getValue()[1]}
							</Button>
						):(
							<Button bg={"transparent"} _hover={{bg:'transparent'}} p={"0"} width={"25px"} height={"25px"} onClick={() => {
								Swal.fire("Vous pouvez pas encore visualiser les info en pdf sur ce cas");
							}}>
								<Icon as={MdOutlineRemoveRedEye} w='24px' h='24px' me='5px' color='gray.500' />
							</Button>
						)
					)}
					&nbsp;
					<Button bg={"transparent"} _hover={{bg:'transparent'}} p={"0"} width={"25px"} height={"25px"} onClick={() => handleDelete(info.row.original.id)}>
						{info.getValue()[0]}
					</Button>
				</Flex>
			)
		})
	];

	const [itemId, setItemId] = useState<number | null>(null);
	const refTitle = React.createRef<HTMLDivElement>();
	const [itemIdPdf, setItemIdPdf] = useState<number | null>(null);
	const [urlPdf, setUrlPdf] = useState<any>(null);
	const handlePiece = ( id:number , url:any) => {
		if(url === null){
			Swal.fire("Désolée! cette personne n'as pas de de pièce justificative!");
		}else{
			setItemIdPdf(id)
			setUrlPdf(url)
		}
	}
	const handleLire = ( id:number ) => {
		setItemId(id)
	}
	const [data, setData] =useState<any>([]);
	const [idEdit,  setId] = useState<number | null>(null);
	const [isEditPermissionModalOpen, setIsEditPermissionModalOpen] = useState(false);
	
	const openEditPermissionModal = () => {
        setIsEditPermissionModalOpen(true);
    };

    const closeEditPermissionModal = () => {
		setId(null)
        setIsEditPermissionModalOpen(false);
    };
	const handleEdit = async (itemId:any) =>{
		setId(itemId)
		openEditPermissionModal()
	}
	useEffect(() => {
		setData(tableData);
	}, [tableData]);
	const table = useReactTable({
		data,
		columns,
		state: {
			sorting
		},
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		debugTable: true
	});
	const textColorSecondary = useColorModeValue('navy.800', 'navy.800');
	const boxBg = useColorModeValue('secondaryGray.800', 'secondaryGray.800');
	const bgHover = useColorModeValue({ bg:'bleu.300'  }, { bg: 'bleu.300' });
	const handleDelete = async (itemId:any) => {
		const result = await Swal.fire({
			title: 'Êtes-vous sûr de vouloir supprimer cete élément?',
			icon: 'question',
			showCancelButton: true,
			confirmButtonText: 'Oui,supprimer!',
			cancelButtonText: 'Annuler',
			confirmButtonColor: "#3085d6",
			customClass: {
				popup: 'custom-popup-class', // Classe CSS pour personnaliser la taille de la fenêtre
				confirmButton: 'custom-confirm-button-class', // Classe CSS pour personnaliser le bouton "Confirmer"
				title: 'custom-title-class', // Classe CSS pour personnaliser le titre
				icon: 'custom-icon-class', // Classe CSS pour personnaliser l'icône
			},
			backdrop: `
			  rgba(0,0,123,0.4)
			`
		});
		if (result.isConfirmed) {
			const Toast = Swal.mixin({
				toast: true,
				position: "top-end",
				showConfirmButton: false,
				timer: 3000,
				timerProgressBar: true,
				didOpen: (toast) => {
				  toast.onmouseenter = Swal.stopTimer;
				  toast.onmouseleave = Swal.resumeTimer;
				}
			});
			try {
				axios.delete(`http://localhost:3001/api/permission/${itemId}`).then(()=>{
					Toast.fire({
						icon: 'success',
						title: 'Success'
					})
					props.updateDefaultData()
				});
			} catch (error) {
				Toast.fire({
					icon: 'error',
					title: 'Error'
				})
			}
		}
	};
	const { authData } = useLocalStorage();
    const role = authData?.auth.role;
	return (
		<Box w='100%' px='0px' overflowX={{ sm: 'scroll'}}>
			{itemId ? (
				<>
					<Card flexDirection='column' w='100%' px='0px' >
					<Flex w={"100%"} alignItems={"center"} justifyContent={"space-between"}>
						<Button bg={boxBg} onClick={()=>{setItemId(null)}} mb={"20px"} mx={'10px'} fontSize='sm' fontWeight='500' color={textColorSecondary} borderRadius='7px'>
							<Icon as={FaChevronLeft} color={textColorSecondary} me='4px' />
							Retour
						</Button>
						<ReactToPrint
							trigger={() => <Button bg={"navy.400"} color="white" mb={"20px"} mx={'10px'} borderRadius='7px' fontSize='sm' fontWeight='500'>
								<Icon as={MdDownload} color={textColorSecondary} me='4px' />
								Imprimer en PDF
							</Button>}
							content={() =>  refTitle.current }
						/>
					</Flex>
					<GeneratePdfPermission ref={refTitle} id={itemId}/>
					</Card>
				</>
			): itemIdPdf ? (
				<>
					<Card flexDirection='column' w='100%' px='0px' >
						<Button bg={boxBg} onClick={()=>{
							setUrlPdf(null)
							setItemIdPdf(null)}} mb={"20px"} mx={'10px'} fontSize='sm' fontWeight='500' color={textColorSecondary} borderRadius='7px'>
							<Icon as={FaChevronLeft} color={textColorSecondary} me='4px' />
							Retour
						</Button>
						<PDFViewer url={urlPdf}/>
					</Card> 
				</>
			):(
				<>
					<Table variant='simple' color='gray.500' mb='24px' mt="12px">
						<Thead>
							{table.getHeaderGroups().map((headerGroup) => (
								<Tr key={headerGroup.id}>
									{headerGroup.headers.map((header) => {
										return (
											<Th
												key={header.id}
												colSpan={header.colSpan}
												pe='10px'
												borderColor={borderColor}
												cursor='pointer'
												onClick={header.column.getToggleSortingHandler()}>
												<Flex
													justifyContent='space-between'
													align='center'
													fontSize={{ sm: '10px', lg: '12px' }}
													color='gray.400'>
													{flexRender(header.column.columnDef.header, header.getContext())}{{
														asc: '',
														desc: '',
													}[header.column.getIsSorted() as string] ?? null}
												</Flex>
											</Th>
										);
									})}
								</Tr>
							))}
						</Thead>
						<Tbody>
							{table.getRowModel().rows.slice(0, 11).map((row) => {
								return (
									<Tr key={row.id}>
										{row.getVisibleCells().map((cell) => {
											return (
												<Td
													key={cell.id}
													width={'auto'}
													fontSize={{ sm: '14px' }}
													borderColor='transparent'>
													{flexRender(cell.column.columnDef.cell, cell.getContext())}
												</Td>
											);
										})}
									</Tr>
								);
							})}
						</Tbody>
					</Table>
				</>
			)}
			{idEdit !== null &&(
				<EditPermission isOpen={isEditPermissionModalOpen} onClose={closeEditPermissionModal} updateDefaultData={props.updateDefaultData} id={idEdit}/>
			)}
		</Box>
	);
}
 