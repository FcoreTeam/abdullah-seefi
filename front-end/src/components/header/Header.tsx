import Image from "next/image";
import styles from "./header.module.scss";
import { routes } from "./routes";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__content}>
        <div className={styles.logo__wrap}>
          <Image
            alt="logo"
            src="/logo.svg"
            width={1000}
            height={1000}
            className={styles.header__logo}
          />
          <p className={styles.header__name}>Abdullah Seefi</p>
        </div>

        <div className={styles.header__menu}>
          {routes.map((item) => (
            <p key={item.routeID}>{item.name}</p>
          ))}
        </div>
        <div className={styles.header__phone}>+12 3454 6575 32</div>
      </div>
    </header>
  );
};
export default Header;
