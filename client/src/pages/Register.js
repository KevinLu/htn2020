import React, {useEffect} from 'react';
import {
  Box,
  Text,
  Heading,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  Divider,
} from '@chakra-ui/react';
import {Formik, Field} from 'formik';
import {Link} from 'react-router-dom';
import * as Yup from 'yup';
import Axios from 'axios';
import {FaFacebook, FaGoogle} from 'react-icons/fa';

function Register() {
  useEffect(() => {
    document.body.style.backgroundColor = "#EDF2F7";
    return (() => {
      document.body.style.backgroundColor = "#fff";
    });
  }, []);

  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().required('Please enter your name'),
        email: Yup.string().email('Email is invalid').required('Please enter an e-mail'),
        password: Yup.string()
          .min(6, 'Password must be at least 6 characters')
          .required('Please enter a password'),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Passwords must match')
          .required('Please type your password again'),
      })}
      onSubmit={(values, {setSubmitting}) => {
        setTimeout(() => {
          const cleanEmail = values.email;
          cleanEmail.trim();
          const dataToSubmit = {
            name: values.name,
            email: values.email,
            password: values.password,
          };
          Axios.post('/auth/register', dataToSubmit)
            .then(response => {
              // TODO: auto login user after registering or redirect
              console.log(response);
            })
            .catch(err => {
              console.log(err);
            });
          setSubmitting(false);
        }, 500);
      }}
    >
      {props => (
        <div>
          <Box pt="4%">
            <Box
              width={{base: '95%', sm: '480px'}}
              backgroundColor="white"
              m="auto"
              p="2.5em"
              borderRadius="8px"
              boxShadow="0px 4px 25px rgba(0, 0, 0, 0.13)"
            >
              <Heading as="h1" size="xl" textAlign="center">
                Register
              </Heading>
              <form onSubmit={props.handleSubmit}>
                <Field name="name">
                  {({field, form}) => (
                    <FormControl isInvalid={form.errors.name && form.touched.name} id="name" mt={2}>
                      <FormLabel htmlFor="name">Name</FormLabel>
                      <Input
                        {...field}
                        focusBorderColor="purple.500"
                        type="text"
                        placeholder="First and last name"
                      />
                      <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="email">
                  {({field, form}) => (
                    <FormControl
                      isInvalid={form.errors.email && form.touched.email}
                      id="email"
                      mt={2}
                    >
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <Input
                        {...field}
                        focusBorderColor="purple.500"
                        type="email"
                        placeholder="Enter email address"
                      />
                      <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="password">
                  {({field, form}) => (
                    <FormControl
                      isInvalid={form.errors.password && form.touched.password}
                      id="password"
                      mt={2}
                    >
                      <FormLabel htmlFor="password">Password</FormLabel>
                      <Input
                        {...field}
                        type="password"
                        placeholder="Enter password"
                        focusBorderColor="purple.500"
                      />
                      <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="confirmPassword">
                  {({field, form}) => (
                    <FormControl
                      isInvalid={form.errors.confirmPassword && form.touched.confirmPassword}
                      id="confirmPassword"
                      mt={2}
                    >
                      <FormLabel htmlFor="confirmPassword">Confirm password</FormLabel>
                      <Input
                        {...field}
                        type="password"
                        placeholder="Confirm password"
                        focusBorderColor="purple.500"
                      />
                      <FormErrorMessage>{form.errors.confirmPassword}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Button
                  size="lg"
                  mt={8}
                  colorScheme="purple"
                  isLoading={props.isSubmitting}
                  type="submit"
                  width="100%"
                >
                  Register
                </Button>
              </form>
              {/* <Text mt={2} textAlign="center" fontSize="xl" fontWeight="600">
                OR
              </Text>
              <a href="/auth/facebook">
                <Button mt={2} leftIcon={<FaFacebook />} colorScheme="facebook" width="100%">
                  Register with Facebook
                </Button>
              </a>
              <a href="/auth/google">
                <Button
                  mt={2}
                  leftIcon={<FaGoogle />}
                  backgroundColor="#4285F4"
                  _hover={{bg: '#296bd9'}}
                  color="white"
                  width="100%"
                >
                  Register with Google
                </Button>
              </a> */}
              <Divider mt={8} />
              <Text mt={8} textAlign="center" fontSize="xl">
                Have an account?{' '}
                <Link to="/login">
                  <u>Sign in</u>
                </Link>
              </Text>
            </Box>
          </Box>
        </div>
      )}
    </Formik>
  );
}

export default Register;
