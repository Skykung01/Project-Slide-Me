import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { fetchreviews } from '../data/Data-reviews';

// ฟังก์ชันคำนวณจำนวนดาวที่ได้
const calculateStarData = (reviews) => {
    const starCount = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }; // เพิ่ม 1 ดาวเข้าไปใน starCount
    reviews.forEach((review) => {
        const star = parseInt(review.Star); // แปลงค่า Star เป็นตัวเลข
        if (starCount[star] !== undefined) {
            starCount[star] += 1; // เพิ่มจำนวนในช่องที่ตรงกับดาว
        }
    });
    return Object.keys(starCount).map((star) => ({
        name: `${star} ดาว`, // ใส่ `${}` ครอบข้อความ
        value: starCount[star],
    }));
};

const GraphReview = () => {
    // คำนวณข้อมูลดาวที่ได้
    const [starData, setStarData] = useState([]);

    useEffect(() => {
        setStarData(calculateStarData(fetchreviews())); // คำนวณเมื่อเริ่มต้น
    }, []);

    // สีที่ใช้ใน Pie chart เรียงจากสีเข้มไปหาสีอ่อนตามเปอร์เซ็นต์
    const COLORS = ['#1B5E20', '#388E3C', '#66BB6A', '#81C784', '#A5D6A7'];

    // ฟังก์ชันสำหรับแสดงเปอร์เซ็นต์บนกราฟ
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
        const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <div style={{ width: '100%', height: 400 }}>
            <ResponsiveContainer>
                <PieChart>
                    <Pie
                        data={starData.sort((a, b) => b.value - a.value)} // จัดเรียงจากมากไปหาน้อย
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={150} // ปรับขนาดกราฟให้ใหญ่ขึ้น
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {starData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index]} />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default GraphReview;
