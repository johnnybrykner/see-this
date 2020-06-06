import React, { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import styles from "./index.module.scss";
import Head from "next/head";
import FilmCard from "../components/FilmCard";
import TheNav from "../components/TheNav";
import AddFilmOverlay from "../components/AddFimOverlay";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return { isOverlayOpen: state.overlayStore.open };
};

function Home(props) {
  const [films, setFilms] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const rawData = await fetch("/.netlify/functions/getFilms");
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

      <CSSTransition
        in={props.isOverlayOpen}
        timeout={300}
        unmountOnExit
        classNames="slide"
      >
        <AddFilmOverlay />
      </CSSTransition>

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

export default connect(mapStateToProps)(Home);
