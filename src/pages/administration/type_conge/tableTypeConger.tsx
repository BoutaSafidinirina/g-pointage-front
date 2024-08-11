import { Box, Button, Flex, Icon, Progress, Table, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue } from '@chakra-ui/react';
import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	SortingState,
	useReactTable
} from '@tanstack/react-table';
// Custom components
import Card from '../../../components/card/Card';
import Menu from '../utils/menu';
import React , {useEffect, useState} from 'react';

import { MdAdd } from 'react-icons/md';
import { AddTypeConger } from './addTypeConger';
import axios from 'axios';
import Swal from 'sweetalert2';
import   '../../../assets/css/sweetalert.css'
import { EditTypeConger } from './edit';
type RowObj = {
	id: number;
	designation: string;
	action: JSX.Element[];
};

const columnHelper = createColumnHelper<RowObj>();

// const columns = columnsDataCheck;
export default function ListeTypeConger(props: { tableData: any,updateDefaultData:() => void}) {
	const [isAddTypeCongerOpen, setIsAddTypeCongerOpen] = useState(false);
	const [isEditTypeCongerOpen, setIsEditTypeCongerOpen] = useState(false);
	
	const openAddTypeCongerModal = () => {
        setIsAddTypeCongerOpen(true);
    };

    const closeTypeCongerModal = () => {
        setIsAddTypeCongerOpen(false);
    };

	const openEditTypeCongerModal = () => {
        setIsEditTypeCongerOpen(true);
    };

    const closeEditTypeCongerModal = () => {
        setIsEditTypeCongerOpen(false);
    };

	const { tableData } = props;
	const [ sorting, setSorting ] = React.useState<SortingState>([]);
	const textColor = useColorModeValue('black', 'black');
	const borderColor = useColorModeValue('whiteAlpha.100', 'whiteAlpha.100');
	
	const columns = [
		columnHelper.accessor('id', {
			id: 'id',
			header: () => (
				<Text
					justifyContent='space-between'
					align='center'
					fontSize={{ sm: '10px', lg: '12px' }}
					color='gray.400'>
					#
				</Text>
			),
			cell: (info: any) => (
				<Flex align='center'>
					<Text color={textColor} fontSize='sm' fontWeight='700'>
						{info.getValue()}
					</Text>
				</Flex>
			)
		}),
		columnHelper.accessor('designation', {
			id: 'designation',
			header: () => (
				<Text
					justifyContent='space-between'
					align='center'
					fontSize={{ sm: '10px', lg: '12px' }}
					color='gray.400'>
					Designation
				</Text>
			),
			cell: (info: any) => (
				<Flex align='center'>
					<Text color={textColor} fontSize='sm' fontWeight='700'>
						{info.getValue()}
					</Text>
				</Flex>
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
					<Button bg={"transparent"} _hover={{bg:'transparent'}} onClick={() => handleDelete(info.row.original.id)}>
						{info.getValue()[0]}
					</Button>
			</Flex>
			)
		})
	];
	const [data, setData] = useState<any>([]);
	const [id,  setId] = useState<number | null>(null);
	const handleEdit = async (itemId:any) =>{
		setId(itemId)
		openEditTypeCongerModal()
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
				axios.delete(`http://localhost:3001/api/type/${itemId}`).then(()=>{
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
	return (
		<Card flexDirection='column' w='100%' px='0px'>
			<Flex px='25px' mb="8px" justifyContent='space-between' align='center'>
				<Text color={"navy.800"}>Liste des Type de congé</Text>
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
						onClick={openAddTypeCongerModal}>
						<Icon w='24px' h='24px' as={MdAdd} color={"white"} />
					</Button>
				</Flex>
			</Flex>
			<Box w='100%' px='0px' overflowX={{ sm: 'scroll'}}>
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
			<AddTypeConger isOpen={isAddTypeCongerOpen} onClose={closeTypeCongerModal} updateDefaultData={props.updateDefaultData} />
			{id !== null && (
				<EditTypeConger isOpen={isEditTypeCongerOpen} onClose={closeEditTypeCongerModal} updateDefaultData={props.updateDefaultData} id={id}/>
			)}
		</Card>
	);
}
 