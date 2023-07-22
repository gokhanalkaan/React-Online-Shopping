import React from 'react'
import styled from '@emotion/styled'
import { ArrowLeftOutlined } from '@mui/icons-material'
import { ArrowRightOutlined } from '@mui/icons-material'
import { useState, useEffect } from 'react'
import { headerPhotos, popularProducts } from '../data'

import Product from './Product'
import { publicRequest } from '../request'
const Container = styled.div`
  height: 350px;
  width: 100%;
  margin-left: 20px;

  margin-top: 5px;
  overflow: hidden;
  display: flex;
  align-items: center;
`
const Wrapper = styled.div`
  display: flex;
  height: 100%;

  transform: translateX(${(props) => props.sliderIndex * -385}px);
  transition: all 1.5s ease;
`

const Arrow = styled.div`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  background-color: transparent;
  position: absolute;

  background-color: #fff6f6;
  opacity: 0.5;
  border: 1px solid blue;
  z-index: 2;
  cursor: pointer;
`

const FeaturedProducts = ({ title }) => {
  const [sliderIndex, setSliderIndex] = useState(0)
  const [products, setProducts] = useState([])

  useEffect(() => {
    const getProducts = async () => {
      const res =
        title === 'Popular Products'
          ? await publicRequest.get('/products/popularProducts')
          : await publicRequest.get('/products?newest=true')
      if (res != null) {
        setProducts(res.data)
        console.log(res.data)
      }
    }

    getProducts()
  }, [title])

  console.log('products' + title + products[0])
  return (
    <div style={{ marginTop: '15px' }}>
      <h1 style={{ marginLeft: '15px' }}>{title}</h1>
      <Container>
        {sliderIndex !== 0 && (
          <Arrow
            onClick={() => setSliderIndex((prev) => (prev > 2 ? prev - 2 : 0))}
            style={{ left: '25px' }}
          >
            <ArrowLeftOutlined
              style={{
                height: '40px',
                width: '40px',
              }}
            />
          </Arrow>
        )}
        <Wrapper sliderIndex={sliderIndex}>
          {products.map((p) => (
            <Product key={p._id} product={p} />
          ))}
        </Wrapper>
        {sliderIndex < 4 && (
          <Arrow
            onClick={() => setSliderIndex((prev) => (prev < 4 ? prev + 2 : 4))}
            style={{ right: '5px' }}
          >
            <ArrowRightOutlined
              style={{
                height: '40px',
                width: '40px',
              }}
            />
          </Arrow>
        )}
      </Container>
    </div>
  )
}

export default FeaturedProducts
