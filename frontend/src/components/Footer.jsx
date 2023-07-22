import React from 'react'
import styled from '@emotion/styled'
import { Facebook } from '@mui/icons-material'
import { Instagram } from '@mui/icons-material'
import { Twitter, Room, MailOutline, Phone } from '@mui/icons-material'
import { Divider } from '@mui/material'

const Container = styled.div`
  display: flex;

  padding: 20px;

  margin: 0px 10px;
  background-color: white;
`

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`
const Center = styled.div`
  flex: 1;
  padding: 20px;
`
const Title = styled.h3`
  margin-bottom: 30px;
`

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
`

const Right = styled.div`
  flex: 1;
  padding: 20px;
`

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`

const Payment = styled.img`
  width: 50%;
`

const Logo = styled.h1``

const Description = styled.p`
  margin: 20px 0px;
`

const SocialContainer = styled.div`
  display: flex;
`

const SocialIcon = styled.div`
  cursor: pointer;
  margin-right: 20px;
`

const Footer = () => {
  return (
    <div style={{ marginTop: '100px' }}>
      <hr />
      <Container>
        <Left>
          <Logo>SHOPPY</Logo>
          <Description>
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form, by injected
            humour, or randomised words which don’t look even slightly
            believable.
          </Description>
          <SocialContainer>
            <SocialIcon>
              <Facebook />
            </SocialIcon>

            <SocialIcon>
              <Instagram />
            </SocialIcon>

            <SocialIcon>
              <Twitter />
            </SocialIcon>
          </SocialContainer>
        </Left>
        <Center>
          <Title>Useful Links</Title>

          <List>
            <ListItem>Home</ListItem>
            <ListItem>Cart</ListItem>
            <ListItem>Man Fashion</ListItem>
            <ListItem>Woman Fashion</ListItem>
            <ListItem>Accessories</ListItem>
            <ListItem>My Account</ListItem>
            <ListItem>Order Tracking</ListItem>
            <ListItem>Wishlist</ListItem>
            <ListItem>Wishlist</ListItem>
            <ListItem>Terms</ListItem>
          </List>
        </Center>
        <Right>
          <Title>Contact</Title>
          <ContactItem>
            <Room style={{ marginRight: '10px' }} /> 622 Dixie Path , South
            Tobinchester 98336
          </ContactItem>
          <ContactItem>
            <Phone style={{ marginRight: '10px' }} /> +99 999 99 99
          </ContactItem>
          <ContactItem>
            <MailOutline style={{ marginRight: '10px' }} /> contact@contact.com
          </ContactItem>
          <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
        </Right>
      </Container>
    </div>
  )
}

export default Footer
