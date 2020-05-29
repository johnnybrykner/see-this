import React, { useState, useEffect } from "react";
import styles from "./index.module.scss";
import Head from "next/head";
import FilmCard from "../components/FilmCard";
import TheNav from "../components/TheNav";

export default function Home() {
  const [films, setFilms] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const rawData = await fetch(
      "http://localhost:8888/.netlify/functions/getFilms"
    );
    const filmsData = await rawData.json();
    setFilms(filmsData);
  }

  function renderFilms() {
    return films.map((film) => <FilmCard key={film._id} filmData={film} />);
  }

  return (
    <div className="wrapper">
      <Head>
        <title>Home | See this</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav>
        <TheNav />
      </nav>

      <main className={styles.films__section}>
        <h1 className="heading">Hii, what are we watching tonight?</h1>
        <div className={styles.cards__container}>{renderFilms()}</div>
      </main>

      <footer></footer>
    </div>
  );
}
