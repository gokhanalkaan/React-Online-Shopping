import { React, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { publicRequest } from '../request'
import {
  useLocation,
  useNavigate,
  useSearchParams,
  Link,
} from 'react-router-dom'
import { useState } from 'react'
import { deleteAllProduct } from '../redux/cartRedux'

const Success = () => {
  // const {fav}=useSelector(state => state.favorites.products);
  const dispatch = useDispatch()
  let completed = false
  const { products, quantity, total } = useSelector((state) => state.cart)
  const currentUser = useSelector((state) => state.auth.currentUser)

  const [searchParams, setSearchParams] = useSearchParams()

  const [item, setItem] = useState(null)
  const navigate = useNavigate()
  var ranonce = false

  useEffect(() => {
    const getPaymentDetails = async () => {
      const res = await publicRequest.get(
        `orders/success?session_id=${searchParams.get('session_id')}`,
        { withCredentials: true, credentials: 'include' },
      )

      setItem(res)
    }

    getPaymentDetails()
  }, [])

  useEffect(() => {
    if (item !== null) {
      const createOrder = async () => {
        const userId = currentUser._id
        const orderItems = products.map((p) => ({
          productId: p._id,
          quantity: p.quantity,
          color: p.color,
          size: p.size,
          price: p.price,
          //shoeNumber:p.shoeNumber !=null ?p.shoeNumber:"",
          gender: p.gender,
          category: p.category != null ? p.category : [],
          img: p.img[0],
          productName: p.title,
        }))

        const adressDetails = {
          city: item.data.customer_details.address.city,
          country: item.data.customer_details.address.country,
          line1: item.data.customer_details.address.line1,
          line2: item.data.customer_details.address.line2,
          postalCode: item.data.customer_details.address.postalCode,
          state: item.data.customer_details.address.state,
        }
        const email = item.data.customer_details.email

        try {
          await publicRequest.post(
            'orders',
            { userId, orderItems, total, adressDetails, email, total },
            { withCredentials: true, credentials: 'include' },
          )
          dispatch(deleteAllProduct())
        } catch (e) {
          console.log(e)
        }
      }

      createOrder()
    }
  }, [item, currentUser._id])

  console.log(item)
  console.log(products)

  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <div
        style={{ display: 'flex', justifyContent: 'space-around', flex: '1' }}
      >
        <h1 style={{ color: 'green' }}>Succesfull</h1>
        <Link to={`/`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <button
            style={{
              backgroundColor: 'white',
              cursor: 'pointer',
              border: '2px solid black',
              width: '160px',
              height: '40px',
            }}
          >
            CONTINUE SHOPPING
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Success
