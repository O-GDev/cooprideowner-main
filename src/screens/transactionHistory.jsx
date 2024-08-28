import { Icon } from '@iconify-icon/react/dist/iconify.js'
import React, { useState } from 'react'
import { useQuery } from '../../node_modules/@tanstack/react-query/build/legacy/useQuery'
import { getTransactionHistory, getVehicles } from '../api/main.api'
import { useAppState } from '../context/AppContext'


const TransactionHistory = () => {
  const {user} = useAppState()
  const {data} = useQuery({
    queryFn: () => getTransactionHistory(user.id)
  })
  const transactHistory = data || [];

  return (
    
    <div className="p-5 sm:p-10 w-full">
      <div className="flex w-full">
      <div className="w-96 hidden lg:flex"></div>
      <div className="w-16 lg:hidden "></div>
    <div className='w-full'>
        <div>
        <h5 className="font-semibold text-xl">Transaction History</h5>
        </div> 
        <div>
            <div className='bg-white rounded-xl shadow-sm mt-8 p-5'>
              {transactHistory.length > 0 ?
              <div>
              {transactHistory.map((transaction) =>
                    <div>
                <div className='flex justify-between items-center'>
               <div className="flex items-center">
               <div className='bg-yellow rounded-full flex justify-center items-center p-1'>
                <Icon icon="basil:arrow-up-solid" width="1.2em" height="1.2em"  style={{color: "black"}} />
                 </div>
                 <div className='pl-2'>
                     <h4 className='text-[12px] font-normal'>Withdrawal to bank</h4>
                     </div>
                     </div> 
                     <div className='flex justify-center items-center'>
                         <div className='mx-3'>
                         <h4>$<span>{transaction.amount}</span></h4>
                         </div>
                         <div>
                             <h6 className={`${transaction.status =="pending" ? "text-yellow": "text-green"} font-light border-[#F2F2F2] border rounded-2xl px-2 py-1 text-[10px]`}>{transaction.status === 'not_approved'? 'Pending' : 'Approved'}</h6>
                         </div>
                         </div>
                </div>
                {transactHistory.length > 1 &&                
                <div className='h-[0.5px] w-full bg-[#D8D8D8] my-3'></div>}
             </div>
             )}
              </div>:
              <div className='flex justify-center items-center'>No Transaction History</div>}
            </div>
        </div>
        </div>
    </div>
    </div>
  )
}

export default TransactionHistory