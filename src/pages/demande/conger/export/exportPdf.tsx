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
import Card from '../../../../components/card/Card';

import { MdCancel, MdCheckCircle, MdOutlineCached} from 'react-icons/md';
import  React,{ useEffect, useState } from 'react';
import '../../../../assets/css/sweetalert.css'
import moment from 'moment';

type RowObj = {
	id :number;
	im:string;
	date_debut: string;
	date_fin: string;
	nb_jour_restant:number;
	status : string ;
	destinataire: string ;
	piece: string ;
	type_conge: string;
	employee : string ; 
	motif: string ; 
  	action: JSX.Element[];
};

const columnHelper = createColumnHelper<RowObj>();

interface ChildComponentProps {
    tableData: any, 
}

export const ExportConger = React.forwardRef<HTMLDivElement, ChildComponentProps>(({ tableData}: ChildComponentProps,ref: React.ForwardedRef<HTMLDivElement>,): JSX.Element => {
	const [ sorting, setSorting ] = useState<SortingState>([]);
	const textColor = useColorModeValue('black', 'black');
	const borderColor = useColorModeValue('gray.200', 'gray.200');
	const columns:any = [
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
					Nom et prenoms
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
					STATUT
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
		columnHelper.accessor('date_debut', {
			id: 'date_debut',
			header: () => (
				<Text
					justifyContent='space-between'
					align='center'
					fontSize={{ sm: '10px', lg: '12px' }}
					color='gray.400'>
					DATE DEBUT
				</Text>
			),
			cell: (info) => {
				const dateValue = info.getValue(); 
				const formattedDate = moment.utc(dateValue).format("DD-MM-YYYY"); 

				return (
					<Text color={textColor} fontSize='sm' fontWeight='500'>
						{formattedDate}
					</Text>
				);
			}
		}),
		columnHelper.accessor('date_fin', {
			id: 'date_fin',
			header: () => (
				<Text
					justifyContent='space-between'
					align='center'
					fontSize={{ sm: '10px', lg: '12px' }}
					color='gray.400'>
					DATE FIN
				</Text>
			),
			cell: (info) => {
				const dateValue = info.getValue(); 
				const formattedDate = moment.utc(dateValue).format("DD-MM-YYYY"); 
				return (
					<Text color={textColor} fontSize='sm' fontWeight='500'>
						{formattedDate}
					</Text>
				);
			}
		}),
		columnHelper.accessor('motif', {
			id: 'motif',
			header: () => (
				<Text
					justifyContent='space-between'
					align='center'
					fontSize={{ sm: '10px', lg: '12px' }}
					color='gray.400'>
					MOTIF
				</Text>
			),
			cell: (info) => (
				<Text color={textColor} fontSize='sm' fontWeight='500'>
					{info.getValue()}
				</Text>
			)
		}),
		columnHelper.accessor('type_conge', {
			id: 'type_conge',
			header: () => (
				<Text
					justifyContent='space-between'
					align='center'
					fontSize={{ sm: '10px', lg: '12px' }}
					color='gray.400'>
					TYPE CONGE
				</Text>
			),
			cell: (info) => (
				<Text color={textColor} fontSize='sm' fontWeight='500'>
					{info.getValue()}
				</Text>
			)
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
					<Button bg={"none"} fontSize={'sm'} color={"blue.400"}>
						{info.getValue() !== null ? info.getValue():"Pas de Piece"}
					</Button>
				</Text>
			)
		})
	];
	const [data, setData] =useState<any>([]);
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
	
    useEffect(() => {
		setData(tableData);
	}, [tableData]);	
	return (
		<div ref={ref} className='print-source' >
            <Text style={{ textAlign: "center" , marginBottom:"10px"}}  fontSize="20px" color={"navy.700"}>Liste des conger</Text>
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
                                                borderColor={borderColor}
                                                width={'auto'}
                                                minW={'150px'}
                                                >
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