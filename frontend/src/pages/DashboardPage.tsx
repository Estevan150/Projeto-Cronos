import { Button, Flex, Heading, Spacer, Box } from "@chakra-ui/react";
import { useAuth } from "../context/AuthContext";
import { auth } from "../firebaseConfig";
import { signOut } from "firebase/auth";

export default function DashboardPage() {
  const { user } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Erro no logout:", error);
    }
  };

  return (
    <Box>
      <Flex p={4} boxShadow="md" bg="white" color="black">
        <Heading size="md">Projeto Cronos</Heading>
        <Spacer />
        {user && <Button onClick={handleLogout} colorScheme="red">Sair</Button>}
      </Flex>
      <Flex p={8}>
        <Heading color="black">
          Bem-vindo ao Dashboard, {user?.email || "usuário"}!
        </Heading>
      </Flex>
    </Box>
  );
}