import React, { useEffect, useState } from 'react';

import { fetchorders } from '../data/Data-orders';

import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Order.css';

function Order() {
    const [OrderRaw, setOrderRaw] = useState([]);

    useEffect(() => {
        setOrderRaw(fetchorders());
    }, []);

    useEffect(() => {
        console.log(OrderRaw);
    }, [OrderRaw]);

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
                                <td><button className=' btn btn-danger'><span className='bi bi-trash'></span></button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </div>
    );
}

export default Order;
