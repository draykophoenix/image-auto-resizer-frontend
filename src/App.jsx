// import { useState } from 'react'
import { Container, Row, Col, InputGroup, Button, Input, Label, Card, CardBody, ListGroup, ListGroupItem, CardHeader  } from 'reactstrap';
import { BsSearch } from "react-icons/bs";
import './App.css'

function App() {
  // const [count, setCount] = useState(0)

  return (
  <>
<Container>
  <Row xs="3">
    <Col>
      <Card style={{'height': '90vh'}}>
        <CardHeader>
          <h5>Find</h5>
        </CardHeader>
        <CardBody>
          <InputGroup>
            <Input placeholder="Search" />
            <Button><BsSearch/></Button>
          </InputGroup>
          <h6>
            Results
          </h6>
          <div style={{backgroundColor:'green'}}>
            <Container>
              <Row xs="2">
                <Col className="bg-light border">
                  <img src="https://picsum.photos/300/200" style={{'width':'150px', 'height':'100px', 'object-fit' : 'cover'}}></img>
                </Col>
                <Col className="bg-light border">
                  <img src="https://picsum.photos/300/200" style={{'width':'150px', 'height':'100px', 'object-fit' : 'cover'}}></img>
                </Col>
                <Col className="bg-light border">
                  <img src="https://picsum.photos/300/200" style={{'width':'150px', 'height':'100px', 'object-fit' : 'cover'}}></img>
                </Col>
                <Col className="bg-light border">
                  <img src="https://picsum.photos/300/200" style={{'width':'150px', 'height':'100px', 'object-fit' : 'cover'}}></img>
                </Col>
                <Col className="bg-light border">
                  <img src="https://picsum.photos/300/200" style={{'width':'150px', 'height':'100px', 'object-fit' : 'cover'}}></img>
                </Col>
              </Row>
            </Container>
          </div>
        </CardBody>
      </Card>
    </Col>
    <Col>
      <Card style={{'height': '90vh'}}>
        <CardHeader>
        <h5>Resize & Compress</h5>
        </CardHeader>
        <CardBody style= {{textAlign:'center'}}>
          <div style={{
            paddingTop: '20%',
            backgroundColor: 'green',
            display: 'flex',
            justifyContent: 'center',
            margin: 'auto',
            width: '50%'
            }}>
            <img src="https://picsum.photos/300/200" style={{width:'100px', height:'100px', position: 'relative', objectFit : 'cover'}}></img>
          </div>
          <h6 className="mt-2">
            <a href=''>image.png</a>
          </h6>
          <h5 className="mt-2">
            <p>Resolutions</p>
          </h5>
          <ListGroup className="mt-3" style={{'width': '66%', 'margin':'auto', 'textAlign':'left'}}>
            <ListGroupItem>
              <Input type="checkbox" />&nbsp;
              <Label check>Facebook Post</Label>
            </ListGroupItem>
            <ListGroupItem>
              <Input type="checkbox" />&nbsp;
              <Label check>Instagram Post</Label>
            </ListGroupItem>
            <ListGroupItem>
              <Input type="checkbox" />&nbsp;
              <Label check>LinkedIn...</Label>
            </ListGroupItem>
            <ListGroupItem>
              <Input type="checkbox" />&nbsp;
              <Label check>...</Label>
            </ListGroupItem>
            <ListGroupItem>
              <Input type="checkbox" />&nbsp;
              <Label check>...</Label>
            </ListGroupItem>
          </ListGroup>

          <Button className="mt-3" color="success">Download</Button>
        </CardBody>
      </Card>
    </Col>
    <Col>
      <Card style={{height: '90vh'}}>
        <CardHeader>
          <h5>History</h5>
        </CardHeader>
        <CardBody>
          <ListGroup>
            <ListGroupItem>
              <BsSearch/>&nbsp;
              <a href=''>&quot;frog&quot;</a>
            </ListGroupItem>
            <ListGroupItem>
              <BsSearch/>&nbsp;
              <a href=''>&quot;trees&quot;</a>
            </ListGroupItem>
            <ListGroupItem>
              <BsSearch/>&nbsp;
              <a href=''>&quot;nature&quot;</a>
            </ListGroupItem>
          </ListGroup>
        </CardBody>
      </Card>
    </Col>
  </Row>
</Container>
    </>
  )
}

export default App
