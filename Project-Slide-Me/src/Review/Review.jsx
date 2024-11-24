import React, { useEffect, useState } from 'react';
import './Review.css';
import { fetchreviews } from '../data/Data-reviews';
import GraphReview from './GraphReview';

function Review() {
    const [reviewRaw, setReviewRaw] = useState([]);
    const [averageStar, setAverageStar] = useState(0); // สร้าง state สำหรับค่าเฉลี่ย

    useEffect(() => {
        const reviews = fetchreviews(); // ดึงข้อมูลจากฟังก์ชัน fetchreviews
        setReviewRaw(reviews);

        // คำนวณค่าเฉลี่ย
        const totalStars = reviews.reduce((sum, review) => sum + parseInt(review.Star), 0);
        const average = (totalStars / reviews.length).toFixed(2); // หาค่าเฉลี่ย (ทศนิยม 2 ตำแหน่ง)
        setAverageStar(average);
    }, []); // ทำงานแค่ครั้งเดียวเมื่อ component ถูก render ครั้งแรก

    return (
        <div className="Review-container">
            <div className="Review-Graph">
                <div>
                    <h3 className='Review-Average'>ค่าเฉลี่ย: {averageStar}</h3>
                    <GraphReview />
                </div>
                <div className="Review-Box">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>คะแนน</th>
                                <th>ชื่อ</th>
                                <th>ความคิดเห็น</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reviewRaw.map((review) => (
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
