import React from "react";
import { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Select,
  InputLabel,
  FormControl,
  MenuItem,
  // Stack,
  Autocomplete,
  CircularProgress,
} from "@mui/material";
import { useFormik } from "formik";
// import toast from "react-hot-toast";
import * as Yup from "yup";
import postRequest from "../../request/postRequest";
import getRequest from "../../request/getRequest";
// import Header from "../../components/Header";
import MoocDropzone from "../../components/moocDropzone";
import VideoUploadZone from "../../pages/courseManagement/VideoUploadZone";
import { useParams,useNavigate } from "react-router-dom";

export default function CreateChapter() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  let { courseid, chapterid } = useParams();
  console.log("CreateChapter", courseid);
  console.log("chapterid", chapterid);
  const [avatarData, setAvatarData] = useState("");
  const handleAvatarResult = (result) => {
    setAvatarData(result);
  };

  const [isShowDetail, setShowdetail] = useState(false);
  const [showVideoURL, setshowVideoURL] = useState("");

useEffect(() => {
    const getChapter = async (chapId) => {
      let result = await getRequest(`chapters/${chapId}`);
      if (result.status == 200) {

        formik.setValues({
          ChapterTitle: result.data[0].ChapterTitle,
          ChapterDescription: result.data[0].ChapterDescription,
          ChapterOrder: result.data[0].ChapterOrder,
        });

        setshowVideoURL(
          process.env.REACT_APP_BASE_API_URL + result.data[0].VideoURL
        );
      }
    };

    if (courseid == 0 && chapterid < 0) {
      setShowdetail(true);
      getChapter(chapterid * -1);
    }
  }, []);

//我的版本
//   useEffect(() => {
//     const getChapter = async (chapId) => {
//         try {
//             let result = await getRequest(`chapters/${chapId}`);
//             if (result.status === 200) {
//                 formik.setValues({
//                     ChapterTitle: result.data[0].ChapterTitle,
//                     ChapterDescription: result.data[0].ChapterDescription,
//                     ChapterOrder: result.data[0].ChapterOrder,
//                 });

//                 // when it is detail page, show the video
//                 if (courseid === 0 && chapterid < 0) {
//                     setshowVideoURL(process.env.REACT_APP_BASE_API_URL + result.data[0].VideoURL);
//                 } else if (courseid !== 0 && chapterid > 0) {
//                     // when it is update page, reset the video url
//                     setshowVideoURL("");
//                 }
//             } else {
//                 console.error("Failed to load chapter data:", result.message);
//             }
//         } catch (error) {
//             console.error("Error fetching chapter:", error);
//         }
//     };

//     // based on the courseid and chapterid, decide to show detail or not
//     if (courseid === 0 && chapterid < 0) {
//         setShowdetail(true); 
//         getChapter(chapterid * -1); 
//     } else if (courseid !== 0 && chapterid > 0) {
//         setShowdetail(false); 
//         getChapter(chapterid); 
//     }
// }, [courseid, chapterid]);

  const handleCancel = () => {
    formik.resetForm();
    navigate("/course-management");
  };

