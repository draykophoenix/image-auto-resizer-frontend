/* eslint-disable react/prop-types */
import './App.css'
import { getPhotosByQuery } from './api/fetchImage.js'
import { uploadImageToS3, pollForZips, readFileFromS3 } from './api/frontendServer.js'
import useInterval from './utils/useInterval.jsx'
import sleep from './utils/sleep.jsx'
import loadTest from './utils/loadTest.jsx'

import { useState, useCallback } from 'react'
import { Container, Row, Col, InputGroup, Button, Input, Card, CardBody, CardHeader, InputGroupText, FormFeedback, Alert, Badge, ListGroup, ListGroupItem, ButtonGroup, ModalBody, ModalFooter, Modal, ModalHeader } from 'reactstrap';
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
  const [rowData, setRowData] = useState([])
  const [filter, setFilter] = useState("")
  const [quickFilterText, setQuickFilterText] = useState("")

  //Error Modal
  const [modal, setModal] = useState(false);
  const [modalHasDisplayed, setModalHasDisplayed] = useState(false);

  useInterval(() => {
    pollForZips()
    .then(data => {
      setRowData(data)
      setModalHasDisplayed(false)
    })
    .catch(err => {
      if (!modalHasDisplayed) {
        console.error(err)
        setModal(true)
        setModalHasDisplayed(true)
      }
    })
  }, 3000) // 5 seconds


  return (
  <>
<Container>
  <Row xs="1" s="2" md="2" lg="3">
    <Col>
      <FindCard {...{setImage, setZipName}}/>
    </Col>
    <Col>
      <WorkCard {...{image, zipName, setZipName, rowData, setFilter, setQuickFilterText}}/>
    </Col>
    <Col>
      <DownloadCard {... {rowData, filter, setFilter, quickFilterText, setQuickFilterText}}/>
    </Col>
  </Row>
</Container>
<ErrorModal {...{modal, setModal}}/>
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

function WorkCard({image, zipName, setZipName, rowData, setFilter, setQuickFilterText}) {
  const [invalid, setInvalid] = useState(false);
  const [alert, setAlert] = useState(false);
  const [invalidMessage, setInvalidMessage] = useState("");

  const invalidNoSpecialCharacters = "Name cannot include special characters"
  const invalidNameExists = "A zip with this name already exists"
  const specialCharactersPattern = /[!@#$%^&*()+{}[\]:;<>,.?~\\]/;

  const handleInput = (e) => {
    if (specialCharactersPattern.test(e.target.value)) {
      setInvalidMessage(invalidNoSpecialCharacters)
      setInvalid(true)
    } else {
      if (invalid) {
        setInvalid(false)
      }
      setZipName(e.target.value.replace(" ", "_"))
    }
  }

  const handleClick = async () => {
    if (rowData.find(item => item.name === (zipName + ".zip" ))) {
      setInvalidMessage(invalidNameExists);
      setInvalid(true);
      return
    }
    const res = await uploadImageToS3(image.url, zipName + ".jpg")
    if (res.err) {
      setInvalidMessage(res.err);
      setInvalid(true)
      return
    }
    setAlert(true);
    setFilter(zipName + ".zip");
    setQuickFilterText(zipName + ".zip");
    await sleep(2000);
    setAlert(false);
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
            <FormFeedback tooltip className='m-1 ms-5'>{invalidMessage}</FormFeedback>
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

function DownloadCard({rowData, filter, setFilter, quickFilterText, setQuickFilterText}) {
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

function ErrorModal({modal, setModal}) {
  const toggle = () => setModal(!modal);

  return <>
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>Error</ModalHeader>
        <ModalBody>
          Can not retrieve zip&apos;s from Frontend Server! 
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={toggle}>
            Close
          </Button>
        </ModalFooter>
    </Modal>
  </>
}

export default App
