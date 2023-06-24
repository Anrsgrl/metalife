import React from 'react';
import OrderInfo from './components/OrderInfo/OrderInfo';
import OrderPrice from './components/OrderPrice/OrderPrice';

const Order = () => {
    return (
        <div className="order">
            <OrderInfo />
            <OrderPrice />
        </div>
    )
}

export default Order;