import React, { useState } from 'react';
import {
  Flex, Box, FormControl, FormLabel, Input, Stack, Button, Heading, Text, useColorModeValue, useToast,
} from '@chakra-ui/react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('Login bem-sucedido:', userCredential.user);
      navigate('/');
    } catch (error) { // CORREÇÃO: Removido o tipo 'any' e adicionada uma verificação
      console.error('Erro no login:', error);
      let errorMessage = "Ocorreu um erro inesperado.";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      toast({
        title: 'Erro no login.',
        description: errorMessage,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex minH={'100vh'} align={'center'} justify={'center'} bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Faça login na sua conta</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            para ter acesso a todas as funcionalidades ✌️
          </Text>
        </Stack>
        <Box rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} p={8}>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Endereço de email</FormLabel>
              <Input type="email" value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Senha</FormLabel>
              <Input type="password" value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                onClick={handleLogin}
                isLoading={isLoading}
                size="lg"
                bg={'blue.400'}
                color={'white'}
                _hover={{ bg: 'blue.500' }}>
                Entrar
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}