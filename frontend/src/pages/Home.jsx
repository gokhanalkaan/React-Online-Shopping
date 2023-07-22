import React from 'react'
import Category from '../components/Category'
import FeaturedProducts from '../components/FeaturedProducts'
import Slider from '../components/Slider'


const Home = () => {
  return (
    <div>
      <Slider/>
      <Category />
      <FeaturedProducts title={"Popular Products"}/>
     <FeaturedProducts title={"New Products"}/>
  
    </div>
  )
}

export default Home