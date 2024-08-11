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
import React, { useEffect, useState } from 'react';

import  moment from "moment";
import { MdOutlineCached } from 'react-icons/md';

type RowObj = {
	id :number;
	im : string;
	date_heure_entree: string;
	date_heure_sortie: string;
	status : string ;
	remarque: string ;
	employee_id: number;
	employee : string ; 
  	action: JSX.Element[];
};

const columnHelper = createColumnHelper<RowObj>();

interface ChildComponentProps {
    tableData: any, 
}

export const ExportPointage = React.forwardRef<HTMLDivElement, ChildComponentProps>(({ tableData}: ChildComponentProps,ref: React.ForwardedRef<HTMLDivElement>,): JSX.Element => {
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
					<Text color={textColor} fontSize='sm' fontWeight='700'>
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
					Nom et prénom
				</Text>
			),
			cell: (info: any) => (
				<Flex align='center'>
					<Text color={textColor} fontSize='sm' fontWeight='700'>
						{info.getValue() != null ? info.getValue():"" }
					</Text>
				</Flex>
			)
		}),
		columnHelper.accessor('date_heure_entree', {
			id: 'date_heure_entree',
			header: () => (
				<Text
					justifyContent='space-between'
					align='center'
					fontSize={{ sm: '10px', lg: '12px' }}
					color='gray.400'>
					DATE ENTREE
				</Text>
			),
			cell: (info) => {
				const dateValue = info.getValue(); 
				const formattedDate = moment.utc(dateValue).format("DD-MM-YYYY HH:mm"); 

				return (
					<Text color={textColor} fontSize='sm' fontWeight='400'>
						{formattedDate}
					</Text>
				);
			}
		}),
		columnHelper.accessor('date_heure_sortie', {
			id: 'date_heure_sortie',
			header: () => (
				<Text
					justifyContent='space-between'
					align='center'
					fontSize={{ sm: '10px', lg: '12px' }}
					color='gray.400'>
					DATE SORTIE
				</Text>
			),
			cell: (info) => {
				const dateValue = info.getValue(); 
				const formatDate = moment.utc(dateValue).format("DD-MM-YYYY HH:mm");

				return (
					info.getValue() == null ? (
						<Flex align='center'>
							<Icon w='24px'
							h='24px'
							me='5px'
							color="orange.500" as={MdOutlineCached} /> 
							<Text
								color="orange.500"
								fontSize='sm' fontWeight='500'
							>
								En attente de sortir
							</Text>
						</Flex>
					) : (
						<Text color={textColor} fontSize="sm" fontWeight="400">
							{formatDate}
						</Text>
					)
				);
			} 
		}),
		columnHelper.accessor('remarque', {
			id: 'remarque',
			header: () => (
				<Text
					justifyContent='space-between'
					align='center'
					fontSize={{ sm: '10px', lg: '12px' }}
					color='gray.400'>
					REMARQUE
				</Text>
			),
			cell: (info) => (
				<Text color={textColor} fontSize='sm' fontWeight='400'>
					{info.getValue() != null ? info.getValue():"" }
				</Text>
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
	return (
		<div ref={ref} className='print-source' >
			<Text style={{ textAlign: "center" , marginBottom:"10px"}}  fontSize="20px" color={"navy.700"}>Liste des POintage</Text>
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
												width={'auto'}
												borderColor={borderColor}>
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
		</div>
	);
})
 