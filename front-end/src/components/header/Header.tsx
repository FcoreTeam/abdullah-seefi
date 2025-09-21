"use client";
import { useState } from "react";
import Image from "next/image";
import styles from "./header.module.scss";
import { routes } from "./routes";
import HeaderMenu from "./header-menu/Header-menu";

const Header = () => {
  const [isOpen, setOpen] = useState<boolean>(false);

  const handleMenu = (isOpen: boolean) => {
    setOpen(isOpen);
    console.log(isOpen);
  };

  const scrollToElement = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };
  return (
    <>
      <HeaderMenu isOpen={isOpen} setHandle={setOpen} />
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
              <p
                key={item.routeID}
                onClick={() => scrollToElement(item.routeID)}
              >
                {item.name}
              </p>
            ))}
          </div>
          <div
            className={styles.hedaer__burger}
            onClick={() => {
              handleMenu(true);
            }}
          >
            <span></span>
          </div>
          <div className={styles.header__phone}>+12 3454 6575 32</div>
        </div>
      </header>
    </>
  );
};
export default Header;
