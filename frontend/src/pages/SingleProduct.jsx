import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'

import { Remove, Add } from '@mui/icons-material'
import { useLocation } from 'react-router'
import { useNavigate } from 'react-router-dom'
import { publicRequest } from '../request'

import { popularProducts } from '../data'
import { useDispatch } from 'react-redux'
import { addProduct } from '../redux/cartRedux'

const Container = styled.div`
  display: flex;
`

const Wrapper = styled.div`
  padding: 50px;
  display: flex;

  flex: 8;
`

const ImagesContainer = styled.div`
  flex: 1;
  margin-left: 10px;
  display: flex;
  flex-direction: column;
`

const SmallImage = styled.img`
  height: 120px;

  width: 100%;
  border: none;

  object-fit: contain;
`

const ImageContainer = styled.div`
  flex: 4;
`

const Title = styled.h2`
  font-weight: 300;
`

const Desc = styled.p`
  margin: 20px 0px;
`

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`

const InfoContainer = styled.div`
  flex: 1;

  padding: 0px 20px;
`

const Select = styled.select`
  padding: 20px;
  margin: 20px;

  //width: 300px;
`
const Option = styled.option``

const Image = styled.img`
  height: 90vh;
  width: 100%;

  object-fit: contain;
`
const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 70%;
  margin: 30px 0px;
`
const Filter = styled.div`
  padding: 20px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 300;
`

const FilterColor = styled.div`
  margin-left: 3px;
  width: 20px;
  height: 20px;
  border: 1px solid black;
  border-radius: 50%;
  background-color: ${(props) => props.color};

  cursor: pointer;
`
const AmountContainer = styled.div`
  display: flex;

  align-items: center;
  font-weight: 700;

  width: 70%;
`

const Amount = styled.span`
  height: 35px;
  width: 35px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
`

const AddContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`

const AddButton = styled.button`
  margin-top: 20px;
  width: 100%;
  padding: 20px;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  border: 2px solid teal;
  &:hover {
    background-color: aliceblue;
  }
`

const SingleProduct = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const productId = location.pathname.split('/')[2]
  const [product, setProduct] = useState({})
  const [color, setColor] = useState('')
  const [size, setSize] = useState('')
  const [shoeNumber, setShoeNumber] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [imageIndex, setImageIndex] = useState(0)
  const dispatch = useDispatch()
  // const [image,setImage]=useState([product.img ?[...product?.img]:[]]);

  const imageRef = useRef()

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get('products/find/' + productId, {
          withCredentials: true,
          credentials: 'include',
        })
        setProduct(res.data)
      } catch (e) {
        console.log(e)
      }
    }

    getProduct()
  }, [productId])

  const handleQuantity = (value) => {
    if (value === 'dec') {
      setQuantity(quantity === 1 ? 1 : quantity - 1)
    } else {
      setQuantity(quantity + 1)
    }
  }

  const handleAddToCart = () => {
    dispatch(addProduct({ ...product, color, size, shoeNumber, quantity }))

    navigate('/cart')
  }

  const handleZoom = () => {
    imageRef.current.width = imageRef.current.width * 2
    imageRef.current.height = imageRef.current.height * 2
  }

  // console.log(image);

  return (
    <div>
      <Container>
        <ImagesContainer>
          {product?.img?.map((img, index) =>
            imageIndex === index ? (
              <div
                style={{
                  border: '2px solid blue',
                  marginBottom: '10px',
                  alignContent: 'center',
                  padding: '0px',
                }}
              >
                <SmallImage
                  onClick={() => setImageIndex(index)}
                  key={index}
                  src={img}
                ></SmallImage>
              </div>
            ) : (
              <SmallImage
                onClick={() => setImageIndex(index)}
                key={index}
                src={img}
              ></SmallImage>
            ),
          )}
        </ImagesContainer>

        <Wrapper>
          <ImageContainer onClick={handleZoom} ref={imageRef}>
            <Image src={product.img?.[imageIndex]} />
          </ImageContainer>
          <InfoContainer>
            <Title>{product?.title}</Title>
            <Desc>{product?.desc}</Desc>
            <Price>$ {product.price}</Price>
            <FilterContainer>
              <Filter>
                <FilterTitle>Color</FilterTitle>
                {product.color?.map((color) => (
                  <FilterColor
                    onClick={() => setColor(color)}
                    color={color}
                    key={color}
                  />
                ))}
              </Filter>

              <Filter>
                {product.shoeNumber?.length == 0 ? (
                  <Select onChange={(e) => setSize(e.target.value)}>
                    <Option disabled selected>
                      Size
                    </Option>
                    {product.size?.map((size) => (
                      <Option key={size}> {size} </Option>
                    ))}
                  </Select>
                ) : (
                  <Select onChange={(e) => setShoeNumber(e.target.value)}>
                    <Option disabled selected>
                      Number
                    </Option>
                    {product.shoeNumber?.map((shoeNumber) => (
                      <Option key={shoeNumber}> {shoeNumber} </Option>
                    ))}
                  </Select>
                )}
              </Filter>
            </FilterContainer>

            <AddContainer>
              <AmountContainer>
                <Remove onClick={() => handleQuantity('dec')} />
                <Amount>{quantity}</Amount>
                <Add onClick={() => handleQuantity('inc')} />
              </AmountContainer>

              <AddButton onClick={handleAddToCart}>Add To Cart</AddButton>
            </AddContainer>
          </InfoContainer>
        </Wrapper>
      </Container>
    </div>
  )
}

export default SingleProduct
