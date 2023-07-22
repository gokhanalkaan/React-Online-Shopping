import React from 'react'

import styled from '@emotion/styled'
import { ArrowLeftOutlined } from '@mui/icons-material'
import { ArrowRightOutlined } from '@mui/icons-material'

import { headerPhotos } from '../data'
import { useState, useEffect } from 'react'

const Container = styled.div`
  height: calc(100vh);
  width: 100vw;

  overflow: hidden;

  display: flex;
  flex-direction: column;
  align-items: 'center';
`

const Wrapper = styled.div`
  display: flex;

  transform: translateX(${(props) => props.sliderIndex * -100}vw);
  transition: all 1.5s ease;

  width: 300vw;
  height: 80%;
`

const Slide = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`

const ImageContainer = styled.img`
  width: 100vw;
  height: 100%;

  object-fit: cover;
`

const HeaderContainer = styled.h1`
  position: absolute;
`

const CircleButton = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  border: 1px solid gray;
  cursor: pointer;
  background-color: ${(props) =>
    props.gray === true ? 'gray' : 'transperent'};
  margin-right: 5px;
  z-index: 5;
`

const Slider = () => {
  const [sliderIndex, setSliderIndex] = useState(0)

  useEffect(() => {
    setTimeout(() => setSliderIndex((prev) => (prev < 2 ? prev + 1 : 0)), 6500)

    return () => {}
  }, [sliderIndex])

  return (
    <Container>
      <Wrapper sliderIndex={sliderIndex}>
        {headerPhotos.map((p, index) => (
          <Slide key={p}>
            <HeaderContainer>Discount</HeaderContainer>
            <ImageContainer src={p} />
          </Slide>
        ))}
      </Wrapper>
      <div
        style={{
          display: 'flex',
          width: '100%',
          justifyContent: 'center',
          transition: 'all 0.5s ease',
        }}
      >
        {headerPhotos.map((p, index) =>
          sliderIndex === index ? (
            <CircleButton gray={true} key={index} />
          ) : (
            <CircleButton gray={false} key={index} />
          ),
        )}
      </div>
    </Container>
  )
}

export default Slider
