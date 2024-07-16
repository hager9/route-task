import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { data } from './data';
import Chart from './Components/Chart/Chart';
import Table from './Components/Table/Table';

function App() {

  const [filteredCustomers, setFilteredCustomers] = useState(data.customers);
  const [filteredTransactions, setFilteredTransactions] = useState(data.transactions);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);


  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();

    if (value === '') {
        setFilteredCustomers(data.customers);
    } else {
      const customerIds = new Set(
        data.customers
            .filter(customer => customer.name.toLowerCase().includes(value))
            .map(customer => customer.id)
    );

    data.transactions
        .filter(transaction => transaction.amount.toString().includes(value))
        .forEach(transaction => customerIds.add(transaction.customer_id));

        const finalResults = data.customers.filter(customer => customerIds.has(customer.id));
        setFilteredCustomers(finalResults);
    }
  }

  const chartData = selectedCustomerId
        ? data.transactions.filter(transaction => transaction.customer_id === selectedCustomerId)
        : data.transactions;


  const selectedCustomer = selectedCustomerId 
        ? data.customers.find(customer => customer.id === selectedCustomerId) 
        : null;

  return (
    <div className='py-2 min-h-screen'>
        <div className='container text-center'>
          <h1 className= ' text-blue-600 font-bold text-xl md:text-3xl xl:text-4xl mt-4 mb-3 '>Customer Transactions App</h1>
          <p className='text-sm md:text-md xl:text-xl mt-2 mb-4 font-semibold'>Welcome to the Customer Transactions App! Easily search and view transactions.</p>
          

          <Chart data={chartData}  
              customerName={selectedCustomer ? selectedCustomer.name : 'All Customers'}/>

          <div className='my-5 text-center'>
          <input
            type='text'
            className='py-3 px-2 my-2 w-full md:w-6/12 bg-gray-100 outline-gray-400 border-gray-300 border-[3px] rounded-sm'
            placeholder='Search Customers...'
            onChange={handleSearchChange}
          />
          </div>

          <Table
            setSelectedCustomerId={setSelectedCustomerId}
            customers={filteredCustomers}
            transactions={filteredTransactions}/>
          
        </div>

    </div>
  ) ;
}

export default App;
