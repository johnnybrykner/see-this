import styles from "./TheNav.module.scss";
import Link from "next/link";

export default function TheNav() {
  return (
    <ul>
      <Link href="/add">
        <a>Add films</a>
      </Link>
    </ul>
  );
}
