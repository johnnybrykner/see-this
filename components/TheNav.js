import styles from "./TheNav.module.scss";
import { connect } from "react-redux";
import { TOGGLE_OVERLAY } from "../redux/store";

const mapDispatchToProps = {
  TOGGLE_OVERLAY,
};

function TheNav(props) {
  return (
    <ul>
      <a onClick={() => props.TOGGLE_OVERLAY()}>Search for films</a>
    </ul>
  );
}

export default connect(null, mapDispatchToProps)(TheNav);
