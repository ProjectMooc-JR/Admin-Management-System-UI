import React, { useState } from 'react';
import { Container, Grid, TextField, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';  // 引入 useNavigate 以便进行页面跳转
import axios from 'axios';

export default function CreateCourse() {
  const navigate = useNavigate();  // 用于页面跳转
  const [courseData, setCourseData] = useState({
    CourseName: '',
    Description: '',
    CategoryID: '',
    Cover: '',
    TeacherID: '',
    PublishedAt: '',
  });

  const handleChange = (e) => {
    setCourseData({
      ...courseData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      // 提交数据到后端 API
      const response = await axios.post('/api/courses', courseData);
      console.log('Course Created:', response.data);

      // 创建成功后跳转到课程管理页面
      navigate('/course-management');
    } catch (error) {
      console.error('Error creating course:', error);
    }
  };

  return (
    <Container>
      <Box sx={{ padding: 3 }}>
        <Typography variant="h4" gutterBottom>
          Create New Course
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Course Name"
              name="CourseName"
              value={courseData.CourseName}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Description"
              name="Description"
              value={courseData.Description}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Category ID"
              name="CategoryID"
              value={courseData.CategoryID}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Cover URL"
              name="Cover"
              value={courseData.Cover}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Teacher ID"
              name="TeacherID"
              value={courseData.TeacherID}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Published At"
              name="PublishedAt"
              type="datetime-local"
              value={courseData.PublishedAt}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Create Course
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
