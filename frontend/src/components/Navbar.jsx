import { ShoppingCartOutlined } from '@mui/icons-material'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined'
import { Search } from '@mui/icons-material'
import { Badge } from '@mui/material'
import React from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { publicRequest } from '../request'
import { logOut } from '../redux/authRedux'

const Container = styled.div`
  height: 60px;
  margin-bottom: 12px;
`

const Wrapper = styled.div`
  padding: 10px 20px;

  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Left = styled.div`
  width: 33.33%;
  flex: 1;
  display: flex;
  align-items: center;
`

const Category = styled.span`
  font-size: 18px;
  cursor: pointer;
  margin-right: 5px;

  &:hover {
    color: #66b8ff;
  }
`

const SearchContainer = styled.div`
  border: 1px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`

const Input = styled.input`
  border: none;
  outline: none;
`

const Center = styled.div`
  width: 33.33%;
  flex: 1;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`

const Logo = styled.h1`
  font-weight: bold;
  text-align: center;
`

const Right = styled.div`
  width: 33.33%;
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
`

const Navbar = () => {
  const user = useSelector((state) => state.auth.currentUser)

  const dispatch = useDispatch()
  const { quantity } = useSelector((state) => state.cart)
  const { count } = useSelector((state) => state.favorites)
  const handleSignOut = async () => {
    await publicRequest.post(
      'auth/logOut',
      {},
      { withCredentials: true, credentials: 'include' },
    )
    dispatch(logOut())
  }

  return (
    <Container>
      <Wrapper>
        <Left>
          <Link to={'/'} style={{ textDecoration: 'none', color: 'inherit' }}>
            <Logo>Shoppy.</Logo>
          </Link>
        </Left>
        <Center>
          <Link
            to={'/products'}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <Category>All Products</Category>
          </Link>
          <Link
            to={'/products/man'}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <Category>Men</Category>
          </Link>
          <Link
            to={'/products/woman'}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <Category>Woman</Category>
          </Link>
          <Link
            to={'/products/child'}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <Category>Child</Category>
          </Link>
          <Link
            to={'/products/clothes'}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <Category>Clothes</Category>
          </Link>
          <Link
            to={'/products/shoes'}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <Category>Shoes</Category>
          </Link>
        </Center>
        <Right>
          {user ? (
            <MenuItem onClick={handleSignOut}>SIGNOUT</MenuItem>
          ) : (
            <>
              <Link
                to={'/register'}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <MenuItem>REGISTER</MenuItem>
              </Link>
              <Link
                to={'/login'}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <MenuItem>SIGNIN</MenuItem>
              </Link>
            </>
          )}

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Link
              to={'/favorites'}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <MenuItem>
                <Badge badgeContent={count} color="primary">
                  <FavoriteBorderIcon />
                </Badge>
              </MenuItem>
            </Link>
            {user && (
              <Link
                to={'/cart'}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <MenuItem>
                  <Badge badgeContent={quantity} color="primary">
                    <ShoppingCartOutlined />
                  </Badge>
                </MenuItem>
              </Link>
            )}
            {user && (
              <Link
                to={'/orders'}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <MenuItem>
                  <Badge color="primary">
                    <LocalShippingOutlinedIcon />
                  </Badge>
                </MenuItem>
              </Link>
            )}
          </div>
        </Right>
      </Wrapper>
    </Container>
  )
}

export default Navbar
