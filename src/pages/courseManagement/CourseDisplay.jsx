import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

const CourseDisplay = () => {
  const [courseData, setCourseData] = useState(null);
  const [chapters, setChapters] = useState([]);
  const { courseId } = useParams();
  const history = useNavigate();

  console.log(courseId);
  
  useEffect(() => {
    // Fetch course data by courseId
    const fetchCourseData = async () => {
      
      const courseResponse = await fetch(`/api/courses/${courseId}`);
     
      console.log("courseResponse:", courseResponse); 
      const course = await courseResponse.json();
      setCourseData(course);
      
      // Fetch chapters for the course
    //   const chaptersResponse = await fetch(`/api/courses/${courseId}/chapters`);
    //   const chapterList = await chaptersResponse.json();
    //   setChapters(chapterList);
    };
    
    fetchCourseData();
  }, [courseId]);

  // Handler to navigate to a chapter's display page
  const handleChapterClick = (chapterId) => {
    history.push(`/chapters/${chapterId}`);
  };

  if (!courseData) return <Typography>Loading...</Typography>;

  return (
    <Container>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 4 }}>
        {/* Course Cover and Basic Information */}
        <Card sx={{ maxWidth: 800, width: '100%', mb: 4 }}>
          <CardContent>
            <img src={courseData.cover} alt="Course Cover" style={{ width: '100%', height: 'auto' }} />
            <Typography variant="h4" sx={{ marginTop: 2 }}>
              {courseData.name}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {courseData.description}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              Category: {courseData.category} | Published At: {new Date(courseData.publishedAt).toLocaleString()}
            </Typography>
          </CardContent>
        </Card>

        {/* Chapter List */}
        <Typography variant="h5" gutterBottom>
          Chapters
        </Typography>
        <Grid container spacing={2} sx={{ maxWidth: 800 }}>
          {chapters.map((chapter) => (
            <Grid item xs={12} key={chapter.id}>
              <Card sx={{ cursor: 'pointer' }} onClick={() => handleChapterClick(chapter.id)}>
                <CardContent>
                  <Typography variant="h6">
                    {chapter.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {chapter.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Button variant="contained" color="primary" sx={{ marginTop: 4 }} onClick={() => history.push('/courses')}>
          Back to Courses
        </Button>
      </Box>
    </Container>
  );
};

export default CourseDisplay;
