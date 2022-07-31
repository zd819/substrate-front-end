import React from "react";

import { Row, Col } from "reactstrap";
import BlogList from "../blogs/BlogList.jsx";
import NewListingForm from "../NewListing/NewListingForm.jsx";
import Profile from "../profile/Profile.jsx";
import Listings from "./Listings.jsx";

function ListingContainer() {
  return (
    <div className="container-fluid">
      <Row>
        <Col md={4}>
         <BlogList/>
        </Col>
        <Col md={8}>
          <Listings />
        </Col>
      </Row>
    </div>
  );
}

export default ListingContainer;
