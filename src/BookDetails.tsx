import { useState } from "react"
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Stack,
  Text,
  Center,
  Spinner,
  Textarea,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react"
import axios from "axios"
import { useMutation, useQuery } from "react-query"
import { useParams } from "react-router-dom"
import { Formik, Field } from "formik"
import moment from "moment"
import { API_URL } from "./lib/constants"

const BookDetails = () => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const { bookId } = useParams();

  const {
    data,
    isLoading,
  } = useQuery('book', () => axios.get(`${API_URL}/bookings/${bookId}`).then((res) => res.data));

  const {
    mutate: updateBook,
    isLoading: isUpdating,
  } = useMutation((newBook: object) => {
    return axios.patch(`${API_URL}/bookings/${bookId}`, newBook);
  }, {
    onSuccess() {
      setIsEditing(false);
    },
  });

  if (isLoading) {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }

  return (
    <>
      <Box px={{ base: "4", md: "6" }} pt="5">
        <Text fontSize="lg" fontWeight="medium">
          Book Details: ID {`${bookId}`}
        </Text>
      </Box>
      <Formik
        initialValues={{
          ...data,
          guests: data.guests.join(','),
          bookingDate: moment(data.bookingDate).format('yyyy-MM-DDThh:mm'),
          bookingTimeStart: moment(data.bookingTimeStart).format('yyyy-MM-DDThh:mm'),
        }}
        onSubmit={({ duration, bookingTimeStart }) => {
          updateBook({
            duration: parseInt(duration),
            bookingTimeStart: moment(bookingTimeStart).toDate(),
          });
        }}
      >
        {({ handleSubmit, errors, touched }) => (
          <form onSubmit={handleSubmit}>
            <Box bg="bg-surface" borderRadius="lg">
              <Stack spacing="5" px={{ base: '4', md: '6' }} py={{ base: '5', md: '6' }}>
                <Stack spacing="6" direction={{ base: 'column', md: 'row' }}>
                  <FormControl id="roomName">
                    <FormLabel>Room Name</FormLabel>
                    <Field
                      as={Input}
                      id="roomName"
                      name="roomName"
                      type="text"
                      disabled={isEditing}
                      readOnly
                      required
                    />
                  </FormControl>

                  <FormControl id="hostName">
                    <FormLabel>Host Name</FormLabel>
                    <Field
                      as={Input}
                      id="hostName"
                      name="hostName"
                      type="text"
                      disabled={isEditing}
                      readOnly
                      required
                    />
                  </FormControl>
                </Stack>

                <Stack spacing="6" direction={{ base: 'column', md: 'row' }}>
                  <FormControl id="bookingDate">
                    <FormLabel>Booking Date</FormLabel>
                    <Field
                      as={Input}
                      id="bookingDate"
                      name="bookingDate"
                      type="datetime-local"
                      disabled={isEditing}
                      readOnly
                      required
                    />
                  </FormControl>

                  <FormControl id="bookingTimeStart">
                    <FormLabel>Booking Time Start</FormLabel>
                    <Field
                      as={Input}
                      id="bookingTimeStart"
                      name="bookingTimeStart"
                      type="datetime-local"
                      readOnly={!isEditing}
                      required
                    />
                  </FormControl>
                </Stack>

                <Stack spacing="6" direction={{ base: 'column', md: 'row' }}>
                  <Field name="duration">
                    {({ field, form }: { field: any, form: any }) => (
                      <FormControl id='duration'>
                        <FormLabel htmlFor='duration'>Duration</FormLabel>
                        <NumberInput
                          min="1"
                          {...field}
                          onChange={(val) => form.setFieldValue(field.name, val)}
                          readOnly={!isEditing}
                          required
                        >
                            <NumberInputField />
                            <NumberInputStepper>
                              <NumberIncrementStepper />
                              <NumberDecrementStepper />
                            </NumberInputStepper>
                          </NumberInput>
                      </FormControl>
                    )}
                  </Field>
                </Stack>

                <FormControl id="guests">
                  <FormLabel>Guests</FormLabel>
                  <Field
                    as={Textarea}
                    id="guests"
                    name="guests"
                    type="datetime-local"
                    disabled={isEditing}
                    readOnly
                  />
                  <FormHelperText>
                    Enter multiple guests name separated by comma.
                  </FormHelperText>
                </FormControl>
              </Stack>

              {isEditing && (
                <Stack spacing="2" direction="row-reverse" py="4" px={{ base: '4', md: '6' }}>
                  <Button colorScheme="blue" type="submit" isLoading={isUpdating}>
                    Save
                  </Button>
                  {!isUpdating && (
                    <Button type="reset" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                  )}
                </Stack>
              )}
            </Box>
          </form>
        )}
      </Formik>

      {!isEditing && (
        <Stack spacing="2" direction="row" py="4" px={{ base: '4', md: '6' }}>
          <Button colorScheme="yellow" type="button" onClick={() => setIsEditing(true)}>
            Edit
          </Button>
        </Stack>
      )}
    </>
  );
}

export default BookDetails
