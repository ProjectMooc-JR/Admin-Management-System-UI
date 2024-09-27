import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import VideoUploadZone from './VideoUploadZone';  

const ChapterDisplay = () => {
  const { courseId, chapterOrder } = useParams();  
  const [chapter, setChapter] = useState(null);

  useEffect(() => {
    const fetchChapter = async () => {
      try {
        // 请求时传递 courseId 和 chapterOrder
        const response = await fetch(`/api/courses/${courseId}/chapters/${chapterOrder}`);
        const data = await response.json();
        setChapter(data);
      } catch (error) {
        console.error("Error fetching chapter:", error);
      }
    };

    fetchChapter();
  }, [courseId, chapterOrder]);

  if (!chapter) {
    return <div>Loading...</div>;
  }

  return (
    <Box m="20px">
      <Typography variant="h4">{chapter.ChapterTitle}</Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        {chapter.ChapterDescription}
      </Typography>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6">Video</Typography>
        <VideoUploadZone videoURL={chapter.VideoURL} />

        <Box sx={{ mt: 2 }}>
          <video width="100%" height="auto" controls>
            <source src={chapter.VideoURL} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </Box>
      </Box>
    </Box>
  );
};

export default ChapterDisplay;
