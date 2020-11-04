import styles from "./AddFilmOverlay.module.scss";
import { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { TOGGLE_OVERLAY, LOOK_UP } from "../redux/store";
import { CSSTransition } from "react-transition-group";
import cc from "classcat";

const mapStateToProps = (state) => {
  return { isLoading: state.filmsStore.loading };
};

const mapDispatchToProps = {
  TOGGLE_OVERLAY,
};

function AddFilmOverlay(props) {
  const [queryName, setQueryName] = useState(null);
  const [queryType, setQueryType] = useState(null);
  const [queryYear, setQueryYear] = useState(null);

  useEffect(() => {
    document.body.classList.add("non-scrollable");
  }, []);

  useEffect(() => {
    return () => {
      document.body.classList.remove("non-scrollable");
    };
  }, []);

  const dispatch = useDispatch();

  function performSearch() {
    dispatch(
      LOOK_UP({
        title: queryName,
        type: queryType,
        year: queryYear,
      })
    );
  }

  return (
    <div className={styles.container}>
      <div
        className={styles.overlay__close}
        onClick={() => props.TOGGLE_OVERLAY()}
      >
        <span className="material-icons">close</span>
      </div>
      {!props.isLoading && (
        <div className={styles.overlay__content}>
          <h2 className={cc(["heading", "h2", styles.required])}>
            I am searching for:
          </h2>
          <input
            type="text"
            name="search"
            className={styles.overlay__search}
            placeholder="Name"
            value={queryName}
            onChange={(event) => setQueryName(event.target.value)}
          />
          <div
            onChange={(event) => setQueryType(event.target.value)}
            className={styles.choice__radios}
          >
            <h3 className={cc(["heading", "h3", styles.required])}>
              Which is the name of a(n):
            </h3>
            <div className={styles.radio__container}>
              <input
                defaultChecked={queryType === "movie"}
                type="radio"
                value="movie"
                name="type"
                id="choice__film"
              />
              <label htmlFor="choice__film">Film</label>
            </div>
            <div className={styles.radio__container}>
              <input
                defaultChecked={queryType === "series"}
                type="radio"
                value="series"
                name="type"
                id="choice__series"
              />
              <label htmlFor="choice__series">Series</label>
            </div>
            <div className={styles.radio__container}>
              <input
                defaultChecked={queryType === "episode"}
                type="radio"
                value="episode"
                name="type"
                id="choice__episode"
              />
              <label htmlFor="choice__episode">Episode</label>
            </div>
          </div>
          <div className={styles.year__select}>
            <h3 className="heading h3">Released in:</h3>
            <input
              value={queryYear}
              type="number"
              name="year"
              className={styles.year__input}
              placeholder="Year"
              min="1888"
              max="2022"
              onChange={(event) => setQueryYear(event.target.value)}
            />
          </div>
          <div className={styles.query__submit} onClick={() => performSearch()}>
            Search!
          </div>
        </div>
      )}
      <CSSTransition
        in={props.isLoading}
        timeout={300}
        unmountOnExit
        classNames="ride"
      >
        <img
          className="loading__spinner"
          src="/loader.gif"
          alt="Loading spinner"
        />
      </CSSTransition>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(AddFilmOverlay);
