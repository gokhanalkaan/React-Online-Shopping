import React from 'react'

import styled from 'styled-components'
import { Add, Remove } from '@mui/icons-material'
import DeleteIcon from '@mui/icons-material/Delete'
import { popularProducts } from '../data'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  increseProductQuantity,
  decreaseProductQuantity,
  deleteProduct,
} from '../redux/cartRedux'
import { loadStripe } from '@stripe/stripe-js'
import { paymentRequest, publicRequest } from '../request'
const Container = styled.div``

const Wrapper = styled.div`
  padding: 10px;
`

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 60vw;
`

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === 'filled' && 'none'};
  background-color: ${(props) =>
    props.type === 'filled' ? 'black' : 'transparent'};
  color: ${(props) => props.type === 'filled' && 'white'};
  flex: 1;
`

const TopTexts = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  flex: 3;
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
  align-items: center;
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
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

const Summary = styled.div`
  flex: 1;
  height: 50vh;

  margin-left: 20px;
  border: 0.5px solid lightgray;
  border-radius: 10px;
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

const SummaryTitle = styled.h1`
  font-weight: 200;
`
const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === 'total' && '500'};
  font-size: ${(props) => props.type === 'total' && '24px'};
`
const SummaryItemText = styled.span``
const SummaryItemPrice = styled.span``
const Button = styled.button`
  width: 100%;
  background-color: orange;
  padding: 10px;
  color: white;
  font-weight: 600;
  border: none;
  cursor: pointer;
`

const DeleteDiv = styled.div`
  position: absolute;
  top: 3px;
  right: 0px;
`

const ShoppingCart = () => {
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const { products, quantity, total } = useSelector((state) => state.cart)
  const { favCount } = useSelector((state) => state.favorites.count)

  console.log(products)

  const handlePayment = async () => {
    if (products.length > 0) {
      try {
        await paymentRequest
          .post(
            'create-checkout-session',
            { products },
            { withCredentials: true, credentials: 'include' },
          )
          .then((res) => {
            console.log(res.data)
            if (res) {
              window.location.href = res.data.url
            }
          })
      } catch (err) {
        console.log(err)
      }
    } else return
  }
  const handleQuantity = (value, index) => {
    if (value === 'inc') {
      console.log('increase')
      dispatch(increseProductQuantity(index))
    } else {
      products[index].quantity > 1 && dispatch(decreaseProductQuantity(index))
    }
  }
  return (
    <Container>
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <TopButton onClick={() => navigate('/')}>CONTINUE SHOPPING</TopButton>
          <TopTexts>
            <TopText>Shopping Bag ({quantity})</TopText>
            <TopText>Your Wishlist({favCount})</TopText>
          </TopTexts>
        </Top>
        <Bottom>
          <Info>
            {products.map((product, index) => (
              <ShoppingCartProduct key={product._id}>
                <DeleteDiv onClick={() => dispatch(deleteProduct(product._id))}>
                  <DeleteIcon />
                </DeleteDiv>
                <ProductDetail>
                  <Link
                    to={`/product/${product._id}`}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <Image src={product.img?.[0]} />
                  </Link>

                  <Details>
                    <Link
                      to={`/product/${product._id}`}
                      style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                      <ProductName>
                        <b>Product:</b> {product.title}
                      </ProductName>
                    </Link>
                    <ProductId>
                      <b>ID:</b> {product.id}
                    </ProductId>
                    <ProductColor color={product.color?.[0]} />
                    <ProductSize>
                      <b>Size:</b>
                      {product.size?.[0]}
                    </ProductSize>
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmountContainer>
                    <Add onClick={() => handleQuantity('inc', index)} />
                    <ProductAmount>{product.quantity}</ProductAmount>
                    <Remove onClick={() => handleQuantity('dec', index)} />
                  </ProductAmountContainer>
                  <ProductPrice>
                    ${product.quantity * product.price}
                  </ProductPrice>
                </PriceDetail>
              </ShoppingCartProduct>
            ))}
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal:</SummaryItemText>
              <SummaryItemPrice>$ {total}</SummaryItemPrice>
            </SummaryItem>

            <SummaryItem>
              <SummaryItemText>Estimated Shipping:</SummaryItemText>
              <SummaryItemPrice>$ 7</SummaryItemPrice>
            </SummaryItem>

            <SummaryItem type="total">
              <SummaryItemText>Total:</SummaryItemText>
              <SummaryItemPrice>
                {' '}
                ${products.length > 0 ? total - 7 : 0}{' '}
              </SummaryItemPrice>
            </SummaryItem>
            <Button onClick={handlePayment}>SHOP NOW !</Button>
          </Summary>
        </Bottom>
      </Wrapper>
    </Container>
  )
}

export default ShoppingCart