// 添加章节处理函数
//   const handleUpdate = async () => {
//     const updatedChapter = {
//         ChapterTitle: formik.values.ChapterTitle,      // 从表单中获取的章节标题
//         ChapterDescription: formik.values.ChapterDescription,  // 从表单中获取的章节描述
//         ChapterOrder: formik.values.ChapterOrder,      // 从表单中获取的章节顺序
//         VideoURL: showVideoURL // 从 state 获取的视频 URL（或者是新上传的视频 URL）
//     };
//     try {
//         const response = await fetch(`/api/chapters/${chapterid}`, {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(updatedChapter)
//         });
//         const result = await response.json();
//         if (result.isSuccess) {
//             alert("Chapter updated successfully!");
//             navigate("/course-management");  // 更新成功后导航到课程管理页面
//         } else {
//             alert("Failed to update chapter: " + result.message);
//         }
//     } catch (error) {
//         console.error("Error updating chapter:", error);
//     }
// };


  // 管理课程列表和选中课程
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState([]);

  const [videoFile, setVideoFile] = useState(null);

  //   useEffect(() => {
  //     // Fetch courses from backend
  //     const fetchCourses = async () => {
  //         try {
  //             const result = await getRequest("/courses/names");
  //             if (result.status === 200) {
  //                 setCourses(result.data.items || []); // 确保courses为数组
  //             } else {
  //                 setCourses([]); // 确保courses为数组
  //             }
  //         } catch (error) {
  //             console.error("Error fetching courses:", error);
  //         }
  //     };

  //     fetchCourses();
  // }, []);

  const handleVideoUpload = (file) => {
    setVideoFile(file); // Store the uploaded video file in state
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("courseVideo", videoFile); // Add the video file to FormData for submission
    // Add other form fields as necessary

    // Submit the form data, e.g., via fetch or axios
  };
  // 使用 Formik 管理表单状态和验证
  const formik = useFormik({
    initialValues: {
      ChapterTitle: "",
      ChapterDescription: "",
      ChapterOrder: "",
    },

    validationSchema: Yup.object({
      ChapterTitle: Yup.string().required("ChapterTitle is required"),
    }),
    onSubmit: async (inputValues) => {
      const formData = new FormData();
      formData.append("file", videoFile);
      formData.append("ChapterTitle", inputValues.ChapterTitle);
      formData.append("ChapterDescription", inputValues.ChapterDescription);
      formData.append("ChapterOrder", inputValues.ChapterOrder);
      formData.append("CourseID", courseid);

      let result = await postRequest("/chapters", formData);

      if (result.status === 201) {
        alert("Add chapter successfully");
      } else {
        alert("Add chapter failed");
      }
    },
  });
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        boxShadow: 1,
        borderRadius: 2,
        p: 2,
        minWidth: 300,
        display: "flex",
        flexDirection: "column",
        gap: "24px",
      }}
    >
      <form onSubmit={formik.handleSubmit} className="add-teacher-form">
        {/* <TextField
            select
            fullWidth
            variant="filled"
            label="Select Course"
            name="CourseID"
            value={formik.values.CourseID}
            onChange={formik.handleChange}
            error={formik.touched.CourseID && Boolean(formik.errors.CourseID)}
            
        >
            
            {courses.map((course) => (
                <MenuItem key={course.ID} value={course.ID}>
                    {course.CourseName}
                </MenuItem>
            ))}
        </TextField> */}

        <TextField
          fullWidth
          variant="filled"
          disabled={isShowDetail}
          type="text"
          label="Chapter title"
          name="ChapterTitle"
          value={formik.values.ChapterTitle}
          onChange={formik.handleChange}
          error={
            formik.touched.ChapterTitle && Boolean(formik.errors.ChapterTitle)
          }
          helperText={formik.touched.ChapterTitle && formik.errors.ChapterTitle}
        />

        <TextField
          fullWidth
          variant="filled"
          disabled={isShowDetail}
          type="text"
          label="Course Description"
          name="ChapterDescription"
          value={formik.values.ChapterDescription}
          onChange={formik.handleChange}
          error={
            formik.touched.ChapterDescription &&
            Boolean(formik.errors.ChapterDescription)
          }
          helperText={
            formik.touched.ChapterDescription &&
            formik.errors.ChapterDescription
          }
        />

        <TextField
          fullWidth
          variant="filled"
          disabled={isShowDetail}
          type="number"
          label="Course Order"
          name="ChapterOrder"
          value={formik.values.ChapterOrder}
          onChange={formik.handleChange}
          error={
            formik.touched.ChapterOrder && Boolean(formik.errors.ChapterOrder)
          }
          helperText={formik.touched.ChapterOrder && formik.errors.ChapterOrder}
        />

        {isShowDetail ? (
          <div>
            <video controls width={500} src={showVideoURL} type="video/mp4">
              {/* <source src={showVideoURL} type="video/mp4"/> */}
            </video>
          </div>
        ) : (
          <VideoUploadZone onVideoUpload={handleVideoUpload} />
        )}
        
      < Box sx={{ display: "flex", justifyContent: "space-between" }}>
        {!isShowDetail && (
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ width: "48%" }}
          >
            Add Chapter
          </Button>
        )}
        

        
        {/* {courseid === 0 && chapterid > 0 && (
        <Button
          type="button"
          variant="contained"
          color="primary"
          sx={{ width: "48%" }}
          onClick={handleUpdate}
        >
          Update Chapter
        </Button>
        )} */}
        
        <Button
            type="button"
            variant="contained"
            color="primary"
            sx={{  width: "48%" }}
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </Box>
      </form>
    </Box>
  );
}
