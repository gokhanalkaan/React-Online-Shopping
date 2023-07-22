import React, { useReducer } from 'react'
import styled from '@emotion/styled'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { Link } from 'react-router-dom'

import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { favoriteProduct } from '../redux/favoritesRedux'
import { unfavoriteProduct } from '../redux/favoritesRedux'
import '../syle/product.css'

const ProductContainer = styled.div`
  position: relative;

  width: 350px;

  margin-top: 15px;

  margin-right: 10px;

  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;

  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`

const ProductImageContainer = styled.div`
  flex: 2;

  width: 100%;
  height: 300px;

  overflow: hidden;

  &:hover {
    .secondImg {
      z-index: 2;
    }
  }
`

const ProductImage = styled.img`
  height: 80%;

  width: 100%;

  object-fit: contain;
  cursor: pointer;

  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
`

const ProductInfo = styled.div`
  flex: 1;
  height: calc(100%-400px);
  margin-bottom: 0px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Product = ({ product }) => {
  const { products } = useSelector((state) => state.favorites)
  const dispatch = useDispatch()

  const foundedProduct = products.find((p) => p._id === product._id)
  console.log(product)

  return (
    <ProductContainer>
      <Link
        to={`/product/${product._id}`}
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        <ProductImageContainer>
          {product.img.map(
            (p, index) =>
              p !== null && (
                <ProductImage
                  className={
                    index === 0
                      ? 'firstImg'
                      : index === 1
                      ? 'secondImg'
                      : 'thirdImg'
                  }
                  src={p}
                />
              ),
          )}
        </ProductImageContainer>
      </Link>
      <ProductInfo>
        <Link
          to={`/product/${product._id}`}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <h2 style={{ fontSize: '20px', marginLeft: '5px' }}>
            {product.title}
          </h2>
        </Link>
        <span style={{ color: 'gray', marginRight: '5px' }}>
          {product.price}$
        </span>
        {product.desc && <p>{product.desc}</p>}
      </ProductInfo>
      {foundedProduct ? (
        <div onClick={() => dispatch(unfavoriteProduct(product._id))}>
          <FavoriteBorderIcon
            style={{
              position: 'absolute',
              top: 2,
              right: 2,
              cursor: 'pointer',
              color: 'red',
              zIndex: '4',
            }}
          />
        </div>
      ) : (
        <div onClick={() => dispatch(favoriteProduct(product))}>
          <FavoriteBorderIcon
            style={{
              position: 'absolute',
              top: 2,
              right: 2,
              cursor: 'pointer',
              zIndex: '4',
            }}
          />
        </div>
      )}
    </ProductContainer>
  )
}

export default Product
