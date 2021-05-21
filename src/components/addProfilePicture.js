import React, { useEffect, useContext, useState } from "react";
import { AuthContext } from "../firebase/Auth";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import { doUpdateProfile } from "../firebase/FirebaseFunctions";
import image_not_available from "../css/image_not_available.jpeg";
import "../css/account.css";

import { Container, Row, Col, Form, Button } from "react-bootstrap";

import Resizer from "react-image-file-resizer";
const axios = require("axios");

var firestore = firebase.firestore();
var storage = firebase.storage();

function AddprofilePicture() {
  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        250,
        250,
        "JPEG",
        100,
        0,
        (uri) => {
          resolve(uri);
          // console.log(uri);
        },
        "file"
      );
    });
  // const resizeFile = (file) => {
  //   Resizer.imageFileResizer(file, 250, 250, "JPEG", 100, 0, uri, "base64");
  // };

  const { currentUser } = useContext(AuthContext);

  const [myFireBaseData, setMyFireBaseData] = useState(undefined);

  const docRef = firestore.doc("users/" + currentUser.uid);

  const [uploadImage, setUploadImage] = useState(image_not_available);

  let name = currentUser.displayName;
  let address = "";
  let city = "";
  let state = "";
  let zip = "";
  var image = image_not_available;

  if (myFireBaseData != undefined) {
    name = myFireBaseData.userDisplayName;
    address = myFireBaseData.userAddress;
    city = myFireBaseData.userCity;
    state = myFireBaseData.userState;
    zip = myFireBaseData.userZip;
  }

  useEffect(() => {
    console.log("overview Use effect fired");
    async function fetchData() {
      // console.log("overview Use effect fired");
      try {
        await docRef.get().then((doc) => {
          if (doc && doc.exists) {
            setMyFireBaseData(doc.data());
          }
        });
      } catch (e) {
        console.log("error image", e);
      }

      try {
        await storage
          .ref("images/" + currentUser.uid)
          .child("profileImage")
          .getDownloadURL()
          .then((imageUrl) => {
            // image = imageUrl;
            setUploadImage(imageUrl);
            // console.log("imageurl", imageUrl);
          });
      } catch (e) {
        console.log("error: image hasn't been uploaded yet.");
      }
    }
    fetchData();
  }, []);

  var imageResized = "";
  const submitForm = async (event) => {
    event.preventDefault();
    const { username, address, city, state, zip, profileImage } =
      event.target.elements;

    if (profileImage.value) {
      const file = profileImage.files[0];
      imageResized = await resizeFile(file);
    }
    try {
      await doUpdateProfile(
        currentUser.uid,
        username.value,
        address.value,
        city.value,
        state.value,
        zip.value,
        imageResized,
        currentUser.photoURL
      );
      alert("Profile has been updated.");
      window.location.reload(false);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div>
      <Container className="container">
        <Row className="border border-dark profile-box">
          <Col>
            <img className="img-size" src={uploadImage} alt="profile pic" />
            <br></br>
            <h2>{currentUser.email}</h2>
          </Col>
          <Col>
            <h1>User Profile</h1>
            <Form className="form" onSubmit={submitForm}>
              <div className="form-group">
                <label>
                  Username:
                  <input
                    className="form-control"
                    type="text"
                    id="username"
                    name="username"
                    required
                    defaultValue={name}
                  />
                </label>
              </div>
              <div className="form-group">
                <label>
                  Address:
                  <input
                    className="form-control"
                    type="address"
                    id="address"
                    name="address"
                    placeholder="Address"
                    defaultValue={address}
                  />
                </label>
              </div>
              <div className="form-group">
                <label>
                  City:
                  <input
                    className="form-control"
                    type="text"
                    id="city"
                    name="city"
                    placeholder="City"
                    defaultValue={city}
                  />
                </label>
              </div>
              <div className="form-group">
                <label>
                  State:
                  <input
                    className="form-control"
                    type="text"
                    id="state"
                    name="state"
                    placeholder="State"
                    defaultValue={state}
                  />
                </label>
              </div>
              <div className="form-group">
                <label>
                  Zip:
                  <input
                    className="form-control"
                    id="zip"
                    name="zip"
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]{5}"
                    placeholder="Zip (input ex: 02302)"
                    defaultValue={zip}
                  />
                </label>
              </div>
              <br></br>
              <div className="form-group">
                <label>
                  Profile Image:
                  <input
                    className="form-control"
                    name="profileImage"
                    id="profileImage"
                    type="file"
                  />
                </label>
              </div>
              <br></br>
              <Button variant="primary" type="submit">
                Update Profile
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AddprofilePicture;
