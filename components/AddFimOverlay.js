import styles from "./AddFilmOverlay.module.scss";
import { connect } from "react-redux";
import { TOGGLE_OVERLAY } from "../redux/store";

const mapDispatchToProps = {
  TOGGLE_OVERLAY,
};

function AddFilmOverlay(props) {
  return (
    <div onClick={() => props.TOGGLE_OVERLAY()} className={styles.container}>
      <span className="material-icons">close</span>
      <input type="text" name="overlay__search" id="overlay__search" />
    </div>
  );
}

export default connect(null, mapDispatchToProps)(AddFilmOverlay);
