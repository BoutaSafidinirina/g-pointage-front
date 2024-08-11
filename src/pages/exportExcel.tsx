import React, { FunctionComponent } from 'react'
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { Flex, Icon, MenuItem,Text } from '@chakra-ui/react';
import { MdImportExport } from 'react-icons/md';
interface Props{
    apiData: any,
    filename:string
}
export const ExportToExcel:FunctionComponent<Props> = (props) => {
  const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";
    
    const exportToCSV = () => {
        const ws = XLSX.utils.json_to_sheet(props.apiData);
        const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, props.filename + fileExtension);
    };

    return (
        <MenuItem
            _hover={{ bg: 'blue.200' }}
            _focus={{ bg: 'blue.200' }} 
            color={"navy.800"}
            onClick={() => exportToCSV()}
            borderRadius='8px' px='14px' bg={"none"}>
            <Flex align='center'>
                <Icon as={MdImportExport} h='16px' w='16px' me='8px' />
                <Text fontSize='sm' fontWeight='400'>
                    EXCEL
                </Text>
            </Flex>
        </MenuItem>
    );
};