import {
    Box,
    Button,
    FormControl,
    FormErrorMessage, Heading,
    Input,
    Textarea
} from "@chakra-ui/react"

import {Field, Form, Formik} from "formik";
import React, {useEffect} from "react";
import * as Yup from "yup";
import Axios from "axios";

function CreateThread() {
    useEffect(() => {
        document.body.style.backgroundColor = "#EDF2F7";
        return (() => {
            document.body.style.backgroundColor = "#fff";
        });
    }, []);

    return (
        <Formik
            onSubmit={(values, actions) => {
                setTimeout(() => {
                    // TODO:
                    /*const dataToSubmit = {
                        user: user.id,
                        pipelineToken: values.pipelineToken,
                        title: values.title,
                        message: values.message
                    };
                    console.log(dataToSubmit)
                    Axios.post('/api/thread/new', dataToSubmit)
                        .then(response => {

                            console.log(response);
                        })
                        .catch(err => {
                            console.log(err);
                        });
                    setSubmitting(false);*/
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
            })}>
            {(props) => (
                <Box mt="4%"
                     width={{base: '95%', sm: '800px'}}
                     backgroundColor="white"
                     mr="auto"
                     ml="auto"
                     p="2.5em"
                     borderRadius="8px"
                     boxShadow="0px 4px 25px rgba(0, 0, 0, 0.13)">
                    <Heading as="h1" size="xl" textAlign="center">
                        Create a new thread
                    </Heading>

                    <Form>
                        <Field name="pipelineToken">
                            {({field, form}) => (
                                <FormControl
                                    mt={4}
                                    isInvalid={form.errors.pipelineToken && form.touched.pipelineToken}>
                                    <Input {...field} id="pipelineToken"
                                           placeholder="Enter a Dropbase pipeline token"/>
                                    <FormErrorMessage>{form.errors.pipelineToken}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>

                        <Field name="title">
                            {({field, form}) => (
                                <FormControl isInvalid={form.errors.title && form.touched.title}
                                             mt={4}>
                                    <Input {...field} id="title" placeholder="Enter a title"/>
                                    <FormErrorMessage>{form.errors.title}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>

                        <Field name="message">
                            {({field, form}) => (
                                <FormControl
                                    isInvalid={form.errors.message && form.touched.message}
                                    mt={4}>
                                    <Textarea {...field} id="message"
                                              placeholder="Enter a message.."/>
                                    <FormErrorMessage>{form.errors.message}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>

                        <Button
                            mt={4}
                            colorScheme="teal"
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
