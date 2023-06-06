import React from "react";
import {
Box,
Container,
Row,
P,
Column,
FooterLink,
Heading,
} from "./FooterStyles";
import Copyright from './Copyright'

export default function Footer() {
return (
	<Box>
    <Container>
      <Row>
        <Column>
          <Heading>About Us</Heading>
          <FooterLink href="#">Aim</FooterLink>
        </Column>
        <Column>
          <Heading>Contact Us</Heading>
          <FooterLink href="#">Jared Enck</FooterLink>
        </Column>        
      </Row>
      <P>
        <Copyright />
      </P>
    </Container>
	</Box>
);
};
