import React, { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from 'next/router'
import styles from "../styles/Home.module.css";
import { Layout, Menu, Button, Row, Col, Card, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { API_KEY, API_URL, IMAGE_URL } from "../utils/config";
import axios from "axios";

const { Header, Footer } = Layout;
const { Search } = Input;

export default function Home() {
  const router = useRouter()
  const onSearch = (value) => console.log(value);
  const [nowPlay, setNowPlay] = useState([]);
  const [queryMovie, setQueryMovie] = useState('');
  const [popularMovie, setPopularMovie] = useState([]);

  useEffect(() => {
    // Get Now Playing
    axios
      .get(
        `${API_URL}movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`
      )
      .then(function (response) {
        setNowPlay(response.data.results.slice(0, 6));
      })
      .catch(function (error) {
        console.log(error);
      });

    // Get Popular Movie
    axios
      .get(
        `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`
      )
      .then(function (response) {
        setPopularMovie(response.data.results.slice(7, 16));
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const handleQuery = (e) => {
    setQueryMovie(e.target.value)
  }

  const handleSearch = (e) => {
    router.push(`/search-movie?movie=${queryMovie}`)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Mononton</title>
        <meta name="description" content="Mononton" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header className={styles.header}>
        <h1 className={styles.logo}>Mononton</h1>
        <Menu mode="horizontal">
          <Menu.Item key="Movie">{`Movie`}</Menu.Item>
          <Menu.Item key="Series">{`Series`}</Menu.Item>
          <Menu.Item key="Popular Actors">
            <Button>Popular Actors</Button>
          </Menu.Item>
        </Menu>
      </Header>
      <main>
        <div className={styles.jumbotron}>
          <img src="/images/banner.png" alt="banner" width="100%" />
          <h1>Cari Film Favorit Kamu di Mononton!</h1>
        </div>
        <div className={styles.card}>
          <Row gutter={[16, 16]}>
            <Col md={20}>
              <Input placeholder="Cari Film Favorit Kamu Disini ..." onChange={handleQuery} />
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
              <h1 className="text-center font-bold">Film Sedang Tayang Hari Ini</h1>
            </Col>
            {nowPlay
              ? nowPlay.map((movie) => {
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
          <Row gutter={[64, 32]}>
            <Col md={24}>
              <h1 className="text-center font-bold">Film Populer</h1>
            </Col>
            {popularMovie
              ? popularMovie.map((movie) => {
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
