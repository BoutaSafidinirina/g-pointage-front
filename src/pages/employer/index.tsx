
import React, { FunctionComponent, useEffect, useState } from 'react';

// Chakra imports
import { Box, Flex} from '@chakra-ui/react';

// Custom components
import TableData from './utils/variables';
import Card from '../../components/card/Card';

import Table from './utils/table'; 
import { AddEmployer } from './add';
import generateTableData from './utils/variables';

export default function Employer(){
    const [isAddEmployerModalOpen, setIsAddEmployerModalOpen] = useState(false);
    const [defaultData, setdefaultData] = useState([]);
	async function fetchData() {
        const data:any = await generateTableData();
        setdefaultData(data);
    }
	useEffect(() => {
		fetchData();
	}, []);

    const openAddEmployerModal = () => {
        setIsAddEmployerModalOpen(true);
    };

    const closeAddEmployerModal = () => {
        setIsAddEmployerModalOpen(false);
    };
	return (
		<Box pt={{ base: '180px', md: '80px', xl: '80px' }}>
            <Flex flexDirection='column' gridArea={{ xl: '1 / 3 / 2 / 4', '2xl': '1 / 2 / 2 / 3' }}>
                <Card px='0px' mb='20px'>
                    <Table tableData={defaultData} action={openAddEmployerModal}  updateDefaultData={fetchData}/>
                </Card>
            </Flex>
            <AddEmployer isOpen={isAddEmployerModalOpen} onClose={closeAddEmployerModal} updateDefaultData={fetchData}/>
		</Box>
	);
}

