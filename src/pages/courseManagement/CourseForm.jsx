import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CourseForm = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        CourseName: '',
        Description: '',
        CategoryID: '',
        Cover: '',
        teacherId: ''
    });

    useEffect(() => {
        if (courseId) {
            const fetchCourse = async () => {
                try {
                    const response = await axios.get(`/api/courses/${courseId}`);
                    setFormData(response.data);
                } catch (error) {
                    console.error('Error fetching course:', error);
                }
            };
            fetchCourse();
        }
    }, [courseId]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (courseId) {
                await axios.put(`/api/courses/${courseId}`, formData);
            } else {
                await axios.post('/api/courses', formData);
            }
            navigate('/course-management');
        } catch (error) {
            console.error('Error saving course:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Course Name:
                <input type="text" name="CourseName" value={formData.CourseName} onChange={handleChange} />
            </label>
            <label>
                Description:
                <textarea name="Description" value={formData.Description} onChange={handleChange}></textarea>
            </label>
            <label>
                Category ID:
                <input type="number" name="CategoryID" value={formData.CategoryID} onChange={handleChange} />
            </label>
            <label>
                Cover URL:
                <input type="text" name="Cover" value={formData.Cover} onChange={handleChange} />
            </label>
            <label>
                Teacher ID:
                <input type="number" name="teacherId" value={formData.teacherId} onChange={handleChange} />
            </label>
            <button type="submit">{courseId ? 'Update' : 'Create'} Course</button>
        </form>
    );
};

export default CourseForm;
