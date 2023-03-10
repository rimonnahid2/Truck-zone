import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import BookNowModal from '../../../dashboard/Products/BookNowModal/BookNowModal';
import ConfrimAlert from '../../../dashboard/utilities/ConfirmAlert/ConfrimAlert';

const ProductCard = ({ product }) => {
  const [productSeller, setProductSeller] = useState({});
  const [booking, setBooking] = useState('')
  const [report, setReport] = useState('')

  const { name, sellPrice, category, brand, mileage, fuelType, addDate, transmission, productThumbnail, sellerName, sellerId } = product;

  useEffect(() => {
    fetch(`https://track-zone-server.vercel.app/user/${sellerId}`)
      .then(res => res.json())
      .then(result => {
        setProductSeller(result)
      })
      .catch(err => console.error(err))
  }, [sellerId])

  const handleReport = (product) => {
    fetch(`https://track-zone-server.vercel.app/product/report-product/${product._id}`, {
      method: "PUT"
    })
      .then(res => res.json())
      .then(data => {
        if (data.modifiedCount > 0) {
          toast.success(`${product.name} Reported`)
        }
      })
      .catch(err => {
        console.error(err.message)
        toast.error('Something happened wrong!')
      })
  }

  return (
    <>
      <div className="col-span-12 md:col-span-6 lg:col-span-3">

        <div className="w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
          <img className="object-cover object-center w-full h-56" src={productThumbnail} alt={name} />

          <div className="px-4 py-4">
            <div className='flex justify-between text-sm font-semibold'>
              <span className='text-sm'>{brand}</span>
              <span className=' text-gray-600'>{category}</span>
            </div>
            <h1 className="text-xl font-bold text-[#f06425] dark:text-white">{name}</h1>
            <p className='text-dark font-bold'>${sellPrice} {product?.originalPrice && <span className='font-light line-through text-[#f06425]'>${product?.originalPrice}</span>}</p>

            <div className='flex justify-between text-gray-400 text-sm font-semibold'>
              <span className='text-gray-700 text-sm font-bold flex gap-1'>
                By {sellerName}
                {productSeller.verified && <FaCheckCircle className='text-[#f06425]'></FaCheckCircle>}
              </span>
              <label htmlFor={`ConfirmReport${product._id}`} onClick={() => setReport(product)} className='badge gap-1 text-white cursor-pointer'><FaExclamationTriangle></FaExclamationTriangle> Report</label>
            </div>

            <div className="flex items-center justify-between mx-5">
              <div className="flex flex-col items-center mt-4 text-gray-400 dark:text-gray-200">
                <svg style={{ width: '1.2em', height: '1.2em' }} focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="SpeedIcon"><path d="m20.38 8.57-1.23 1.85a8 8 0 0 1-.22 7.58H5.07A8 8 0 0 1 15.58 6.85l1.85-1.23A10 10 0 0 0 3.35 19a2 2 0 0 0 1.72 1h13.85a2 2 0 0 0 1.74-1 10 10 0 0 0-.27-10.44zm-9.79 6.84a2 2 0 0 0 2.83 0l5.66-8.49-8.49 5.66a2 2 0 0 0 0 2.83z"></path></svg>
                <span className='text-xs'>{mileage}</span>
              </div>
              <div className="flex flex-col items-center mt-4 text-gray-400 dark:text-gray-200">
                <svg style={{ width: '1.2em', height: '1.2em' }} focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="LocalGasStationIcon"><path d="m19.77 7.23.01-.01-3.72-3.72L15 4.56l2.11 2.11c-.94.36-1.61 1.26-1.61 2.33 0 1.38 1.12 2.5 2.5 2.5.36 0 .69-.08 1-.21v7.21c0 .55-.45 1-1 1s-1-.45-1-1V14c0-1.1-.9-2-2-2h-1V5c0-1.1-.9-2-2-2H6c-1.1 0-2 .9-2 2v16h10v-7.5h1.5v5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V9c0-.69-.28-1.32-.73-1.77zM12 10H6V5h6v5zm6 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"></path></svg>
                <span className='text-xs'>{fuelType}</span>
              </div>
              <div className="flex flex-col items-center mt-4 text-gray-400 dark:text-gray-200">
                <svg style={{ width: '1.2em', height: '1.2em' }} focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="CalendarMonthIcon"><path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM9 14H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm-8 4H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z"></path></svg>
                <span className='text-xs'>{addDate}</span>
              </div>
              <div className="flex flex-col items-center mt-4 text-gray-400 dark:text-gray-200">
                <svg style={{ width: '1.2em', height: '1.2em' }} focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="MotionPhotosAutoIcon"><path d="m2.88 7.88 1.54 1.54C4.15 10.23 4 11.1 4 12c0 4.41 3.59 8 8 8s8-3.59 8-8-3.59-8-8-8c-.9 0-1.77.15-2.58.42L7.89 2.89C9.15 2.32 10.54 2 12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12c0-1.47.32-2.86.88-4.12zM7 5.5C7 6.33 6.33 7 5.5 7S4 6.33 4 5.5 4.67 4 5.5 4 7 4.67 7 5.5zm5.03 3.49h-.07L10.8 12.3h2.39l-1.16-3.31zM12 18c3.31 0 6-2.69 6-6s-2.69-6-6-6-6 2.69-6 6 2.69 6 6 6zm-.71-10.5h1.43l3.01 8h-1.39l-.72-2.04h-3.23l-.73 2.04H8.28l3.01-8z"></path></svg>
                <span className='text-xs'>{transmission}</span>
              </div>
            </div>
          </div>
          <label htmlFor={`confrimBooking${product._id}`} onClick={() => setBooking(product)} className="btn bg-[#f06425] btn-block border-0 hover:bg-[#FF731D]">Book Now</label>

        </div>
        {
          report && <ConfrimAlert
            htmlFor={`ConfirmReport${product._id}`}
            title={`Want to report for "${product.name}?"`}
            message={`If you report, we are report about this product`}
            successAction={handleReport}
            successButtonName="Report"
            modalData={report}
          >
          </ConfrimAlert>
        }
        {
          booking && <BookNowModal
            htmlFor={`confrimBooking${product._id}`}
            successButtonName="Book Know"
            modalData={booking}
          >
          </BookNowModal>
        }

      </div>

    </>
  );
};

export default ProductCard;