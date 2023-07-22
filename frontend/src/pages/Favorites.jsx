import React from 'react'
import styled from '@emotion/styled'
import Product from '../components/Product'
import { useSelector } from 'react-redux'

const ProductsContainer = styled.div`
  display: flex;
  align-items: center;

  flex-direction: column;
`

const Favorites = () => {
  const { products } = useSelector((state) => state.favorites)

  return (
    <ProductsContainer>
      {products.map((p) => (
        <Product key={p._id} product={p} />
      ))}
    </ProductsContainer>
  )
}

export default Favorites
