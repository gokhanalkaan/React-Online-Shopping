import { React, useEffect, useState } from 'react'

import styled from 'styled-components'
import { Add, Remove } from '@mui/icons-material'

import { popularProducts } from '../data'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { loadStripe } from '@stripe/stripe-js'
import { publicRequest } from '../request'
import { Divider } from '@mui/material'
import Order from '../components/Order'
const Container = styled.div``

const Wrapper = styled.div`
  padding: 10px;
`

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
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

const Title = styled.h2`
  font-weight: 300;
  text-align: center;
`

const Orders = () => {
  const navigate = useNavigate()
  const currentUser = useSelector((state) => state.auth.currentUser)
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const getUserOrders = async () => {
      const res = await publicRequest.get('orders/find/' + currentUser._id, {
        withCredentials: true,
        credentials: 'include',
      })

      if (res) {
        setOrders(res.data)
      }
    }

    getUserOrders()
  }, [])

  //console.log(products);

  return (
    <Container>
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <TopButton onClick={() => navigate('/')}>CONTINUE SHOPPING</TopButton>
          <TopTexts>
            <TopText>Your Orders({orders.length})</TopText>
          </TopTexts>
        </Top>
        <Bottom>
          <Info>
            {orders.map((order, index) => (
              <Order order={order} key={index} />
            ))}
          </Info>
        </Bottom>
      </Wrapper>
    </Container>
  )
}

export default Orders
