import { React, useEffect, useState } from 'react'
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined'
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined'

import styled from 'styled-components'
import { Add, Remove } from '@mui/icons-material'

import { popularProducts } from '../data'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { loadStripe } from '@stripe/stripe-js'
import { publicRequest } from '../request'
import { Divider } from '@mui/material'
const Container = styled.div``

const Wrapper = styled.div`
  padding: 10px;
`

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === 'filled' && 'none'};
  background-color: ${(props) =>
    props.type === 'filled' ? 'black' : 'transparent'};
  color: ${(props) => props.type === 'filled' && 'white'};
`

const TopTexts = styled.div`
  display: flex;
  align-items: center;
`

const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`

const Info = styled.div`
  flex: 3;
`

const ShoppingCartProduct = styled.div`
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  //justify-content: center;

  //align-items: center;
  position: relative;

  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
`
const ProductDetail = styled.div`
  display: flex;
  align-items: center;
`

const Image = styled.img`
  width: 200px;
`
const Details = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
`
const ProductName = styled.span``
const ProductId = styled.span``
const ProductColor = styled.div`
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`
const ProductSize = styled.span``

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  //align-items: center;
  justify-content: space-between;
  flex-direction: column;
`

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
`

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
`

const Title = styled.h2`
  font-weight: 300;
  text-align: center;
`

const Order = ({ order }) => {
  const [opened, setOpened] = useState(false)

  console.log(order)

  return (
    <Info>
      {
        <ShoppingCartProduct>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}
          >
            <Details>
              <ProductName>
                <b>OrderId:</b> {order._id}
              </ProductName>
            </Details>

            <PriceDetail>
              <ProductAmountContainer>
                <ProductAmount>{order.orderStatutus}</ProductAmount>
              </ProductAmountContainer>
              <ProductPrice>${order.total}</ProductPrice>
            </PriceDetail>

            {opened === false ? (
              <KeyboardArrowDownOutlinedIcon
                onClick={() => setOpened(true)}
                fontSize="large"
              />
            ) : (
              <KeyboardArrowUpOutlinedIcon
                onClick={() => setOpened(false)}
                fontSize="large"
              />
            )}
          </div>

          {opened &&
            order.orderItems.map((product, index) => (
              <>
                <Divider />

                <ProductDetail>
                  <Link
                    to={`/product/${product._id}`}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <Image src={product.img} />
                  </Link>

                  <Details>
                    <h2>Product Details</h2>
                    <Link
                      to={`/product/${product._id}`}
                      style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                      <ProductName>
                        <b>Product:</b> {product.productName}
                      </ProductName>
                    </Link>
                    <ProductId>
                      <b>ID:</b> {product.productId}
                    </ProductId>
                    <ProductColor color={product.color?.[0]} />
                    <ProductSize>
                      <b>Size:</b>
                      {product.size?.[0]}
                    </ProductSize>
                    <ProductSize>
                      <b>Quantity:</b>
                      {product.quantity}
                    </ProductSize>
                    <ProductSize>
                      <b>Amount:</b>
                      {product.quantity * product.price}
                    </ProductSize>
                  </Details>

                  <Details>
                    <h2>Adress Details</h2>

                    <ProductName>
                      <b>Country:</b> {order.adressDetails?.country}
                    </ProductName>

                    <ProductSize>
                      <b>State:</b>
                      {order.adressDetails?.state}
                    </ProductSize>
                    <ProductId>
                      <b>City:</b> {order.adressDetails?.city}
                    </ProductId>

                    <ProductSize>
                      <b>Adress1:</b>
                      {order.adressDetails?.line1}
                    </ProductSize>
                    <ProductSize>
                      <b>Adress2:</b>
                      {order.adressDetails?.line2}
                    </ProductSize>
                  </Details>
                </ProductDetail>
              </>
            ))}
        </ShoppingCartProduct>
      }
    </Info>
  )
}

export default Order
