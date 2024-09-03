import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import deleteCourse from './DeleteCourse';

const CourseManagement = () => {
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get('http://localhost:9008/api/courses');
                setCourses(response.data);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };
        fetchCourses();
    }, []);

    const handleDelete = async (courseId) => {
        await deleteCourse(courseId, setCourses);
    };

    return (
        <div>
            <h1>Course Management</h1>
            <button onClick={() => navigate('/courses/new')}>Create New Course</button>
            <div className="course-list">
                {courses.map(course => (
                    <div className="course-card" key={course.ID}>
                        <h2>{course.CourseName}</h2>
                        <p>{course.Description}</p>
                        <p>Teacher ID: {course.TeacherID}</p>
                        <button onClick={() => navigate(`/courses/${course.courseId}`)}>View Details</button>
                        <button onClick={() => navigate(`/courses/${course.courseId}/edit`)}>Edit</button>
                        <button onClick={() => handleDelete(course.courseId)}>Delete</button> {/* add delete button */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CourseManagement;
