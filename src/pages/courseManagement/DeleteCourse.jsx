import axios from 'axios';

const deleteCourse = async (courseId, setCourses) => {
    try {
        await axios.delete(`/api/courses/${courseId}`);
        setCourses(prevCourses => prevCourses.filter(course => course.courseId !== courseId));
    } catch (error) {
        console.error('Error deleting course:', error);
    }
};

export default deleteCourse;
