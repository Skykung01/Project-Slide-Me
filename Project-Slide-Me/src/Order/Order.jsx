import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { fetchorders } from '../data/Data-orders';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Order.css';

function Order() {
    const [OrderRaw, setOrderRaw] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentOrder, setCurrentOrder] = useState(null);
    const [editValues, setEditValues] = useState({
        Date: '',
        'Service code': '',
        name: '',
        money: ''
    });

    useEffect(() => {
        setOrderRaw(fetchorders());
    }, []);

    const handleEditClick = (order) => {
        setCurrentOrder(order);
        setEditValues(order);
        setShowModal(true);
    };

    const handleSave = () => {
        setOrderRaw((prevOrders) =>
            prevOrders.map((order) =>
                order.id === currentOrder.id ? { ...currentOrder, ...editValues } : order
            )
        );
        setShowModal(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditValues((prevValues) => ({ ...prevValues, [name]: value }));
    };

    const handleDelete = (id) => {
        setOrderRaw((prevOrders) => prevOrders.filter((order) => order.id !== id));
    };

    return (
        <div className="Order-table">
            <table className="table">
                <thead>
                    <tr>
                        <th>วันที่รับบริการ</th>
                        <th>เลขรหัสบริการ</th>
                        <th>ลูกค้า</th>
                        <th>จำนวนเงิน</th>
                        <th>การจัดการ</th>
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
                                <button
                                    className="btn btn-success"
                                    onClick={() => handleEditClick(order)}
                                >
                                    <span className="bi bi-pencil-square"></span>
                                    แก้ไข
                                </button>
                                &nbsp;
                                <button
                                    className="btn btn-danger"
                                    onClick={() => handleDelete(order.id)}
                                >
                                    <span className="bi bi-trash"></span>
                                    ลบ
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal */}
            {showModal && (
                <>
                    {/* Backdrop */}
                    <div className="Button-modal-backdrop" onClick={() => setShowModal(false)}></div>

                    {/* Modal content */}
                    <div className="Button-modal show">
                        <button className="btn-close" onClick={() => setShowModal(false)}>
                            <span className="bi bi-x-circle"></span>
                        </button>
                        <h4>แก้ไขข้อมูล</h4>
                        <Form>
                            <Form.Group controlId="editDate">
                                <Form.Label>วันที่รับบริการ</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="Date"
                                    value={editValues.Date}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="editServiceCode" className="mt-3">
                                <Form.Label>เลขรหัสบริการ</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="Service code"
                                    value={editValues['Service code']}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="editName" className="mt-3">
                                <Form.Label>ลูกค้า</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    value={editValues.name}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="editMoney" className="mt-3">
                                <Form.Label>จำนวนเงิน</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="money"
                                    value={editValues.money}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Form>
                        <div className="Button-modal-footer">
                            <button className="btn-cancel" onClick={() => setShowModal(false)}>
                                ยกเลิก
                            </button>&nbsp;
                            <button className="btn-save" onClick={handleSave}>
                                บันทึก
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default Order;
