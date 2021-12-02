import React, { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";
import { Layout, Menu, Button, Row, Col, Card, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { API_KEY, API_URL, IMAGE_URL } from "../utils/config";
import axios from "axios";
const { Header, Footer } = Layout;
const { Search } = Input;
import HeaderComponent from "../components/Header";

export default function Home() {
  const router = useRouter();

  const onSearch = (value) => console.log(value);
  const [queryMovie, setQueryMovie] = useState(router.query.movie);
  const [movies, setMovies] = useState([]);
  const [popularMovie, setPopularMovie] = useState([]);

  console.log(queryMovie);

  const fetchMovie = () => {
    axios
      .get(
        `${API_URL}search/movie?api_key=${API_KEY}&query=${
          queryMovie ? queryMovie : router.query.movie
        }&language=en-US&page=1&include_adult=false`
      )
      .then(function (response) {
        setMovies(response.data.results.slice(0, 9));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    axios
      .get(
        `${API_URL}search/movie?api_key=${API_KEY}&query=${
          queryMovie ? queryMovie : router.query.movie
        }&language=en-US&page=1&include_adult=false`
      )
      .then(function (response) {
        setMovies(response.data.results.slice(0, 9));
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const handleQuery = (e) => {
    setQueryMovie(e.target.value);
  };

  const handleSearch = (e) => {
    router.push(`/search-movie?movie=${queryMovie}`);
    fetchMovie();
  };

  return (
    <div className={styles.container}>
      <HeaderComponent />
      <main>
        <div className={`${styles.card} ${styles.cardSearch}`}>
          <Row gutter={[16, 16]} className={styles.searchRow}>
            <Col md={20}>
              <Input
                placeholder="Cari Film Favorit Kamu Disini ..."
                value={queryMovie}
                onChange={handleQuery}
              />
            </Col>
            <Col md={4} className="text-center">
              <Button type="primary" onClick={handleSearch}>
                <SearchOutlined className={styles.icon} />
              </Button>
            </Col>
          </Row>
        </div>
        <div>
          <Row gutter={[64, 32]}>
            <Col md={24}>
              <h1 className="text-center font-bold">Hasil Pencarian</h1>
            </Col>
            {movies
              ? movies.map((movie) => {
                  return (
                    <Col md={8} key={movie.id}>
                      <div className={styles.movieCard}>
                        <img
                          src={IMAGE_URL + movie.poster_path}
                          alt="banner"
                          width="100%"
                          style={{ borderRadius: 10 }}
                        />
                        <p>{movie.title}</p>
                        <Row>
                          <Col md={12}>
                            <span className={styles.rating}>
                              {movie.vote_average} Ratings
                            </span>
                          </Col>
                          <Col md={12} className="text-right">
                            <span className={styles.date}>
                              {movie.release_date}
                            </span>
                          </Col>
                        </Row>
                      </div>
                    </Col>
                  );
                })
              : "No Data"}
          </Row>
        </div>
      </main>
      <Footer style={{ textAlign: "center" }}>Created By Kelompok 3</Footer>
    </div>
  );
}
