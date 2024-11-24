import React, { useEffect, useState } from 'react';
import { fetchreviews } from './data/Data-reviews';

const ReviewAverage = () => {
    const [reviews, setReviews] = useState([]);
    const [average, setAverage] = useState(0);

    // ดึงข้อมูลรีวิว
    useEffect(() => {
        const fetchedReviews = fetchreviews();
        setReviews(fetchedReviews);

        // คำนวณค่าเฉลี่ย
        const totalStars = fetchedReviews.reduce((sum, review) => sum + parseInt(review.Star), 0);
        const averageStars = (totalStars / fetchedReviews.length).toFixed(2);
        setAverage(averageStars);
    }, []);

    return (
        <div>
            <h3>คะแนนเฉลี่ย: {average}</h3>
            <ul>
                {reviews.map((review) => (
                    <li key={review.id}>
                        {review.name} - คะแนน: {review.Star}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ReviewAverage;
