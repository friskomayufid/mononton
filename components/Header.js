import React from "react";
import Head from "next/head";
import Link from "next/link";
import { Layout, Menu, Button } from "antd";
const { Header } = Layout;
import styles from "../styles/Home.module.css";

export default function HeaderComponent() {
  return (
    <>
      <Head>
        <title>Mononton</title>
        <meta name="description" content="Mononton" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header className={styles.header}>
        <Link href="/">
          <a>
            <h1 className={styles.logo}>Mononton</h1>
          </a>
        </Link>
        <Menu mode="horizontal">
          <Link href="/search-movie?movie=venom">
            <a>
              <Menu.Item key="Movie">{`Movie`}</Menu.Item>
            </a>
          </Link>
          <Link href="/search-series?series=squid">
            <a>
              <Menu.Item key="Series">{`Series`}</Menu.Item>
            </a>
          </Link>
          <Link href="/actors?movie=squid">
            <a>
              <Menu.Item key="Popular Actors">
                <Button>Popular Actors</Button>
              </Menu.Item>
            </a>
          </Link>
        </Menu>
      </Header>
    </>
  );
}
