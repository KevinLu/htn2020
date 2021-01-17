import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Box,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  Textarea,
  Tag,
  TagLabel,
  TagCloseButton,
  useToast,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useDropzone } from 'react-dropzone';

function ContributeModal(props) {
  const { isOpen, onClose, threadId } = props;
  const uploadUrl = '/api/contribution/upload';
  const [Files, setFiles] = useState([]);
  const toast = useToast();

  const onDelete = file => {
    setFiles(Files.filter(item => item.name !== file.name));
    toast({
      position: 'bottom',
      title: 'File removed.',
      duration: 2000,
      isClosable: true,
    });
  };

  const onDrop = files => {
    console.log(files);
    let formData = new FormData();
    const config = {
      header: { 'content-type': 'multipart/form-data' },
    };
    formData.append('file', files[0]);
    Axios.post(uploadUrl, formData, config).then(response => {
      console.log(response);
      if (response.data.success) {
        setFiles([...Files, response.data.file]);
        toast({
          position: 'bottom',
          title: 'File uploaded.',
          description: 'File successfully uploaded.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        props.updateContributions();
      } else {
        toast({
          position: 'bottom',
          title: 'Error uploading file.',
          description: 'Check the file type.',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      }
    });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <Formik
              onSubmit={(values, actions) => {
                if (Files.length > 0) {
                  setTimeout(() => {
                    // TODO:
                    const dataToSubmit = {
                      title: values.title,
                      description: values.message,
                      fileUrl: Files[0].location,
                    };
                    console.log(dataToSubmit);
                    Axios.post(
                      `/api/thread/${threadId}/contributions`,
                      dataToSubmit
                    )
                      .then(response => {
                        console.log("contribution submitted", response);
                        if (response.status === 200) {
                          window.location.reload();
                        }
                      })
                      .catch(err => {
                        console.log(err);
                      });
                    actions.setSubmitting(false);
                  }, 500);
                }
              }}
              initialValues={{}}
            >
              {props => (
                <Box
                  mt="4%"
                  width={{ base: '95%', sm: '400px' }}
                  backgroundColor="white"
                  mr="auto"
                  ml="auto"
                  p="2.5em"
                  borderRadius="8px"
                >
                  <Heading as="h1" size="xl" textAlign="center">
                    Contribute to a thread
                  </Heading>

                  <Form>
                    <Field name="title">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={form.errors.title && form.touched.title}
                          mt={4}
                        >
                          <Input
                            {...field}
                            id="title"
                            placeholder="Enter a title"
                          />
                          <FormErrorMessage>
                            {form.errors.title}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <Field name="message">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={
                            form.errors.message && form.touched.message
                          }
                          mt={4}
                        >
                          <Textarea
                            {...field}
                            id="message"
                            placeholder="Enter a message.."
                          />
                          <FormErrorMessage>
                            {form.errors.message}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <div
                      className="container"
                      style={{
                        marginTop: '15px',
                        marginBottom: '15px',
                        borderWidth: '2px',
                        borderStyle: 'dashed',
                        padding: '5px',
                      }}
                    >
                      <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        {isDragActive ? (
                          <p>Drop the files here ...</p>
                        ) : (
                          <p>
                            Drag 'n' drop some files here, or click to select
                            files
                          </p>
                        )}
                      </div>
                    </div>

                    <Box>
                      {Files.map((file, index) => (
                        <div
                          key={index}
                          style={{ marginLeft: 'auto', marginBottom: '3px' }}
                        >
                          <Tag
                            size="md"
                            key={index}
                            variant="solid"
                            colorScheme="blue"
                          >
                            <TagLabel>{file.name}</TagLabel>
                            <TagCloseButton onClick={() => onDelete(file)} />
                          </Tag>
                        </div>
                      ))}
                    </Box>

                    <Button
                      mt={4}
                      colorScheme="purple"
                      type="close"
                      onClick={onClose}
                    >
                      Submit
                    </Button>
                  </Form>
                </Box>
              )}
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default ContributeModal;
