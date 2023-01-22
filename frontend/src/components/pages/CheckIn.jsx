import Title from "../common/Title.jsx"
import {Stack, Button} from "@mui/material"
import InputRead from "../form/InputRead.jsx"
import Form from "../form/Form.jsx";
import WebCam from "../webcam/WebCam.jsx"
import {Main} from "../styled/StyledLayout"
import useWebcam from "../../hooks/useWebcam.js";
import {saveCheck} from "../../services/useCheck.js"
import {toast} from "react-toastify";
import {useState} from "react";


const CheckIn = () => {

    const {photo, getImage} = useWebcam()
    const [form,setForm] = useState({})

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await saveCheck({qr: photo})
            if (response.status === 201) {
                toast.success("Pase Verificado")
                setForm({...response.data})
            }
        } catch (e) {
            toast.error("No se logró leer el pase")
        }
    }
    return (

        <Main>
            <Title>Verificar</Title>
            <Form onSubmit={handleSubmit}>
                <Stack spacing={3} justifyContent="center" alignItems="center" height="60vh">
                    <WebCam onTakePicture={getImage} srcImage={form.photo}/>
                    <Stack direction="row" spacing={2}>
                        <InputRead id="ticket" name="ticket" value={form._id} label="Pase ID"/>
                        <InputRead id="ci" name="ci" value={form.ci} label="Cedula"/>
                        <InputRead id="name" name="name" value={form.name} label="Nombre"/>
                    </Stack>
                    <Stack direction="row" spacing={2}>
                        <InputRead id="lastName" name="lastName" value={form.lastname} label="Apellido"/>
                        <InputRead id="floor" name="office" value={form.office} label="Piso"/>
                        <InputRead id="office" name="office" value={form.flat} label="Oficina"/>
                    </Stack>
                    <Button variant="contained" type="submit">Verificar</Button>
                </Stack>
            </Form>
        </Main>
    )
}

export default CheckIn;