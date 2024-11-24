import React, { useEffect, useState } from 'react';
import './Review.css';
import { fetchreviews } from '../data/Data-reviews';
import GraphReview from './GraphReview';

function Review() {
    const [reviewRaw, setReviewRaw] = useState([]);
    const [filteredReviews, setFilteredReviews] = useState([]); // สำหรับข้อมูลที่กรอง
    const [averageStar, setAverageStar] = useState(0); // สร้าง state สำหรับค่าเฉลี่ย
    const [selectedStar, setSelectedStar] = useState(''); // เก็บค่าที่เลือกใน select

    useEffect(() => {
        const reviews = fetchreviews(); // ดึงข้อมูลจากฟังก์ชัน fetchreviews
        setReviewRaw(reviews);
        setFilteredReviews(reviews); // ตั้งค่าเริ่มต้นให้แสดงข้อมูลทั้งหมด

        // คำนวณค่าเฉลี่ย
        const totalStars = reviews.reduce((sum, review) => sum + parseInt(review.Star), 0);
        const average = (totalStars / reviews.length).toFixed(2); // หาค่าเฉลี่ย (ทศนิยม 2 ตำแหน่ง)
        setAverageStar(average);
    }, []); // ทำงานแค่ครั้งเดียวเมื่อ component ถูก render ครั้งแรก

    const handleFilterChange = (event) => {
        const value = event.target.value; // ค่า Star ที่เลือก
        setSelectedStar(value);

        if (value === '') {
            setFilteredReviews(reviewRaw); // แสดงข้อมูลทั้งหมดหากเลือก "ความคิดเห็นทั้งหมด"
        } else {
            const filtered = reviewRaw.filter((review) => review.Star === value); // กรองข้อมูล
            setFilteredReviews(filtered);
        }
    };

    return (
        <div className="Review-container">
            <div className="Review-Graph">
                <div>
                    <h3 className='Review-Average'>ค่าเฉลี่ย: {averageStar}</h3>
                    <span className='box1'><b className='star-box'>5ดาว</b></span>
                    <span className='box2'><b className='star-box'>4ดาว</b></span>
                    <span className='box3'><b className='star-box'>3ดาว</b></span>
                    <span className='box4'><b className='star-box'>2ดาว</b></span>
                    <span className='box5'><b className='star-box'>1ดาว</b></span>
                    <span className='position-graph'><GraphReview /></span>
                </div>
                <div className="Review-Box">
                    <select
                        className="form-select select-container"
                        aria-label="Default select example"
                        style={{ width: '200px' }}
                        value={selectedStar}
                        onChange={handleFilterChange} // ผูกฟังก์ชันกรองข้อมูล
                    >
                        <option value="">ความคิดเห็นทั้งหมด</option>
                        <option value="1">1 ดาว</option>
                        <option value="2">2 ดาว</option>
                        <option value="3">3 ดาว</option>
                        <option value="4">4 ดาว</option>
                        <option value="5">5 ดาว</option>
                    </select>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>จำนวนดาว</th>
                                <th>ชื่อ</th>
                                <th>ความคิดเห็น</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredReviews.map((review) => (
                                <tr key={review.id}>
                                    <td>{review.Star}</td>
                                    <td>{review.name}</td>
                                    <td>{review.comment}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Review;
