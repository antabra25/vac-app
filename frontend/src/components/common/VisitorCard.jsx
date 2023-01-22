import {Card, CardActions, CardContent, CardMedia, Button, Typography} from '@mui/material';


export default function VisitorCard({
                                        id,
                                        visitor,
                                        photo,
                                        ci,
                                        name,
                                        lastName,
                                        building,
                                        office,
                                        floor,
                                        host,
                                        phone,
                                        onClose,
                                        onCheck
                                    }) {

    return (
        <Card sx={{maxWidth: 345}}>
            <CardMedia
                component="img"
                alt="visitor"
                height="140"
                image={photo}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {name + " " + lastName}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                    V-{ci}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                    Telf:{phone}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Funcionario:{host}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Edificio:{building}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Oficina:{office}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Piso:{floor}
                </Typography>

            </CardContent>
            <CardActions>
                <Button size="small" onClick={() => onCheck(visitor)}>Verificar</Button>
                <Button size="small" onClick={() => onClose(id)}>Cerrar</Button>
            </CardActions>
        </Card>
    );
}