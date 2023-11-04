/* eslint-disable react/prop-types */
import { useState } from 'react'
import { getPhotosByQuery } from './fetchImage.js'
import { Container, Row, Col, InputGroup, Button, Input, Label, Card, CardBody, ListGroup, ListGroupItem, CardHeader  } from 'reactstrap';
import { BsSearch } from "react-icons/bs";
import { Gallery } from "react-grid-gallery";
import './App.css'

function App() {
  const [image, setImage] = useState({})

  return (
  <>
<Container>
  <Row xs="1" s="2" md="2" lg="3">
    <Col>
      <FindCard setImage={setImage}/>
    </Col>
    <Col>
      <WorkCard image={image}/>
    </Col>
    <Col>
      <DownloadCard/>
    </Col>
  </Row>
</Container>
    </>
  )
}

function FindCard({setImage}) {
  const [query, setQuery] = useState("");
  const [photos, setPhotos] = useState([]) ;

  async function handleSearch() {
    setPhotos([])
    getPhotosByQuery(query).then(res => setPhotos(res))
  }

  const handleSelect = (index, item) => {
    setImage({
      url: item.src, 
    });
  };

  return <>
      <Card style={{'height': '90vh'}}>
        <CardHeader>
          <h5>Find</h5>
        </CardHeader>
        <CardBody>
          <InputGroup>
            <Input 
              placeholder="Search" 
              onChange={e => setQuery(e.target.value)}
              onKeyUp={e => {if (e.key === 'Enter') handleSearch()}}
              />
            <Button onClick={handleSearch}><BsSearch/></Button>
          </InputGroup>
          <h6>
            Results
          </h6>
          <Gallery images={photos} onClick={handleSelect} />
        </CardBody>
      </Card>
    </>
}

function WorkCard({image}) {
  return <>
    <Card style={{'height': '90vh'}}>
        <CardHeader>
        <h5>Resize & Compress</h5>
        </CardHeader>
        <CardBody style= {{textAlign:'center'}}>
          <div style={{
            backgroundColor: 'green',
            display: 'flex',
            justifyContent: 'center',
            margin: 'auto',
            width: '50%'
            }}>
            <img src={image.url} style={{width:'250px', height:'250px', position: 'relative', objectFit : 'cover'}}></img>
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
  </>
}

function DownloadCard() {
  return <>
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
  </>
}

export default App
