/* eslint-disable react/prop-types */
import './App.css'
import { getPhotosByQuery } from './api/fetchImage.js'
import { uploadImageToS3, pollForZips, readFileFromS3 } from './api/frontendServer.js'
import useInterval from './helper/useInterval.jsx'

import { useState, useCallback } from 'react'
import { Container, Row, Col, InputGroup, Button, Input, Card, CardBody, CardHeader, InputGroupText, FormFeedback } from 'reactstrap';
import { MdSearch } from "react-icons/md";
import { Gallery } from "react-grid-gallery";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";


function App() {
  const [image, setImage] = useState({});
  const [zipName, setZipName] = useState("");

  return (
  <>
<Container>
  <Row xs="1" s="2" md="2" lg="4">
    <Col lg="3">
      <FindCard {...{setImage, setZipName}}/>
    </Col>
    <Col lg="3">
      <WorkCard {...{image, zipName, setZipName}}/>
    </Col>
    <Col lg="6">
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
  
  const [invalid, setInvalid] = useState(false)

  const specialCharactersPattern = /[!@#$%^&*()_+{}[\]:;<>,.?~\\]/;
  const handleInput = (e) => {
    if (specialCharactersPattern.test(e.target.value)) {
      setInvalid(true)
    } else {
      if (invalid) {
        setInvalid(false)
      }
      setZipName(e.target.value.replace(" ", "_"))
    }

   
}


  return <>
    <Card style={{'height': '90vh'}}>
        <CardHeader>
        <h5>Resize & Compress</h5>
        </CardHeader>
        <CardBody className="mt-2" style= {{textAlign:'center'}}>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            margin: 'auto',
            width: '100%'
            }}>
            <img src={image.src} style={{width:'250px', height:'250px', position: 'relative', objectFit : 'cover'}}></img>
          </div>
          <h6 className="mt-3">
            <a target="_blank" rel="noopener noreferrer" href={image.link}>{image.creditName} {image.creditName? "| Unsplash" : <><i>select an image</i></>}</a>
          </h6> 
          <InputGroup className='mt-3'>
            <InputGroupText>
              Name
            </InputGroupText>
            <Input onChange={handleInput} value={zipName} disabled={/*!*/image.src} invalid={invalid}/>
            <FormFeedback tooltip className='m-1 ms-5'>Name cannot include special characters</FormFeedback>
          </InputGroup>
          <Button 
            className="mt-3" color="primary" 
            onClick={() => uploadImageToS3(image.url, zipName + ".jpg")}>
            Send resize
          </Button>
        </CardBody>
      </Card>
  </>
}

function DownloadCard() {
  useInterval(() => {
    pollForZips().then(data => setRowData(data))
  }, 3000) // 30 seconds

  const [rowData, setRowData] = useState([])

  const columnDefs = [
    { field: "name" },
    { field: "lastModified" },
    { field: "size" }
  ];

  const defaultColDef = {
    sortable: true,
    width: 188,
  };

  const cellDoubleClickedListener = useCallback( event => {
    readFileFromS3(event.data.name);
  }, []);

  return <>
    <Card style={{height: '90vh'}}>
        <CardHeader>
          <h5>History</h5>
        </CardHeader>
        <CardBody>
        <div className="ag-theme-alpine" style={{ height: "100%", width: "100%" }}>
          <AgGridReact 
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            pagination={true}
            paginationAutoPageSize={true}
            onCellDoubleClicked={cellDoubleClickedListener}
            />  
        </div>
        </CardBody>
      </Card>
  </>
}

export default App
