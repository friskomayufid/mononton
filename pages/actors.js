import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";
import { Layout, Menu, Button, Row, Col, Card, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { API_KEY, API_URL, IMAGE_URL } from "../utils/config";
import axios from "axios";
import HeaderComponent from "../components/Header";

const { Footer } = Layout;
const { Search } = Input;

export default function Home() {
  const router = useRouter();
  const onSearch = (value) => console.log(value);
  const [nowPlay, setNowPlay] = useState([]);
  const [queryMovie, setQueryMovie] = useState("");
  const [popularMovie, setPopularMovie] = useState([]);

  useEffect(() => {
    // Get Now Playing
    axios
      .get(`${API_URL}person/popular?api_key=${API_KEY}&language=en-US&page=1`)
      .then(function (response) {
        setNowPlay(response.data.results);
      })
      .catch(function (error) {
        console.log(error);
      });

    // Get Popular Movie
    axios
      .get(`${API_URL}person/popular?api_key=${API_KEY}&language=en-US&page=1`)
      .then(function (response) {
        setPopularMovie(response.data.results);
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
  };

  return (
    <div className={styles.container}>
      <HeaderComponent />
      <main>
        <Row gutter={[64, 32]} style={{ width: "100%" }}>
          <Col md={24}>
            <h1 className="text-center font-bold">Aktor / Aktris Populer</h1>
          </Col>
          {nowPlay
            ? nowPlay.map((movie) => {
                return (
                  <Col md={6} key={movie.id}>
                    <div className={styles.movieCard}>
                      <img
                        src={IMAGE_URL + movie.profile_path}
                        alt="banner"
                        width="100%"
                        style={{ borderRadius: 10 }}
                      />
                      <p>{movie.name}</p>
                      <Row>
                        <Col md={12}>
                          <span className={styles.rating}>
                            {movie.known_for_department}
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
      </main>
      <Footer style={{ textAlign: "center" }}>Created By Kelompok 3</Footer>
    </div>
  );
}
