import React from "react";
import {Button, Stack, Paper, IconButton} from "@mui/material";
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import {useRef, useState, useEffect} from "react";


const WebCam = ({onTakePicture, srcImage, ...props}) => {

    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [error, setError] = useState(null);
    const [imageURL, setImageURL] = useState(null);
    const [show, setShow] = useState(false)


    useEffect(() => {

        mediaSetup()

    }, [])

    useEffect(() => {

        onTakePicture(imageURL)


    }, [imageURL])


    const mediaSetup = () => {
        navigator.mediaDevices.getUserMedia({
            video: {width: {min: 1024, ideal: 1280, max: 1920}},
            height: {min: 776, ideal: 720, max: 1080}
        })
            .then((stream) => {
                let video = videoRef.current
                video.srcObject = stream;
                video.play();
            }).catch(error => {
            setError(error)
        })
    }


    const pauseVideo = () => videoRef.current.pause();
    const resumeVideo = () => {
        setShow((prevState) => !prevState)
        videoRef.current.play()

    }

    const captureImage = () => {
        pauseVideo()
        let width = 1080
        let height = width / (16 / 9)
        let video = videoRef.current
        let canvas = canvasRef.current
        canvas.width = width
        canvas.height = height

        let ctx = canvas.getContext("2d");
        ctx.drawImage(video, 0, 0, width, height);
        const image = canvas.toDataURL();
        setImageURL(image)

    }

    return (
        <Stack diretion="column" spacing={1} sx={{width: "320px", height: "400px"}} {...props} >
            <Paper elevation={1} sx={{width: "320px"}}>
                {srcImage && <img src={srcImage} width="320" height="240" alt="image" hidden={!show}/>}
                <video id="video" width="320" height="240" ref={videoRef} autoPlay hidden={show}/>

                <Stack direction="row" spacing={2} justifyContent="space-around">
                    <IconButton onClick={captureImage}><PhotoCameraIcon fontSize="medium"/></IconButton>
                    <IconButton onClick={resumeVideo}><RestartAltIcon fontSize="medium"/></IconButton>
                </Stack>
            </Paper>
            <div>
                <canvas id="canvas" ref={canvasRef} hidden={true}/>
            </div>
        </Stack>
    )
}


export default WebCam;