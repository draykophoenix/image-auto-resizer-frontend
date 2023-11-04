/* eslint-disable react/prop-types */
import { useState } from 'react'
import { getPhotosByQuery } from './api/fetchImage.js'
import { requestJob } from './api/frontendServer.js'
import { Container, Row, Col, InputGroup, Button, Input, Label, Card, CardBody, ListGroup, ListGroupItem, CardHeader, InputGroupText } from 'reactstrap';
import { MdSearch } from "react-icons/md";
import { Gallery } from "react-grid-gallery";
import './App.css'

function App() {
  const [image, setImage] = useState({});
  const [zipName, setZipName] = useState("");

  return (
  <>
<Container>
  <Row xs="1" s="2" md="2" lg="3">
    <Col>
      <FindCard {...{setImage, setZipName}}/>
    </Col>
    <Col>
      <WorkCard {...{image, zipName, setZipName}}/>
    </Col>
    <Col>
      <DownloadCard/>
    </Col>
  </Row>
</Container>
    </>
  )
}

function FindCard({setImage, setZipName}) {
  const [query, setQuery] = useState("");
  const [photos, setPhotos] = useState([]) ;

  async function handleSearch() {
    setPhotos([])
    getPhotosByQuery(query).then(res => setPhotos(res))
  }

  const handleSelect = (index) => {
    const image = photos[index]
    setImage({
      src: image.src,
      url: image.url,
      link: image.link,
      creditName: image.creditName,
    });
    setZipName(query.replace(" ", "_"));
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
            <Button onClick={handleSearch}><MdSearch/></Button>
          </InputGroup>
          {(photos.length)? <h5 className='my-2'>Results</h5> : <></> }
          <Gallery images={photos} onClick={handleSelect} style={{backgroundColor: "green"}} />
        </CardBody>
      </Card>
    </>
}

function WorkCard({image, zipName, setZipName}) {

  return <>
    <Card style={{'height': '90vh'}}>
        <CardHeader>
        <h5>Resize & Compress</h5>
        </CardHeader>
        <CardBody style= {{textAlign:'center'}}>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            margin: 'auto',
            width: '50%'
            }}>
            <img src={image.src} style={{width:'250px', height:'250px', position: 'relative', objectFit : 'cover'}}></img>
          </div>
          <h6 className="mt-2">
            <a target="_blank" rel="noopener noreferrer" href={image.link}>{image.creditName} {image.creditName? "| Unsplash" : <><i>select an image</i></>}</a>
          </h6> 
          <InputGroup>
            <InputGroupText>
              Name
            </InputGroupText>
            <Input onChange={e => setZipName(e.target.value.replace(" ", "_"))} value={zipName} disabled={!image.src}/>
          </InputGroup>
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

          <Button className="mt-3" color="primary" onClick={() => requestJob(zipName, image.url)}>Send resize</Button>
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
              <MdSearch/>&nbsp;
              <a href=''>&quot;frog&quot;</a>
            </ListGroupItem>
            <ListGroupItem>
              <MdSearch/>&nbsp;
              <a href=''>&quot;trees&quot;</a>
            </ListGroupItem>
            <ListGroupItem>
              <MdSearch/>&nbsp;
              <a href=''>&quot;nature&quot;</a>
            </ListGroupItem>
          </ListGroup>
        </CardBody>
      </Card>
  </>
}

export default App
