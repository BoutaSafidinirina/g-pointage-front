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
import Card from '../../../components/card/Card';
import React , {useEffect, useState} from 'react';

import { MdLogin } from 'react-icons/md';

import axios from 'axios';
import Swal from 'sweetalert2';
import   '../../../assets/css/sweetalert.css'
import { useLocalStorage } from '../../appContexte';

type RowObj = {
	id : number;     
	im :string;
	nom:string[];
	action: JSX.Element[];
};

const columnHelper = createColumnHelper<RowObj>();

// const columns = columnsDataCheck;
export default function TableEntre(props: { tableData: any,updateDefaultData:() => void}) {
	
	const { tableData } = props;
	const [ sorting, setSorting ] = React.useState<SortingState>([]);
	const textColor = useColorModeValue('black', 'black');
	const borderColor = useColorModeValue('gray.200', 'gray.200');
	const textColorSecondary = useColorModeValue('white', 'white');
	const bgHover1 = useColorModeValue({ bg: 'red.300' }, { bg: 'red.300' });
	
	const { authData } = useLocalStorage();
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
					<Text color={textColor} fontSize='sm' fontWeight='700'>
						{info.getValue()}
					</Text>
				</Flex>
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
		columnHelper.accessor('action', {
			id: 'action',
			header: () => (
				<Text
					justifyContent='space-between'
					align='center'
					fontSize={{ sm: '10px', lg: '12px' }}
					color='gray.400'>
					ENTREE
				</Text>
			),
			cell: (info) => (
				<Flex align='center'>
					<Button bg={"green.500"} onClick={()=> handleClickEntre(info.row.original.id)} _hover={bgHover1} fontSize='xs' fontWeight='800'  color={textColorSecondary} borderRadius='7px'>
						<Icon as={MdLogin} color={textColorSecondary} fontWeight='800' me='4px' />
						Entrée
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
	const handleClickEntre = (id:number) =>{
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
		if(authData) {
			axios.post('http://localhost:3001/api/pointage', {
				employee_id :id,
				date_heure_entree:new Date()
			}).then((res)=>{
				console.log(res.data)
				if(res.data.error){
					console.log(res.data.error)
					Toast.fire({
						icon: 'error',
						title: 'Vous avez déja un pointage en cours'
					})
				}else{
					Toast.fire({
						icon: 'success',
						title: 'Votre arrivé est bien noté'
					})
					props.updateDefaultData()
				}
				
			})
		}else{
			Toast.fire({
				icon: 'error',
				title: 'Erreur'
			})
		}
	}
	return (
		<Card flexDirection='column' w='100%' px='0px'>
			<Flex px='25px' mb="8px" justifyContent='space-between' align='center'>
				<Text color={"navy.800"}>ENTREE</Text>
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
		</Card>
	);
}
 