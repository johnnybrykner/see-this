import styles from "./FilmCard.module.scss";
import { connect } from "react-redux";
import { addFilm } from "../redux/actions";

const mapDispatchToProps = {
  addFilm,
};

function FilmCard(props) {
  return (
    <section className={styles.container}>
      <img
        src={props.filmData.imageUrl}
        alt={props.filmData.title + "poster"}
        onClick={() => props.addFilm(props.filmData)}
      />
      <h1>
        {props.filmData.title} ({props.filmData.year})
      </h1>
    </section>
  );
}

export default connect(null, mapDispatchToProps)(FilmCard);
