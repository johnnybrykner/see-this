import styles from "./NotificationToast.module.scss";
import { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { RESET_NOTIFICATION } from "../redux/store";
import cc from "classcat";

const mapStateToProps = (state) => {
  return { notificationText: state.filmsStore.notificationText };
};

function NotificationToast(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(RESET_NOTIFICATION());
    }, 4000);
  }, []);

  return (
    <div className={styles.notification__container}>
      <h1 className={cc(["heading", "h2", styles.notification__text])}>
        {props.notificationText}
      </h1>
    </div>
  );
}

export default connect(mapStateToProps)(NotificationToast);
