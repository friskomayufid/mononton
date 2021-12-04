import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../../styles/Home.module.css";
import HeaderComponent from "../../components/Header";
import { API_KEY, API_URL, IMAGE_URL } from "../../utils/config";
import axios from "axios";
import { isEmpty } from "lodash";
import { formatter } from "../../utils/helper";
import { Layout, Menu, Button, Row, Col, Card, Input, Select } from "antd";

const DetailMovie = () => {
  const router = useRouter();
  const [detailMovie, setDetailMovie] = useState({});

  useEffect(() => {
    // Get Detail
    axios
      .get(
        `${API_URL}person/${router.query.id}?api_key=${API_KEY}&language=en-US&page=1`
      )
      .then(function (response) {
        setDetailMovie(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <div className={styles.container}>
      {!isEmpty(detailMovie) ? (
        <>
          <HeaderComponent />
          <Row className={styles.detailMovieWrap}>
            <Col md={12}>
              <h1 className={styles.title}>{detailMovie.name}</h1>
              <img src={IMAGE_URL + detailMovie.profile_path} alt="banner" />
            </Col>
            <Col md={12}>
              <h1>Biography</h1>
              <p>{detailMovie.biography}</p>
              <h1>Birth Date</h1>
              <p>{detailMovie.birthday}</p>
              <h1>Known For</h1>
              <p>{detailMovie.known_for_department}</p>
              <h1>Place of Birth</h1>
              <p>{detailMovie.place_of_birth}</p>
            </Col>
          </Row>
        </>
      ) : (
        <h1>Detail Not Found</h1>
      )}
    </div>
  );
};

export default DetailMovie;
