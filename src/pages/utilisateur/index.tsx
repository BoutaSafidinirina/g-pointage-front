
import React, {  useEffect, useState } from 'react';

// Chakra imports
import { Box, Flex} from '@chakra-ui/react';

// Custom components
import Table from './utils/table';
import Card from '../../components/card/Card';
import { AddUser } from './add';
import generateTableData from './utils/variables';

export default function Utilisateur(){
    const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
    const [defaultData, setdefaultData] = useState([]);
    const openAddUserModal = () => {
        setIsAddUserModalOpen(true);
    };

    const closeAddUserModal = () => {
        setIsAddUserModalOpen(false);
    };
    async function fetchData() {
        const data:any = await generateTableData();
        setdefaultData(data);
    }
    useEffect(() => {
		fetchData();
	}, []);
	return (
		<Box pt={{ base: '180px', md: '80px', xl: '80px' }}>
            <Flex flexDirection='column' gridArea={{ xl: '1 / 3 / 2 / 4', '2xl': '1 / 2 / 2 / 3' }}>
                <Card px='0px' mb='20px'>
                    <Table tableData={defaultData} action={openAddUserModal} updateDefaultData={fetchData} />
                </Card>
            </Flex>
            <AddUser isOpen={isAddUserModalOpen} onClose={closeAddUserModal} />
		</Box>
	);
}

