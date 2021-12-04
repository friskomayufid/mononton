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
        `${API_URL}tv/${router.query.id}?api_key=${API_KEY}&language=en-US&page=1`
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
              <img src={IMAGE_URL + detailMovie.poster_path} alt="banner" />
            </Col>
            <Col md={12}>
              <h1>Overview</h1>
              <p>{detailMovie.overview}</p>
              <h1>Release Date</h1>
              <p>{detailMovie.first_air_date}</p>
              <h1>Genre</h1>
              <p>
                {detailMovie.genres.map((genre) => {
                  return `${genre.name}, `;
                })}
              </p>
              <h1>Total Episode</h1>
              <p>{detailMovie.number_of_episodes}</p>
              <h1>Rating</h1>
              <p>{detailMovie.vote_average}</p> 
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
