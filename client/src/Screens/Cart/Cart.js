import React from 'react'
import { selectitems } from '../../Redux/Slices/ItemsSlice'
import { useSelector } from 'react-redux'

const Cart = () => {
    
    const data = useSelector(selectitems)
    const filtereddata = data.slice(1)
    const totalPrice = filtereddata.reduce((acc, itemArray) => {
        return acc + itemArray.reduce((subtotal, food) => subtotal + food.finalprice, 0);
      }, 0);
  return (
    <>
    
         <div className='container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md' >
        <table className='bg-success table table-hover '>
          <thead className=' text-success fs-4'>
            <tr >
              <th  style={{backgroundColor:"grey"}} scope='col' >#</th>
              <th  style={{backgroundColor:"grey"}} scope='col' >Name</th>
              <th  style={{backgroundColor:"grey"}} scope='col' >Quantity</th>
              <th  style={{backgroundColor:"grey"}} scope='col' >Option</th>
              <th  style={{backgroundColor:"grey"}} scope='col' >Amount</th>
              <th  style={{backgroundColor:"grey"}} scope='col' ></th>
            </tr>
          </thead>
          <tbody className='text-success'>
          {filtereddata && filtereddata.map((itemArray, index) => (
            itemArray.map((food, subIndex) => (
              <tr key={subIndex}>
                <th style={{backgroundColor:"grey"}} scope='row'>{index + 1}</th>
                <td style={{backgroundColor:"grey"}} >{food.name}</td>
                <td style={{backgroundColor:"grey"}} >{food.category}</td>
                <td style={{backgroundColor:"grey"}} >{food.quantity}</td>
                <td style={{backgroundColor:"grey"}} >{food.finalprice}</td>
                <td style={{backgroundColor:"grey"}}>
                  <button  type="button" className="btn p-0">delete</button>
                </td>
              </tr>
            ))
          ))}
          
        </tbody>
        </table>
        <div><h1 className='text-white fs-2'>Total Price: {totalPrice}</h1></div>
        <div>
          <button className='btn bg-success mt-5 ' onClick={""} > Check Out </button>
        </div>
      </div>



    
    </>
  )
}

export default Cart