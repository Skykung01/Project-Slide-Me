import React, { useEffect, useState } from 'react';
import './Review.css';
import { fetchreviews } from '../data/Data-reviews';
import GraphReview from './GraphReview';

function Review() {
    const [reviewRaw, setReviewRaw] = useState([]);

    useEffect(() => {
        setReviewRaw(fetchreviews()); // ดึงข้อมูลจากฟังก์ชัน fetchreviews
    }, []); // จะทำงานแค่ครั้งเดียวเมื่อ component ถูก render ครั้งแรก

    useEffect(() => {
        console.log(reviewRaw); // ตรวจสอบข้อมูลที่ได้
    }, [reviewRaw]); // ทำงานทุกครั้งที่ reviewRaw เปลี่ยนแปลง

    return (
        <div className="Review-container">
            <div className='Review-Graph'>
                <GraphReview />
                <div className='Review-Box'>
                    <table className='table'>
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
