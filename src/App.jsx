/* eslint-disable react/prop-types */
import './App.css'
import { getPhotosByQuery } from './api/fetchImage.js'
import { uploadImageToS3, pollForZips, readFileFromS3 } from './api/frontendServer.js'
import useInterval from './utils/useInterval.jsx'
import sleep from './utils/sleep.jsx'
import loadTest from './utils/loadTest.jsx'

import { useState, useCallback } from 'react'
import { Container, Row, Col, InputGroup, Button, Input, Card, CardBody, CardHeader, InputGroupText, FormFeedback, Alert, Badge, ListGroup, ListGroupItem, ButtonGroup } from 'reactstrap';
import { MdFilterAlt, MdOutlineArrowLeft, MdOutlineArrowRight, MdSearch } from "react-icons/md";
import { Gallery } from "react-grid-gallery";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";


function App() {
  // Find
  const [image, setImage] = useState({});
  // Worker
  const [zipName, setZipName] = useState("");
  // Download
  const [filter, setFilter] = useState("")
  const [quickFilterText, setQuickFilterText] = useState("")

  return (
  <>
<Container>
  <Row xs="1" s="2" md="2" lg="3">
    <Col>
      <FindCard {...{setImage, setZipName}}/>
    </Col>
    <Col>
      <WorkCard {...{image, zipName, setZipName, setFilter, setQuickFilterText}}/>
    </Col>
    <Col>
      <DownloadCard {... {filter, setFilter, quickFilterText, setQuickFilterText}}/>
    </Col>
  </Row>
</Container>
    </>
  )
}

