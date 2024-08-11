import {
  Box,
  Button,
  Flex,
  Icon,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
// Custom components
import Card from "../../../components/card/Card";
import React, { useEffect, useState } from "react";
// Assets
import { MdLogout, MdOutlineCached } from "react-icons/md";
import axios from "axios";
import Swal from "sweetalert2";
import "../../../assets/css/sweetalert.css";
import moment from "moment";
import { RemarquePointage } from "../edit";
import { useLocalStorage } from "../../appContexte";
type RowObj = {
  id: number;
  im: string;
  date_heure_entree: string;
  date_heure_sortie: string;
  status: string;
  remarque: string;
  employee_id: number;
  employee: string;
  action: JSX.Element[];
};

const columnHelper = createColumnHelper<RowObj>();

// const columns = columnsDataCheck;
export default function TablePointage(props: {
  tableData: any;
  updateDefaultData: () => void;
}) {
  const { tableData } = props;
  const { authData } = useLocalStorage();
  const role = authData?.auth.role;
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const textColor = useColorModeValue("black", "black");
  const borderColor = useColorModeValue("gray.200", "gray.200");
  const textColorSecondary = useColorModeValue("white", "white");
  const bgHover1 = useColorModeValue({ bg: "red.300" }, { bg: "red.300" });

  const handleClickSortir = (id: number) => {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });

    if (authData) {
      axios
        .put(`http://localhost:3001/api/pointage/${id}`, {
          employee_id: id,
          date_heure_sortie: new Date(),
        })
        .then((res) => {
          if (res.data.error) {
            Toast.fire({
              icon: "error",
              title: res.data.error,
            });
          } else {
            Toast.fire({
              icon: "success",
              title: `A bientôt ${authData?.auth.pseudo}!`,
            });
            props.updateDefaultData();
          }
        });
    }
  };

  const columns = [
    columnHelper.accessor("im", {
      id: "im",
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: "10px", lg: "12px" }}
          color="gray.400"
        >
          IM
        </Text>
      ),
      cell: (info: any) => (
        <Flex align="center">
          <Text color={textColor} fontSize="sm" fontWeight="700">
            {info.getValue()}
          </Text>
        </Flex>
      ),
    }),
    columnHelper.accessor("employee", {
      id: "employee",
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: "10px", lg: "12px" }}
          color="gray.400"
        >
          Nom et prénom
        </Text>
      ),
      cell: (info: any) => (
        <Flex align="center">
          <Text color={textColor} fontSize="sm" fontWeight="700">
            {info.getValue() != null ? info.getValue() : ""}
          </Text>
        </Flex>
      ),
    }),
    columnHelper.accessor("date_heure_entree", {
      id: "date_heure_entree",
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: "10px", lg: "12px" }}
          color="gray.400"
        >
          ENTREE
        </Text>
      ),
      cell: (info) => {
        const dateValue = info.getValue();
        const formattedDate = moment.utc(dateValue).format("DD-MM-YYYY HH:mm");

        return (
          <Text color={textColor} fontSize="sm" fontWeight="400">
            {formattedDate}
          </Text>
        );
      },
    }),
    columnHelper.accessor("date_heure_sortie", {
      id: "date_heure_sortie",
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: "10px", lg: "12px" }}
          color="gray.400"
        >
          SORTIE
        </Text>
      ),
      cell: (info) => {
        const dateValue = info.getValue();
        const formatDate = moment.utc(dateValue).format("DD-MM-YYYY HH:mm");

        return role === "admin" ? (
          info.getValue() == null ? (
            <Flex align="center">
              <Button
                bg={"red.500"}
                onClick={() => handleClickSortir(info.row.original.employee_id)}
                _hover={bgHover1}
                fontSize="xs"
                fontWeight="800"
                color={textColorSecondary}
                borderRadius="7px"
              >
                <Icon
                  as={MdLogout}
                  color={textColorSecondary}
                  fontWeight="800"
                  me="4px"
                />
                Sortie
              </Button>
            </Flex>
          ) : (
            <Text color={textColor} fontSize="sm" fontWeight="400">
              {formatDate}
            </Text>
          )
        ) : info.getValue() == null ? (
          <Flex align="center">
            <Icon
              w="24px"
              h="24px"
              me="5px"
              color="orange.500"
              as={MdOutlineCached}
            />
            <Text color="orange.500" fontSize="sm" fontWeight="500">
              En attente de sortir
            </Text>
          </Flex>
        ) : (
          <Text color={textColor} fontSize="sm" fontWeight="400">
            {formatDate}
          </Text>
        );
      },
    }),
    columnHelper.accessor("remarque", {
      id: "remarque",
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: "10px", lg: "12px" }}
          color="gray.400"
        >
          REMARQUE
        </Text>
      ),
      cell: (info) => (
        <Text color={textColor} fontSize="sm" fontWeight="400">
          {info.getValue() != null ? info.getValue() : ""}
        </Text>
      ),
    }),
    columnHelper.accessor("action", {
      id: "action",
      header: () =>
        role === "admin" && (
          <Text
            justifyContent="space-between"
            align="center"
            fontSize={{ sm: "10px", lg: "12px" }}
            color="gray.400"
          >
            Action
          </Text>
        ),
      cell: (info) =>
        role === "admin" && (
          <Flex align="center">
            <>
              <Button
                bg={"transparent"}
                _hover={{ bg: "transparent" }}
                p={"0"}
                width={"25px"}
                height={"25px"}
                onClick={() => handleEdit(info.row.original.id)}
              >
                {info.getValue()[1]}
              </Button>
              &nbsp;
              <Button
                bg={"transparent"}
                _hover={{ bg: "transparent" }}
                p={"0"}
                width={"25px"}
                height={"25px"}
                onClick={() => handleDelete(info.row.original.id)}
              >
                {info.getValue()[0]}
              </Button>
            </>
          </Flex>
        ),
    }),
  ];

  const [data, setData] = useState<any>([]);
  const [idEdit, setId] = useState<number | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setId(null);
    setIsEditModalOpen(false);
  };
  const handleEdit = async (itemId: any) => {
    setId(itemId);
    openEditModal();
  };
  useEffect(() => {
    setData(tableData);
  }, [tableData]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

  const handleDelete = async (itemId: any) => {
    const result = await Swal.fire({
      title: "Êtes-vous sûr de vouloir supprimer cete élément?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Oui,supprimer!",
      cancelButtonText: "Annuler",
      confirmButtonColor: "#3085d6",
      customClass: {
        popup: "custom-popup-class", // Classe CSS pour personnaliser la taille de la fenêtre
        confirmButton: "custom-confirm-button-class", // Classe CSS pour personnaliser le bouton "Confirmer"
        title: "custom-title-class", // Classe CSS pour personnaliser le titre
        icon: "custom-icon-class", // Classe CSS pour personnaliser l'icône
      },
      backdrop: `
			  rgba(0,0,123,0.4)
			`,
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
        },
      });
      try {
        axios
          .delete(`http://localhost:3001/api/pointage/${itemId}`)
          .then(() => {
            Toast.fire({
              icon: "success",
              title: "Success",
            });
            props.updateDefaultData();
          });
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "Error",
        });
      }
    }
  };

  return (
    <Card flexDirection="column" w="100%" px="0px">
      <Flex px="25px" mb="8px" justifyContent="space-between" align="center">
        <Text color={"navy.800"}>Tous les pointage</Text>
      </Flex>
      <Box w="100%" px="0px" overflowX={{ sm: "scroll" }}>
        <Table variant="simple" color="gray.500" mb="24px" mt="12px">
          <Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <Th
                      key={header.id}
                      colSpan={header.colSpan}
                      pe="10px"
                      borderColor={borderColor}
                      cursor="pointer"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <Flex
                        justifyContent="space-between"
                        align="center"
                        fontSize={{ sm: "10px", lg: "12px" }}
                        color="gray.400"
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: "",
                          desc: "",
                        }[header.column.getIsSorted() as string] ?? null}
                      </Flex>
                    </Th>
                  );
                })}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {table
              .getRowModel()
              .rows.slice(0, 11)
              .map((row) => {
                return (
                  <Tr key={row.id}>
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <Td
                          key={cell.id}
                          fontSize={{ sm: "14px" }}
                          minW={{ sm: "150px", md: "200px", lg: "auto" }}
                          width={"auto"}
                          borderColor="transparent"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </Td>
                      );
                    })}
                  </Tr>
                );
              })}
          </Tbody>
        </Table>
        {idEdit !== null && (
          <RemarquePointage
            isOpen={isEditModalOpen}
            onClose={closeEditModal}
            updateDefaultData={props.updateDefaultData}
            id={idEdit}
          />
        )}
      </Box>
    </Card>
  );
}
