import { Box, Button, Flex, Table, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue} from '@chakra-ui/react';
import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	SortingState,
	useReactTable
} from '@tanstack/react-table';

import Menu from './menu';
import  React,{ useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../../../assets/css/sweetalert.css'

type RowObj = {
	id: number;
	email: string;
	pseudo:string;
	role: string;
	employee:string;
	action: JSX.Element[];
};
  
const columnHelper = createColumnHelper<RowObj>();

// const columns = columnsDataCheck;
export default function TopCreatorTable(props: { tableData: any, action:() => void ,updateDefaultData:() => void}) {
	const { tableData } = props;
	const [ sorting, setSorting ] = React.useState<SortingState>([]);
	const textColor = useColorModeValue('navy.800', 'navy.800');
  	const textColorSecondary = useColorModeValue("black", "black");
	const borderColor = useColorModeValue('gray.200', 'gray.200');
	
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
			cell: (info) => (
				<Text
					color={textColorSecondary}
					fontSize='sm'
					fontWeight='500'>
					{info.getValue()}
				</Text>
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
					Nom et Prenoms
				</Text>
			),
			cell: (info) => (
				<Text
					color={textColorSecondary}
					fontSize='sm'
					fontWeight='500'>
					{info.getValue()}
				</Text>
			)
		}),
		columnHelper.accessor('pseudo', {
			id: 'pseudo',
			header: () => (
				<Text
					justifyContent='space-between'
					align='center'
					fontSize={{ sm: '10px', lg: '12px' }}
					color='gray.400'>
					Pseudo
				</Text>
			),
			cell: (info) => (
				<Text
					color={textColorSecondary}
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
					color={textColorSecondary}
					fontSize='sm'
					fontWeight='500'>
					{info.getValue()}
				</Text>
			)
		}),
		columnHelper.accessor('role', {
			id: 'role',
			header: () => (
				<Text
					justifyContent='space-between'
					align='center'
					fontSize={{ sm: '10px', lg: '12px' }}
					color='gray.400'>
					Role
				</Text>
			),
			cell: (info) => (
				<Text
					color={textColorSecondary}
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
					{info.row.original.role == "utilisateur" ? (
						<Button bg={"transparent"} _hover={{bg:'transparent'}} p={"0"} width={"25px"} height={"25px"} onClick={() => handleValidate(info.row.original.id,"admin")} >
							{info.getValue()[1]}
						</Button>
						):(
							<Button bg={"transparent"} _hover={{bg:'transparent'}} p={"0"} width={"25px"} height={"25px"} onClick={() => handleValidate(info.row.original.id,"utilisateur")} >
								{info.getValue()[2]}
							</Button>
						)
					}
					<Button bg={"transparent"} _hover={{bg:'transparent'}} p={"0"} width={"25px"} height={"25px"} onClick={() => handleDelete(info.row.original.id)}>
						{info.getValue()[0]}
					</Button>
				</Flex>
			)
		})
	];
	const [data, setData] = useState<any>([]);
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
				axios.delete(`http://localhost:3001/api/user/${itemId}`).then(()=>{
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
	const handleValidate = async (itemId:number,role:string) => {
		const result = await Swal.fire({
			title: 'Êtes-vous sûr de valider cette employée en tanq que Admin?',
			icon: 'question',
			showCancelButton: true,
			confirmButtonText: 'Oui,Valider!',
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
				axios.put(`http://localhost:3001/api/user/role/${itemId}`,{
					role: role
				}).then(()=>{
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
		<Flex
			direction='column'
			w='100%'
			overflowX={{ sm: "scroll", lg: "hidden" }}>
			<Flex
				align={{ sm: "flex-start", lg: "center" }}
				justify='space-between'
				w='100%'
				px='22px'
				pb='20px'
				mb='10px'
				boxShadow='0px 40px 58px -20px rgba(112, 144, 176, 0.26)'>
				<Text color={textColor} fontSize='xl' fontWeight='600'>
					Liste Utilisateur
				</Text>
				<Menu />
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
		</Flex>
	);
}