function FindCard({setImage, setZipName}) {
  const [query, setQuery] = useState("");
  const [photos, setPhotos] = useState([]);
  const [invalid, setInvalid] = useState(false);

  const [page, setPage] = useState(1);

  const [loadCount, setLoadCount] = useState(30);
  const [loadDelay, setLoadDelay] = useState(500);
  const [loadStrikes, setLoadStrikes] = useState(0);


  const specialCharactersPattern = /[!@#$%^&*()+{}[\]:;<>,.?~\\]/;
  const handleInput = (e) => {
    if (specialCharactersPattern.test(e.target.value)) {
      setInvalid(true)
    } else {
      if (invalid) {
        setInvalid(false)
      }
      setQuery(e.target.value)
    }
  }

  function handleSearch() {
    setPhotos([])
    getPhotosByQuery(query, page).then(res => setPhotos(res))
  }

  function handlePageSearch(isLeft) {
    if (isLeft) {
      if (page > 1) {
        getPhotosByQuery(query, page - 1).then(res => setPhotos(res))
        setPage(page - 1)
      }
    } else {
      getPhotosByQuery(query, page + 1).then(res => setPhotos(res))
      setPage(page + 1)
    }
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
              onChange={handleInput}
              onKeyUp={e => {if (e.key === 'Enter') handleSearch()}}
              invalid={invalid}
              valid={query === "LOAD"}
              />
            <Button color={photos.length ? "secondary" : (query ? "success" : "info" )} onClick={() => handleSearch()}><MdSearch/></Button>
          </InputGroup>
          <div hidden = {!photos.length} style={{display:"inline-block", width:"100%"}}>
            <h5 className='my-2' style={{float:"left"}}>Results</h5>
            <ButtonGroup className='ms-3 mt-1' size='1' style={{boxShadow: "0px 0px 0px 0px", height: "0%", float:"right"}}>
              <Button onClick={() => handlePageSearch(true)}>
                <MdOutlineArrowLeft/>
              </Button>
              <Button>
                {page}
              </Button>
              <Button onClick={() => handlePageSearch(false)}>
                <MdOutlineArrowRight/>
              </Button>
            </ButtonGroup>
          </div>
          <Gallery images={photos} onClick={handleSelect} />
          <InputGroup hidden={query !== "LOAD"} className="my-3 pe-5">
            <InputGroupText>Count</InputGroupText>
            <Input value={loadCount} onChange={e => setLoadCount(e.target.value)}></Input>
          </InputGroup>
          <InputGroup hidden={query !== "LOAD"} className="my-3 pe-5">
            <InputGroupText>Delay</InputGroupText>
            <Input value={loadDelay} onChange={e => setLoadDelay(e.target.value)}></Input>
          </InputGroup>
          <Button 
          className='m-2' color='danger' 
          hidden={query !== "LOAD"}
          onClick={() => loadTest(loadCount, loadDelay, setLoadStrikes)}
          >Load Test</Button>
          <div className='ms-3'><Badge hidden={query !== "LOAD" || loadStrikes === 0} color="danger">Strikes: {loadStrikes}</Badge></div>
        </CardBody>
      </Card>
    </>
}

function WorkCard({image, zipName, setZipName, setFilter, setQuickFilterText}) {
  const [invalid, setInvalid] = useState(false);
  const [alert, setAlert] = useState(false);

  const specialCharactersPattern = /[!@#$%^&*()+{}[\]:;<>,.?~\\]/;

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

  const handleClick = async () => {
    setAlert(true);
    uploadImageToS3(image.url, zipName + ".jpg");
    setFilter(zipName + ".zip")
    setQuickFilterText(zipName + ".zip")
    setQuickFilterText
    await sleep(2000)
    setAlert(false)
  }

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
            width: '100%'
            }}>
            <img src={image.src} style={{width:'250px', height:'250px', position: 'relative', objectFit : 'cover'}}></img>
          </div>
          <h6 className="mt-2">
            <a target="_blank" rel="noopener noreferrer" href={image.link}>{image.creditName} {image.creditName? "| Unsplash" : <><i>select an image</i></>}</a>
          </h6> 
          <InputGroup className='mt-3'>
            <InputGroupText>
              Name
            </InputGroupText>
            <Input onChange={handleInput} value={zipName} disabled={!image.src} invalid={invalid}/>
            <FormFeedback tooltip className='m-1 ms-5'>Name cannot include special characters</FormFeedback>
          </InputGroup>
          <Button 
            className="mt-3" color="primary" 
            disabled={!image.src || !zipName}
            onClick={handleClick}>
            Resize image
          </Button>
          <Alert 
          className='mt-2' color="success" isOpen={alert} 
          toggle={() => setAlert(false)}
          style={{
            position: "fixed",
            zIndex: 2
          }}>
            Upload of &apos;{zipName}&apos; successful!
          </Alert>

          <ListGroup className='mt-3' style={{lineHeight: 1}}>
            <ListGroupItem>Standard (1920 x 1080)</ListGroupItem>
            <ListGroupItem>Facebook (1200 x 630)</ListGroupItem>
            <ListGroupItem>Instagram (1080 x 1920)</ListGroupItem>
            <ListGroupItem>Youtube (1280 x 720)</ListGroupItem>
            <ListGroupItem>X/Twitter (1600 900)</ListGroupItem>
            <ListGroupItem>LinkedIn (400 x 400)</ListGroupItem>
            <ListGroupItem>Pinterest (800 x 450)</ListGroupItem>
          </ListGroup>
        </CardBody>
      </Card>
  </>
}

function DownloadCard({filter, setFilter, quickFilterText, setQuickFilterText}) {
  useInterval(() => {
    pollForZips().then(data => setRowData(data))
  }, 3000) // 5 seconds

  const [rowData, setRowData] = useState([])


  async function handleFilter() {
    setQuickFilterText(filter)
  }

  const columnDefs = [
    { field: "name" },
    { field: "lastModified" },
    { field: "size" }
  ];

  const defaultColDef = {
    sortable: true,
    width: 188
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
        <div style={{ height: "10%", width: "100%" }}>
          <InputGroup>
            <Input 
              placeholder="Filter"
              onChange={e => setFilter(e.target.value)}
              onKeyUp={e => {if (e.key === 'Enter') handleFilter()}}
              value={filter}
              />
            <Button disabled={!rowData.length} color={filter && filter !== quickFilterText? "success" : "info"} onClick={handleFilter}><MdFilterAlt/></Button>
          </InputGroup>
        </div>
        <div className="ag-theme-alpine" style={{ height: "90%", width: "100%" }}>
          <AgGridReact 
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            pagination={true}
            paginationAutoPageSize={true}
            onCellDoubleClicked={cellDoubleClickedListener}
            quickFilterText={quickFilterText}
            />  
        </div>
        </CardBody>
      </Card>
  </>
}

export default App
