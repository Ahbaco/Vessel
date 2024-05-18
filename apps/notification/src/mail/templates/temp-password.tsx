import { Body, Container, Head, Html, Tailwind, Text } from "@react-email/components";
import * as React from "react";

export default function TempPassword({ password }: { password: string }) {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="bg-white my-auto px-2">
          <Container>
            <Text className="text-3xl">Tu password: {password}</Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
