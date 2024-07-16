import React from 'react'

export default function Table({transactions, customers , setSelectedCustomerId }) {


    const showTransactionsGraph = (customerId)=>{
        setSelectedCustomerId(customerId); 
    }

  return (
    <table className='my-5 border-collapse p-7 border border-slate-500 table-auto w-full'>
    <thead className='bg-slate-400'>
      <tr>
        <th className='table-header'>Customer</th>
        <th className='table-header'>Date</th>
        <th className='table-header'>Amount</th>
      </tr>
    </thead>
    <tbody>
      {transactions.map(transaction => {
        const customer = customers.find(c => c.id === transaction.customer_id);
        return (
            customer ?  <tr key={transaction.id} className=' hover:bg-slate-300 bg-slate-100' title={`click for ${customer.name} graph `} onClick={()=>{showTransactionsGraph(customer.id)}}>
            <td className='table-data-cell' >{customer.name}</td>
            <td className='table-data-cell'>{transaction.date}</td>
            <td className='table-data-cell'>{transaction.amount}</td>
          </tr> : ""
         
        );
      })}
    </tbody>
  </table>
  )
}
