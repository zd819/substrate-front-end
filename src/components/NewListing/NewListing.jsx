import React, { useState } from "react";
import { useLocation } from "react-router-dom";
// import "./NewListing.css";

import axios from "axios";

import {
  Form,
  FormGroup,
  Input,
  FormText,
  Label,
  Row,
  Col,
  Button,
  Container,
  Card,
} from "reactstrap";

function NewListing() {
  return (
    <Container>
      <NewListingForm />
    </Container>
  );
}

function NewListingForm() {
  const [listingData, setlistingData] = useState({
    name: "",
    summary: "",
    city: "",
    county: "",
    category: "",
    type: "",
    description: "",
    img_url: "",
    bedrooms: "",
    bathrooms: "",
    size: "",
    price: "",
  });

  const [urlData, setUrlData] = useState(null);

  function getImageUrl(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setUrlData(reader.result);
    };
  }

  function handleChange(event) {
    let key = event.target.name;
    let value;
    if (event.target.type === "select") {
      value = event.target.selected;
    } else {
      value = event.target.value;
    }

    if (event.target.type === "file") {
      const file = event.target.files[0];
      getImageUrl(file);
    }

    setlistingData({ ...listingData, [key]: value });
  }

  async function postListing(data) {
    try {
      await axios.post(`http://localhost:8002/properties`, data);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      let result = await axios.post("http://localhost:8001/api/v1/upload", {
        urlData
      });
      postListing({ ...listingData, img_url: result.data.secure_url });
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <Row className="m-5">
      <Col md={4}>
        <Card style={{ height: "100%" }}>
          <img
            src={urlData }
            style={{ width: "100%" }}
            alt=""
          />
        </Card>
      </Col>
      <Col md={8}>
        <Card style={{ height: "100%" }} className="p-5">
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="name">Name</Label>

                  <Input
                    onChange={handleChange}
                    value={listingData.name}
                    id="name"
                    name="name"
                    placeholder="Listing Name"
                    type="text"
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="size">Size</Label>

                  <Input
                    onChange={handleChange}
                    value={listingData.size}
                    id="size"
                    name="size"
                    placeholder="Listing Size in Square Feet"
                    type="number"
                    min={0}
                  />
                </FormGroup>
              </Col>
            </Row>
            <FormGroup>
              <Label for="summary">Summary</Label>

              <Input
                onChange={handleChange}
                value={listingData.summary}
                id="text"
                name="summary"
                type="text"
                placeholder="3 BR 1 BA House w/ Garage"
              />
            </FormGroup>
            <FormGroup>
              <Label for="price">Price</Label>

              <Input
                onChange={handleChange}
                value={listingData.price}
                id="price"
                name="price"
                placeholder="Listing Price"
              />
            </FormGroup>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="city">City</Label>

                  <Input
                    onChange={handleChange}
                    value={listingData.city}
                    id="city"
                    name="city"
                    type="text"
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="county">County</Label>

                  <Input
                    onChange={handleChange}
                    value={listingData.county}
                    id="county"
                    name="county"
                    type="text"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <FormGroup>
                  <Label for="bedrooms">Bedrooms</Label>

                  <Input
                    onChange={handleChange}
                    value={listingData.bedrooms}
                    id="bedrooms"
                    name="bedrooms"
                    type="number"
                    min={0}
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="bathrooms">Bathrooms</Label>

                  <Input
                    onChange={handleChange}
                    value={listingData.bathrooms}
                    id="bathrooms"
                    name="bathrooms"
                    type="number"
                    min={0}
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="category">for:</Label>

                  <Input
                    onChange={handleChange}
                    selected={listingData.category}
                    id="category"
                    name="category"
                    type="select"
                  >
                    <option defaultValue="Sale">Sale</option>
                    <option>Rent</option>
                    <option>Lease</option>
                  </Input>
                </FormGroup>
              </Col>
            </Row>
            <FormGroup row>
              <Label for="type" sm={2}>
                Type
              </Label>
              <Col sm={10}>
                <Input
                  onChange={handleChange}
                  selected={listingData.type}
                  id="type"
                  name="type"
                  type="select"
                >
                  <option defaultValue>Single Family Home</option>
                  <option>Attached House, Town House</option>
                  <option>Apartment, Condo</option>
                  <option>Commercial Property</option>
                  <option>Estate</option>
                  <option>Land Plot</option>
                </Input>
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label for="description" sm={2}>
                Description
              </Label>
              <Col sm={10}>
                <Input
                  onChange={handleChange}
                  value={listingData.description}
                  id="description"
                  name="description"
                  type="textarea"
                  rows={5}
                />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label for="img_url" sm={2}>
                File
              </Label>
              <Col sm={10}>
                <Input
                  accept="images/*"
                  onChange={handleChange}
                  value={listingData.img_url}
                  id="img_url"
                  name="img_url"
                  type="file"
                />
                <FormText>Add multiple images for your listing.</FormText>
              </Col>
            </FormGroup>
            <Button>Add Listing</Button>
          </Form>
        </Card>
      </Col>
    </Row>
  );
}

export default NewListing;
