import { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import cc from "classcat";
import styles from "./index.module.scss";
import Head from "next/head";
import FilmCard from "../components/FilmCard";
import TheNav from "../components/TheNav";
import AddFilmOverlay from "../components/AddFimOverlay";
import NotificationToast from "../components/NotificationToast";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    isOverlayOpen: state.overlayStore.open,
    showNotification: state.filmsStore.showNotification,
  };
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
      <CSSTransition
        in={props.isOverlayOpen}
        timeout={300}
        unmountOnExit
        classNames="slide"
      >
        <AddFilmOverlay />
      </CSSTransition>

      <CSSTransition
        in={props.showNotification}
        timeout={300}
        unmountOnExit
        classNames="bounce"
      >
        <NotificationToast />
      </CSSTransition>

      <div className={cc({ blurred: props.isOverlayOpen })}>
        <Head>
          <title>Home | See this</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <nav>
          <TheNav />
        </nav>

        <main className={styles.films__section}>
          <div className={styles.cards__container}>
            <h1 className="heading h1">Hii, what are we watching tonight?</h1>
            {renderFilms()}
          </div>
        </main>

        <footer></footer>
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(Home);
