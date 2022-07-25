import { Container, Stat, StatLabel, StatNumber } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const Online = () => {
  const params = useParams<{ alias: string }>();
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:3000/online-alias');

    ws.onmessage = (event) => {
      if (event.data === params.alias) {
        setCount(count => count + 1);
      }
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <Container maxW="lg" mt={4}>
      <Stat>
        <StatLabel>Opened "{params.alias}"</StatLabel>
        <StatNumber>{count}</StatNumber>
      </Stat>
    </Container>
  );
};
