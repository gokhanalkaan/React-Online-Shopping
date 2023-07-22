import React from 'react'
import { useLocation } from 'react-router-dom'
import styled from '@emotion/styled'
import { useState, useEffect } from 'react'
import { popularProducts } from '../data'
import Product from '../components/Product'
import { publicRequest } from '../request'
import { integerPropType } from '@mui/utils'
import ClearIcon from '@mui/icons-material/Clear'

const Container = styled.div`
  margin-left: 0px;
`
const Title = styled.h1`
  margin: 20px;
`
const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const Filter = styled.div`
  margin: 20px;
  display: flex;
  align-items: center;
`

const FilterText = styled.span`
  font-size: 18px;
  font-weight: 600;
`
const Select = styled.select`
  padding: 20px;
  margin: 20px;
`
const Option = styled.option``

const ProductsContainer = styled.div`
  display: flex;
  align-items: center;

  flex-wrap: wrap;
`

const ProductList = () => {
  const location = useLocation()
  const cat = location.pathname.split('/')[2]

  const [filters, setFilters] = useState({})
  const [filteredProducts, setFilteredProducts] = useState([])
  const [products, setProducts] = useState([])
  const [sort, setSort] = useState('')
  const [sortDate, setSortDate] = useState('')

  useEffect(() => {
    const getProducts = async () => {
      setFilters({})

      if (cat) {
        /*  let val = []
          popularProducts.filter((item) =>
            Object.values(item).some((i) =>
              Array.isArray(i)
                ? i.some((arrVal) => arrVal === cat && val.push(item))
                : i === cat && val.push(item),
            ),
          )*/

        try {
          const res = await publicRequest.get(
            cat === 'man'
              ? `products?gender=men`
              : cat === 'woman'
              ? `products?gender=woman`
              : `products?category=${cat}`,
            { withCredentials: true, credentials: 'include' },
          )
          setProducts(res.data)
        } catch (error) {}
      } else {
        try {
          const res = await publicRequest.get('products')
          setProducts(res.data)
        } catch (error) {}
      }
    }

    getProducts()
  }, [cat])

  useEffect(() => {
    filters &&
      setFilteredProducts(
        products?.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value),
          ),
        ),
      )
  }, [filters, products])

  useEffect(() => {
    setFilteredProducts(
      sort === 'asc'
        ? filteredProducts.sort((a, b) => a.price - b.price)
        : filteredProducts.sort((a, b) => b.price - a.price),
    )
  }, [sort, filteredProducts])

  const handleFilters = (e) => {
    if (e.target.name === 'shoeNumber') {
      setFilters({
        ...filters,
        [e.target.name]: parseInt(e.target.value),
      })
    } else if (e.target.name === 'gender' && e.target.value === 'all') {
      setFilters({})
    } else {
      setFilters({
        ...filters,
        [e.target.name]: e.target.value,
      })
    }
  }

  console.log(cat)
  console.log(filteredProducts)

  console.log(filters)

  return (
    <div>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products :</FilterText>
          {cat !== 'man' && cat !== 'woman' && (
            <Select name="gender" onChange={handleFilters}>
              <Option selected={true} disabled>
                Gender
              </Option>
              <Option value="all">All</Option>
              <Option value="men">Men</Option>
              <Option value="woman">Woman</Option>
            </Select>
          )}
          <Select name="color" onChange={handleFilters}>
            <Option selected={true} disabled>
              Color
            </Option>
            <Option value="white">White</Option>
            <Option value="black">Black</Option>
            <Option value="red">Red</Option>
            <Option value="blue">Blue</Option>
            <Option value="yellow">Yellow</Option>
            <Option value="green">Green</Option>
            <Option value="gray">Gray</Option>
            <Option value="pink">Pink</Option>
            <Option value="orange">Orange</Option>
            <Option value="brown">Brown</Option>
          </Select>

          {cat === 'shoes' ? (
            <Select name="shoeNumber" onChange={handleFilters}>
              <Option selected={true} disabled>
                Number
              </Option>
              <Option value={35}>35</Option>
              <Option value={36}>36</Option>
              <Option value={37}>37</Option>
              <Option value={38}>38</Option>
              <Option value={39}>39</Option>
              <Option value={40}>40</Option>
              <Option value={41}>41</Option>
              <Option value={42}>42</Option>
              <Option value={43}>43</Option>
              <Option value={44}>44</Option>
              <Option value={45}>45</Option>
              <Option value={46}>46</Option>
              <Option value={47}>47</Option>
              <Option value={48}>48</Option>
              <Option value={49}>48</Option>
            </Select>
          ) : cat === 'clothes' ? (
            <Select name="size" onChange={handleFilters}>
              <Option selected={true} disabled>
                Size
              </Option>
              <Option value="XS">XS</Option>
              <Option value="S">S</Option>
              <Option value="M">M</Option>
              <Option value="L">L</Option>
              <Option value="XL">XL</Option>
            </Select>
          ) : (
            <div style={{ display: 'flex' }}>
              <Select name="size" onChange={handleFilters}>
                <Option selected={true} disabled>
                  Size
                </Option>
                <Option value="XS">XS</Option>
                <Option value="S">S</Option>
                <Option value="M">M</Option>
                <Option value="L">L</Option>
                <Option value="XL">XL</Option>
              </Select>
              <Select name="shoeNumber" onChange={handleFilters}>
                <Option selected={true} disabled>
                  Number
                </Option>
                <Option value={35}>35</Option>
                <Option value={36}>36</Option>
                <Option value={37}>37</Option>
                <Option value={38}>38</Option>
                <Option value={39}>39</Option>
                <Option value={40}>40</Option>
                <Option value={41}>41</Option>
                <Option value={42}>42</Option>
                <Option value={43}>43</Option>
                <Option value={44}>44</Option>
                <Option value={45}>45</Option>
                <Option value={46}>46</Option>
                <Option value={47}>47</Option>
                <Option value={48}>48</Option>
                <Option value={49}>48</Option>
              </Select>
            </div>
          )}
        </Filter>

        {Object.keys(filters).length > 0 && (
          <div
            onClick={() => {
              setFilters({})
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              color: 'red',
              cursor: 'pointer',
            }}
          >
            <ClearIcon />
            <span> Clear all filters</span>
          </div>
        )}
        <Filter>
          <FilterText>Sort Products :</FilterText>
          <Select
            onChange={(e) => {
              setSort(e.target.value)
            }}
          >
            <Option selected disabled>
              {' '}
              Price{' '}
            </Option>

            <Option value="asc">Ascending</Option>
            <Option value="desc">Descending</Option>
          </Select>
        </Filter>
      </FilterContainer>

      <ProductsContainer>
        {(cat || products) & (filteredProducts.length === 0)
          ? products?.map((p) => <Product product={p} key={p._id} />)
          : filteredProducts?.map((p) => <Product product={p} key={p._id} />)}
      </ProductsContainer>
    </div>
  )
}

export default ProductList
