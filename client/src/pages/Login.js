import React, {useState, useEffect} from 'react';
import {
  Box,
  Text,
  Heading,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  InputGroup,
  InputRightElement,
  Divider,
  useToast,
} from '@chakra-ui/react';
import {Formik, Field} from 'formik';
import {Link} from 'react-router-dom';
import * as Yup from 'yup';
import Axios from 'axios';
import {FaFacebook, FaGoogle} from 'react-icons/fa';

function Login(props) {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();

  useEffect(() => {
    document.body.style.backgroundColor = "#EDF2F7";
    return (() => {
      document.body.style.backgroundColor = "#fff";
    });
  }, []);

  return (
    <Formik
      initialValues={{email: '', password: ''}}
      validationSchema={Yup.object().shape({
        email: Yup.string().email('Email is invalid').required('Email is required'),
        password: Yup.string().required('Password is required'),
      })}
      onSubmit={(values, {setSubmitting}) => {
        setTimeout(() => {
          const dataToSubmit = {
            email: values.email,
            password: values.password,
          };
          Axios.post('/auth/login', dataToSubmit)
            .then(response => {
              // If login was successful
              if (response.data.success) {
                // TODO: use history.push or location.href?
                // props.history.push('/');
                window.location.href = '/';
              } else {
                // Login failed not due to incorrect email or password
                toast({
                  title: 'Login failed.',
                  description: 'Invalid email or password.',
                  position: 'top',
                  status: 'error',
                  duration: 9000,
                  isClosable: true,
                });
              }
            })
            .catch(err => {
              // Login failed due to incorrect email or password, or server error
              // Return the error message from server
              if (err.response.data) {
                toast({
                  title: 'Login failed.',
                  description: err.response.data.msg || 'Server error.',
                  position: 'top',
                  status: 'error',
                  duration: 9000,
                  isClosable: true,
                });
              }
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
                Login
              </Heading>
              <form onSubmit={props.handleSubmit}>
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
                      <InputGroup>
                        <Input
                          {...field}
                          pr="4.5rem"
                          type={show ? 'text' : 'password'}
                          placeholder="Enter password"
                          focusBorderColor="purple.500"
                        />
                        <InputRightElement width="4.5rem">
                          <Button h="1.75rem" size="sm" onClick={handleClick}>
                            {show ? 'Hide' : 'Show'}
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                      <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                {/* <Text mt={2} textAlign="right" color="gray.500">
                  <Link to="/password/forgot">Forgot password?</Link>
                </Text> */}
                <Button
                  size="lg"
                  mt={8}
                  colorScheme="purple"
                  isLoading={props.isSubmitting}
                  type="submit"
                  width="100%"
                >
                  Login
                </Button>
              </form>
              {/* <Text mt={2} textAlign="center" fontSize="xl" fontWeight="600">
                OR
              </Text>
              <a href="/auth/facebook">
                <Button mt={2} leftIcon={<FaFacebook />} colorScheme="facebook" width="100%">
                  Login with Facebook
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
                  Login with Google
                </Button>
              </a> */}
              <Divider mt={8} />
              <Text mt={8} textAlign="center" fontSize="xl">
                New to crowd.space?{' '}
                <Link to="/register">
                  <u>Sign up</u>
                </Link>
              </Text>
            </Box>
          </Box>
        </div>
      )}
    </Formik>
  );
}

export default Login;
