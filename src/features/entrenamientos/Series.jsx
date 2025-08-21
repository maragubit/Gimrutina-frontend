import { Card, CardFooter, CardImg, CardText, Col, Container, Row } from "react-bootstrap";
import { Icon } from "@iconify/react/dist/iconify.js";
import {Link} from "react-router-dom";

function Series({series,startTrainning,entrenamiento_id}){
    return(<>
    <Container className="bg-dark pb-4 pt-4 text-white">
        <h6>Series realizadas hoy:</h6>
        <Row>
            {series?.map(
                (serie)=>{
                    return(
                        <Col xs="6" lg="3">
                            <Card className="m-1"><div><Link to={`/profile/series/${serie?.id}`}><Icon className="mr-1 mt-1" icon="whh:edit" style={{float:"right"}} /></Link></div>
                                <CardText>{serie.exercise.name}</CardText>
                                <CardImg src={serie?.exercise?.image}/>
                                <CardFooter>{serie?.number}) {serie?.weight} x {serie?.reps} {serie?.failure ? <Icon icon="emojione-monotone:flexed-biceps" style={{color:"red"}} /> : <Icon icon="emojione-monotone:flexed-biceps" style={{color:"green"}} />}</CardFooter>
                                
                            </Card>
                        </Col>
                    )
                }
            )}
        </Row>
    </Container>
    <br/>
    </>)
}
export default Series;