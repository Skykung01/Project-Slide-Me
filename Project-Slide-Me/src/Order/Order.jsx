import React, { useEffect, useState } from 'react';

import { fetchorders } from '../data/Data-orders';

import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.css';
import './Order.css';

function Order() {
    const [OrderRaw, setOrderRaw] = useState([]);

    useEffect(() => {
        setOrderRaw(fetchorders());
    }, []);

    useEffect(() => {
        console.log(OrderRaw);
    }, [OrderRaw]);



    //// Delete order
    function DeleteOrder(id) {
        const orderRemain = OrderRaw.filter((order) => {
            return order.id !== id
        })

        setOrderRaw(orderRemain)

    }







    return (
        <div>
            <div className='Order-table'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>วันที่รับบริการ</th>
                            <th>เลขรหัสบริการ</th>
                            <th>ลูกค้า</th>
                            <th>จำนวนเงิน</th>
                            <th>สถานะ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {OrderRaw.map((order) => (
                            <tr key={order.id}>
                                <td>{order.Date}</td>
                                <td>{order['Service code']}</td>
                                <td>{order.name}</td>
                                <td>{order.money}</td>
                                <td>
                                    <button className='btn btn-success'>
                                        <span className='bi bi-pencil-square'></span></button>&nbsp;
                                    <button className=' btn btn-danger' onClick={() => DeleteOrder(order.id)}><span class="bi bi-trash"></span></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </div>
    );
}

export default Order;
