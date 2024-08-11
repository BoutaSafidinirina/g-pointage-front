import { Avatar, Box, Button, Flex, Icon, Progress, Table, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue} from '@chakra-ui/react';
import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	SortingState,
	useReactTable
} from '@tanstack/react-table';

import { MdAdd } from 'react-icons/md';
import * as React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import   '../../../assets/css/sweetalert.css'
import { EditEmployer } from '../edit';

type RowObj = {
	id : number;     
	im :string;
	nom:string[];
	tel    : string;
	email  : string;
	adresse : string;
	photo   : string;
	poste : string;
	action: JSX.Element[];
  };
  
const columnHelper = createColumnHelper<RowObj>();

// const columns = columnsDataCheck;
export default function TopCreatorTable(props: { tableData: any, action:() => void, updateDefaultData:() => void }) {
	const { tableData } = props;
	const [ sorting, setSorting ] = React.useState<SortingState>([]);
	const textColor = useColorModeValue('black', 'black');

	const borderColor = useColorModeValue('gray.200', 'gray.200');
	const bgHover = useColorModeValue({ bg:'bleu.300'  }, { bg: 'bleu.300' });
	
	const columns = [
		columnHelper.accessor('photo', {
			id: 'photo',
			header: () => (
				<>
				</>
			),
			cell: (info: any) => (
				<Flex align='center'>
					<Avatar
						src={info.getValue()}
						w='30px'
						h='30px'
						me='8px'
					/>
				</Flex>
			)
		}), 
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
			cell: (info) => (
				<Text
				color={textColor}
				fontSize='sm'
				fontWeight='500'>
				{info.getValue()}
				</Text>
			)
		}),
		columnHelper.accessor('nom', {
			id: 'nom',
			header: () => (
				<Text
					justifyContent='space-between'
					align='center'
					fontSize={{ sm: '10px', lg: '12px' }}
					color='gray.400'>
					Nom et Prénom
				</Text>
			),
			cell: (info: any) => (
				<Flex align='center'>
					<Text
						color={textColor}
						fontSize='sm'
						fontWeight='600'>
						{info.getValue()[1]}
					</Text>
					&nbsp;
					<Text
						color={textColor}
						fontSize='sm'
						fontWeight='600'>
						{info.getValue()[0]}
					</Text>
				</Flex>
			)
		}), 
		columnHelper.accessor('poste', {
			id: 'poste',
			header: () => (
				<Text
					justifyContent='space-between'
					align='center'
					fontSize={{ sm: '10px', lg: '12px' }}
					color='gray.400'>
					POSTE
				</Text>
			),
			cell: (info) => (
				<Text
					color={textColor}
					fontSize='sm'
					fontWeight='500'>
					{info.getValue()}
				</Text>
			)
		}),
		columnHelper.accessor('email', {
			id: 'email',
			header: () => (
				<Text
					justifyContent='space-between'
					align='center'
					fontSize={{ sm: '10px', lg: '12px' }}
					color='gray.400'>
					Email
				</Text>
			),
			cell: (info) => (
				<Text
					color={textColor}
					fontSize='sm'
					fontWeight='500'>
					{info.getValue()}
				</Text>
			)
		}),
		columnHelper.accessor('adresse', {
			id: 'adresse',
			header: () => (
				<Text
					justifyContent='space-between'
					align='center'
					fontSize={{ sm: '10px', lg: '12px' }}
					color='gray.400'>
					Adresse
				</Text>
			),
			cell: (info) => (
				<Text
				color={textColor}
				fontSize='sm'
				fontWeight='500'>
				{info.getValue()}
				</Text>
			)
		}),
		columnHelper.accessor('tel', {
			id: 'tel',
			header: () => (
				<Text
					justifyContent='space-between'
					align='center'
					fontSize={{ sm: '10px', lg: '12px' }}
					color='gray.400'>
					Contact
				</Text>
			),
			cell: (info) => (
				<Text
					color={textColor}
					fontSize='sm'
					fontWeight='500'>
					{info.getValue()}
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
					<Button bg={"transparent"} _hover={{bg:'transparent'}} p={"0"} width={"25px"} height={"25px"} onClick={() => handleEdit(info.row.original.id)} >
						{info.getValue()[1]}
					</Button>
					&nbsp;
					<Button bg={"transparent"} _hover={{bg:'transparent'}} p={"0"} width={"25px"} height={"25px"} onClick={() => handleDelete(info.row.original.id)}>
						{info.getValue()[0]}
					</Button>
				</Flex>
			)
		})

	];
	const [data, setData] = useState<any>([]);
	const [idEdit,  setId] = useState<number | null>(null);
	const [isEditEmployeModalOpen, setIsEditEmployeModalOpen] = useState(false);
	
	const openEditEmployeModal = () => {
        setIsEditEmployeModalOpen(true);
    };

    const closeEditEmployeModal = () => {
		setId(null)
        setIsEditEmployeModalOpen(false);
    };
	const handleEdit = async (itemId:any) =>{
		setId(itemId)
		openEditEmployeModal()
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
				axios.delete(`http://localhost:3001/api/employee/${itemId}`).then(()=>{
					Toast.fire({
						icon: 'success',
						title: 'Success'
					})
				})
				props.updateDefaultData()
			} catch (error) {
				Toast.fire({
					icon: 'error',
					title: 'Error'
				})
			}
		}
	};
	return (
		<Flex
			direction='column'
			w='100%'>
				<Flex
					align={{ sm: "flex-start", lg: "center" }}
					justify='space-between'
					w='100%'
					px='22px'
					pb='20px'
					mb='10px'
					boxShadow='0px 40px 58px -20px rgba(112, 144, 176, 0.26)'>
					<Text color={textColor} fontSize='xl' fontWeight='600'>
						Liste des Employées
					</Text>
					<Flex px='25px' mb="8px" justifyContent='space-between' align='center'>
						<Button
							bg={"#1A62ED"}
							alignItems='center'
							w='37px'
							h='37px'
							mx={'5px'}
							_hover={bgHover}
							lineHeight='100%'
							borderRadius='10px' color={"white"}
							onClick={props.action}>
							<Icon w='24px' h='24px' as={MdAdd} color={"white"} />
						</Button>
					</Flex>
				</Flex>
				<Box w='100%' px='0px' overflowX={{ sm: 'scroll'}}>
					<Table variant='simple' color='gray.500'  mt="12px">
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
													fontSize={{ sm: '14px' }}
													minW={{ sm: '150px', md: '200px', lg: 'auto' }}
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
				</Box>
				{idEdit !== null &&(
					<EditEmployer isOpen={isEditEmployeModalOpen} onClose={closeEditEmployeModal} updateDefaultData={props.updateDefaultData} id={idEdit}/>
				)}
		</Flex>
	);
}