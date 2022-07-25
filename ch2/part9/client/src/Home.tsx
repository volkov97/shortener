import {
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { useCallback } from "react";
import { useForm } from "react-hook-form";

interface ShortenerInfo {
  alias: string;
  link: string;
}

export function Home() {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ShortenerInfo>();
  const toast = useToast();

  const onSubmit = useCallback(async (values: ShortenerInfo) => {
    const response = await fetch("http://localhost:3000/alias", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ alias: values.alias, link: values.link }),
    });

    if (response.ok) {
      reset();

      toast({
        title: "Alias created!",
        description: `Alias "${values.alias}" now redirects to ${values.link}`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Error",
        description: await response.text() || 'Unknown error...',
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }, []);

  return (
    <Container maxW="lg" mt={4}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={4} align="flex-start">
          <Heading as="h3" size="lg">
            Add new alias
          </Heading>

          <FormControl isInvalid={!!errors.alias}>
            <FormLabel htmlFor="name">Alias</FormLabel>
            <Input
              id="name"
              placeholder="cat"
              {...register("alias", {
                required: "This is required",
              })}
            />
            <FormErrorMessage>
              {errors.alias && errors.alias.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.link}>
            <FormLabel htmlFor="name">Full link</FormLabel>
            <Input
              id="name"
              placeholder="https://yandex.ru/images/search?text=cat"
              {...register("link", {
                required: "This is required",
                minLength: { value: 4, message: "Minimum length should be 4" },
              })}
            />
            <FormErrorMessage>
              {errors.link && errors.link.message}
            </FormErrorMessage>
          </FormControl>
          <Button
            mt={4}
            colorScheme="teal"
            isLoading={isSubmitting}
            type="submit"
          >
            Submit
          </Button>
        </Stack>
      </form>
    </Container>
  );
}
