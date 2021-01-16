import {
    Button,
    FormControl,
    FormErrorMessage,
    Input,
    Textarea
} from "@chakra-ui/react"

import {Field, Form, Formik} from "formik";

function CreateThread() {
    function validateTitle(value) {
        if (!value) {
            return "A title is required!";
        }
    }

    function validateMessage(value) {
        if (!value) {
            return "The message cannot be blank!";
        }
    }

    function validateToken(value) {
        if (!value) {
            return "The Dropbase pipeline token cannot be blank!";
        }
    }

    return (
        <Formik
            onSubmit={(values, actions) => {
                // todo create thread
                return true
            }}
            initialValues={[]}>
            {(props) => (
                <Form>
                    <Field name="pipelineToken" validate={validateToken}>
                        {({ field, form }) => (
                            <FormControl isInvalid={form.errors.pipelineToken && form.touched.pipelineToken}>
                                <Input {...field} id="pipelineToken" placeholder="Dropbase pipeline token" />
                                <FormErrorMessage>{form.errors.pipelineToken}</FormErrorMessage>
                            </FormControl>
                        )}
                    </Field>

                    <Field name="title" validate={validateTitle}>
                        {({ field, form }) => (
                            <FormControl isInvalid={form.errors.title && form.touched.title}>
                                <Input {...field} id="title" placeholder="Thread title" />
                                <FormErrorMessage>{form.errors.title}</FormErrorMessage>
                            </FormControl>
                        )}
                    </Field>

                    <Field name="message" validate={validateMessage}>
                        {({ field, form }) => (
                            <FormControl isInvalid={form.errors.message && form.touched.message}>
                                <Textarea {...field} id="message" placeholder="Enter a message.." />
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
            )}
        </Formik>
    )
}

export default CreateThread;
