import clsx from "clsx";
import { routes } from "../routes";
import styles from "./header-menu.module.scss";
interface Props {
  setHandle: (isOpen: false) => void;
  isOpen: boolean;
}
const scrollToElement = (elementId: string) => {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
};
const HeaderMenu = ({ setHandle, isOpen }: Props) => {
  return (
    <div className={clsx(styles.header__menu, isOpen && styles.open)}>
      <div className={styles.menu__top}>
        <div
          className={styles.menu__close}
          onClick={() => setHandle(false)}
        ></div>
      </div>
      <section className={styles.menu__content}>
        {routes.map((item) => (
          <p key={item.routeID} onClick={() => scrollToElement(item.routeID)}>
            {item.name}
          </p>
        ))}
      </section>
      <p className={styles.menu__phone}>+971 58 586 1961</p>
    </div>
  );
};
export default HeaderMenu;
