import styles from "./FilmCard.module.scss";
import { connect } from "react-redux";
import { ADD_FILM } from "../redux/store";

const mapDispatchToProps = {
  ADD_FILM,
};

function FilmCard(props) {
  return (
    <section className={styles.container}>
      <img
        src={props.filmData.imageUrl}
        alt={props.filmData.title + " poster"}
        onClick={() => props.ADD_FILM(props.filmData)}
      />
      <h2>
        {props.filmData.title} ({props.filmData.year})
      </h2>
    </section>
  );
}

export default connect(null, mapDispatchToProps)(FilmCard);
