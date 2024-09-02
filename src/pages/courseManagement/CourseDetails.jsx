import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CourseDetails = () => {
    const { courseId } = useParams();
    const [course, setCourse] = useState(null);

    useEffect(() => {
        const fetchCourseDetails = async () => {
            try {
                const response = await axios.get(`/api/courses/${courseId}`);
                setCourse(response.data);
            } catch (error) {
                console.error('Error fetching course details:', error);
            }
        };
        fetchCourseDetails();
    }, [courseId]);

    if (!course) return <div>Loading...</div>;

    return (
        <div>
            <h1>{course.CourseName}</h1>
            <p>{course.Description}</p>
            <p>Category: {course.CategoryID}</p>
            <p>Teacher ID: {course.teacherId}</p>
            <img src={course.Cover} alt="Course Cover" />
            <p>Published At: {course.PublishedAt}</p>
        </div>
    );
};

export default CourseDetails;
