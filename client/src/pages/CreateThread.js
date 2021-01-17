import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  Textarea,
  Tag, TagLabel, TagCloseButton,
  useToast,
} from '@chakra-ui/react';

import {Field, Form, Formik} from 'formik';
import React, {useEffect, useState} from 'react';
import * as Yup from 'yup';
import Axios from 'axios';
import {useDropzone} from 'react-dropzone';

function CreateThread() {
  const uploadUrl = '/api/contribution/upload';
  const [Files, setFiles] = useState([]);
  const toast = useToast();

  useEffect(() => {
    document.body.style.backgroundColor = '#EDF2F7';
    return () => {
      document.body.style.backgroundColor = '#fff';
    };
  }, []);

  const onDelete = (file) => {
    setFiles(Files.filter(item => item.name !== file.name));
    toast({
      position: "bottom",
      title: "File removed.",
      duration: 2000,
      isClosable: true
    });
  }

  const onDrop = (files) => {
    console.log(files);
    let formData = new FormData();
    const config = {
      header: {'content-type': 'multipart/form-data'}
    }
    formData.append("file", files[0]);
    Axios.post(uploadUrl, formData, config)
      .then(response => {
        console.log(response);
        if (response.data.success) {
          setFiles([...Files, response.data.file]);
          toast({
            position: "bottom",
            title: "File uploaded.",
            description: "File successfully uploaded.",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        } else {
          toast({
            position: "bottom",
            title: "Error uploading file.",
            description: "Check the file type.",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        }
      });
  }

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});

  return (
    <Formik
      onSubmit={(values, actions) => {
        setTimeout(() => {
          // TODO:
          const dataToSubmit = {
            pipelineToken: values.pipelineToken,
            title: values.title,
            message: values.message,
            fileUrl: Files[0].location,
          };
          console.log(dataToSubmit)
          Axios.post('/api/thread/new', dataToSubmit)
            .then(response => {

              console.log(response);
            })
            .catch(err => {
              console.log(err);
            });
            actions.setSubmitting(false);
        }, 500);
      }}
      initialValues={{}}
      validationSchema={Yup.object().shape({
        pipelineToken: Yup.string().required('Please enter a pipeline token'),
        title: Yup.string()
          .min(10, 'Title must be at least 10 characters')
          .required('Please enter a title'),
        message: Yup.string()
          .min(10, 'Message must be at least 10 characters')
          .required('Please enter a message'),
      })}
    >
      {props => (
        <Box
          mt="4%"
          width={{base: '95%', sm: '800px'}}
          backgroundColor="white"
          mr="auto"
          ml="auto"
          p="2.5em"
          borderRadius="8px"
          boxShadow="0px 4px 25px rgba(0, 0, 0, 0.13)"
        >
          <Heading as="h1" size="xl" textAlign="center">
            Create a new thread
          </Heading>

          <Form>
            <Field name="pipelineToken">
              {({field, form}) => (
                <FormControl
                  mt={4}
                  isInvalid={
                    form.errors.pipelineToken && form.touched.pipelineToken
                  }
                >
                  <Input
                    {...field}
                    id="pipelineToken"
                    placeholder="Enter a Dropbase pipeline token"
                  />
                  <FormErrorMessage>
                    {form.errors.pipelineToken}
                  </FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Field name="title">
              {({field, form}) => (
                <FormControl
                  isInvalid={form.errors.title && form.touched.title}
                  mt={4}
                >
                  <Input {...field} id="title" placeholder="Enter a title" />
                  <FormErrorMessage>{form.errors.title}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Field name="message">
              {({field, form}) => (
                <FormControl
                  isInvalid={form.errors.message && form.touched.message}
                  mt={4}
                >
                  <Textarea
                    {...field}
                    id="message"
                    placeholder="Enter a message.."
                  />
                  <FormErrorMessage>{form.errors.message}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <div
              className="container"
              style={{marginTop: '15px', marginBottom: '15px', borderWidth: "2px", borderStyle: 'dashed', padding: '5px'}}
            >
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                {isDragActive ? (
                  <p>Drop the files here ...</p>
                ) : (
                    <p>Drag 'n' drop some files here, or click to select files</p>
                  )}
              </div>
            </div>

            <Box>
              {Files.map((file, index) => (
                <div key={index} style={{marginLeft: 'auto', marginBottom: '3px'}}>
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
              isLoading={props.isSubmitting}
              type="submit"
            >
              Submit
                        </Button>
          </Form>
        </Box>
      )}
    </Formik>
  )
}

export default CreateThread;
