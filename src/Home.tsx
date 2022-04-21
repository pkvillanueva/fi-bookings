import React from "react"
import {
  Box,
  HStack,
  Stack,
  Text,
  Select,
  Button,
  ButtonGroup,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Link
} from "@chakra-ui/react"
import axios from "axios"
import { useState } from "react"
import { useQuery } from "react-query"
import { Link as NavLink } from "react-router-dom"
import moment from "moment"
import { API_URL } from "./lib/constants"
import { RoomProps } from "./lib/types"

const Home = () => {
  const [rows, setRows] = useState<number>(10);
  const [page, setPage] = useState<number>(0);

  const {
    data,
    isFetching,
  } = useQuery('rooms', () => axios.get(`${API_URL}/bookings`).then((res) => res.data));

  const handleRowsChange = (event: React.ChangeEvent<any>) => {
    setRows(event.target.value);
    setPage(0);
  };

  return (
    <Stack spacing="5">
      <Box px={{ base: "4", md: "6" }} pt="5">
        <Text fontSize="lg" fontWeight="medium">
          Rooms
        </Text>
      </Box>

      {!isFetching && (
        <>
          <Box overflowX="auto">
            <Table>
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Room Name</Th>
                  <Th>Host Name</Th>
                  <Th>Booking Date</Th>
                </Tr>
              </Thead>

              <Tbody>
                {data.slice(page * rows, (rows * (page + 1))).map((item: RoomProps) => (
                  <Tr key={item.id}>
                    <Td><Link as={NavLink} color="blue.500" to={`book/${item.id}`}>{item.id}</Link></Td>
                    <Td><Text color="muted">{item.roomName}</Text></Td>
                    <Td><Text color="muted">{item.hostName}</Text></Td>
                    <Td><Text color="muted">{moment(item.bookingDate).format("lll")}</Text></Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>

          <Box px={{ base: "4", md: "6" }} pb="5">
            <HStack spacing="3" justify="space-between">
              <HStack spacing="2" color="muted" fontSize="sm">
                <Text>
                  Show
                </Text>

                <Select
                  w="70px"
                  size="xs"
                  rounded={1}
                  value={rows}
                  onChange={handleRowsChange}
                >
                  <option value={6}>5</option>
                  <option value={10}>10</option>
                  <option value={15}>15</option>
                  <option value={20}>20</option>
                </Select>

                <Text>
                  rows
                </Text>
              </HStack>

              <ButtonGroup variant='outline' spacing='1' size="xs">
                {Array.from({ length: Math.ceil(data.length / rows) }, (value, index) => index + 1).map((label, key) => (
                  <Button isActive={key === page} key={key} onClick={() => setPage(key)}>
                    {label}
                  </Button>
                ))}
              </ButtonGroup>
            </HStack>
          </Box>
        </>
      )}
    </Stack>
  );
}
export default Home
