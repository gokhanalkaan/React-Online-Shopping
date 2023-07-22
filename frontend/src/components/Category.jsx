import React from 'react'
import { Link } from 'react-router-dom'

import styled from '@emotion/styled'

const Container = styled.div`
  position: relative;

  display: flex;
  margin-top: 12px;
`

const CategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  margin-right: 5px;

  flex: 1;
`

const Image = styled.img`
  height: 100%;
  width: 100%;
  object-fit: contain;
`

const CategoryTitle = styled.h1`
  position: absolute;
  top: 2;
  left: 2;
`

const Button = styled.button`
  background-color: transparent;
  cursor: pointer;
  position: absolute;
  top: calc(50%);
  left: calc(50%);

  padding: 30px;
`

const Category = () => {
  return (
    <Container>
      <CategoryContainer>
        <Image src="https://images.pexels.com/photos/157675/fashion-men-s-individuality-black-and-white-157675.jpeg?auto=compress&cs=tinysrgb&w=600" />
        <CategoryTitle>Man Style</CategoryTitle>
        <Link to={'/products/man'}>
          <Button style={{ border: '1px solid #5e5546', color: '#beb6aa' }}>
            SHOP NOW!
          </Button>
        </Link>
      </CategoryContainer>
      <CategoryContainer>
        <Image src="https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=600" />
        <CategoryTitle>Woman Style</CategoryTitle>
        <Link to={'/products/woman'}>
          <Button style={{ border: '1px solid #e38810', color: '#f4bd6b' }}>
            SHOP NOW!
          </Button>
        </Link>
      </CategoryContainer>
    </Container>
  )
}

export default Category
