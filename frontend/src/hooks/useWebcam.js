import {useState} from "react";


function useWebcam() {
    const [photo, setPhoto] = useState('');

    const getImage = (imageURL) => {
        setPhoto(imageURL)
    }
    return {photo, getImage}
}

export default useWebcam;


