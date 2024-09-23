import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";

export default function VideoUploadZone(props) {
  const [videoFile, setVideoFile] = useState(null);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      setVideoFile(file); // Store the video file
      if (props.onVideoUpload) {
        props.onVideoUpload(file); // Pass video file to parent
      }
    },
    [props]
  );

  function typeValidator(file) {
    const fileExtension = file.name.split(".").pop().toLowerCase();
   
    let isAccept = ["mp4"].includes(fileExtension);
    if (!isAccept) {
      toast.error("file format need to be mp4");
      return {
        code: "accept-format-wrong",
        message: `file format need to be mp4`,
      };
    }
    return null;
  }
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'video/mp4': ['.mp4']
    },
    validator: typeValidator,
    multiple: false, // Limit to a single file
  });

  return (
    <div
      {...getRootProps()}
      style={{
        border: "2px dashed #ccc",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop your video file here...</p>
      ) : (
        <p>Drag 'n' drop a video file, or click to select one</p>
      )}
      {videoFile && (
        <video width="300" controls>
          <source src={URL.createObjectURL(videoFile)} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
}
