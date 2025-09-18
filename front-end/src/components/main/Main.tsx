"use client";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import styles from "./main.module.scss";
import MainForm from "./main-form/Main-form";

const Main = () => {
  const imageRef = useRef<HTMLImageElement>(null);
  const [imageStyle, setImageStyle] = useState<React.CSSProperties>({});
  const [isMobile, setIsMobile] = useState(false);
  const targetProgress = useRef(0);
  const currentProgress = useRef(0);
  const rafId = useRef<number | null>(null);
  const maxProgress = useRef(0);

  useEffect(() => {
    // Проверка ширины экрана при загрузке
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile(); // Проверить при первоначальной загрузке

    const handleResize = () => {
      checkMobile();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    // Если мобильное устройство, не запускаем анимацию
    if (isMobile) {
      setImageStyle({});
      return;
    }

    const calculateProgress = () => {
      const introSection = document.querySelector(`.${styles.main__intro}`);
      const aboutSection = document.querySelector(`.${styles.main__about}`);

      if (!introSection || !aboutSection) return 0;

      const introRect = introSection.getBoundingClientRect();
      const aboutRect = aboutSection.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY;

      const startOffset =
        introRect.top + scrollY + introRect.height - windowHeight * 0.7;
      const endOffset = aboutRect.top + scrollY;

      const progress = (scrollY - startOffset) / (endOffset - startOffset);
      return Math.max(0, Math.min(1, progress));
    };

    const updateImagePosition = () => {
      const progress = currentProgress.current;
      const translateY =
        window.innerWidth < 1320 ? 1720 * progress : 1520 * progress;
      const translateX =
        window.innerWidth < 1320 ? 200 * progress : 600 * progress;

      setImageStyle({
        transform: `translate(${translateX}px, ${translateY}px)`,
        willChange: "transform",
      });
    };

    const smoothUpdate = () => {
      const diff = targetProgress.current - currentProgress.current;

      if (Math.abs(diff) > 0.001) {
        currentProgress.current += diff * 0.15;
        updateImagePosition();
        rafId.current = requestAnimationFrame(smoothUpdate);
      } else {
        currentProgress.current = targetProgress.current;
        updateImagePosition();
        rafId.current = null;
      }
    };

    const handleScroll = () => {
      const progress = calculateProgress();

      if (progress > maxProgress.current) {
        maxProgress.current = progress;
      }

      if (progress < maxProgress.current) {
        targetProgress.current = progress;
      } else {
        targetProgress.current = Math.min(progress, 0.75);
        maxProgress.current = Math.min(maxProgress.current, 0.7);
      }

      if (!rafId.current) {
        rafId.current = requestAnimationFrame(smoothUpdate);
      }
    };

    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
      }
    };

    window.addEventListener("scroll", throttledScroll, { passive: true });

    handleScroll();

    return () => {
      window.removeEventListener("scroll", throttledScroll);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [isMobile]);

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
      <div className={styles.main__bg}></div>
      <div className={styles.main__lines}></div>
      <div className={styles.composition__bg}></div>

      <main className={styles.main}>
        <section className={styles.main__intro} id="main__intro">
          <div className={styles.intro__left}>
            <h1 className={styles.intro__title}>Najd</h1>
            <div className={styles.intro__description__pos}>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
            <div className={styles.intro__info}>
              <p>نص نص</p>
            </div>

            <p className={styles.page__navigator}>
              <span style={{ color: "#fff" }}>01</span>
              <i style={{ background: "#fff" }}></i>
              <span>02</span>
              <i></i>
              <span>03</span>
              <i></i>
              <span>04</span>
            </p>
          </div>
          <Image
            ref={imageRef}
            src="/parfume.png"
            width={760}
            height={1160}
            alt="parfume"
            className={styles.intro__image}
            style={imageStyle}
            priority={true}
          />
          <div className={styles.intro__description}>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <div className={styles.scroll__particle}>
              <i></i>
              <p>Scrole</p>
            </div>
          </div>
        </section>
        <section className={styles.main__about}>
          <div className={styles.main__text}>
            <h2>Lorem ipsum dolor sit amet, consectetur</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris.
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum. Excepteur sint occaecat cupidatat non proident. Sunt in
              culpa qui officia deserunt mollit anim id est laborum. Nemo enim
              ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.
              Neque
            </p>
            <div className={styles.navigator__wrap}>
              <p className={styles.page__navigator}>
                <span>01</span>
                <i></i>
                <span style={{ color: "#fff" }}>02</span>
                <i style={{ background: "#fff" }}></i>
                <span>03</span>
                <i></i>
                <span>04</span>
              </p>
            </div>
          </div>
        </section>
        <section className={styles.main__composition}>
          <h2>Sed do eiusmod tempor incididunt</h2>
          <div className={styles.navigator__wrap}>
            <p className={styles.page__navigator}>
              <span>01</span>
              <i></i>
              <span>02</span>
              <i></i>
              <span style={{ color: "#fff" }}>03</span>
              <i style={{ background: "#fff" }}></i>
              <span>04</span>
            </p>
          </div>
          <div className={styles.composition__wrap}>
            <div className={styles.rect}>
              <p className={styles.title}>Duis aute</p>
              <p className={styles.description}>Lorem ipsum, Dolor sit amet</p>
            </div>
            <div className={styles.rect}>
              {" "}
              <p className={styles.title}>Excepteur sint</p>
              <p className={styles.description}>
                Lorem ipsum, Dolor sit amet, Consectetur adipiscing elit, Sed do
                eiusmod, Tempor incididunt
              </p>
            </div>
            <div className={styles.rect}>
              {" "}
              <p className={styles.title}>Sed do eiusmod</p>
              <p className={styles.description}>
                Lorem ipsum, Dolor sit amet, Consectetur adipiscing elit, Sed do
                eiusmod, Tempor incididunt, Ut labore et dolore, Magna aliqua
              </p>
            </div>
          </div>
          <div className={styles.compositionSVG}>
            <svg className={styles.svgTriangle} viewBox="0 0 1000 700">
              <polygon
                points="500,0 0,700 1000,700"
                fill="none"
                stroke="#ffffff33"
                strokeWidth="1"
                className={styles.triangleBorder}
              />
            </svg>
            <div className={styles.content}>
              <div className={styles.top}>
                <p className={styles.title}>Duis aute</p>
                <p className={styles.description}>
                  Lorem ipsum, Dolor sit amet
                </p>
              </div>
              <div className={styles.middle}>
                <p className={styles.title}>Excepteur sint</p>
                <p className={styles.description}>
                  Lorem ipsum, Dolor sit amet, Consectetur adipiscing elit, Sed
                  do eiusmod, Tempor incididunt
                </p>
              </div>
              <div className={styles.bottom}>
                <p className={styles.title}>Sed do eiusmod</p>
                <p className={styles.description}>
                  Lorem ipsum, Dolor sit amet, Consectetur adipiscing elit, Sed
                  do eiusmod, Tempor incididunt, Ut labore et dolore, Magna
                  aliqua
                </p>
              </div>
            </div>
          </div>
          <p>
            Excepteur sint occaecat cupidatat non proident. Sunt in culpa qui
            officia deserunt mollit anim id est laborum. Nemo enim ipsam
            voluptatem quia sit aspernatur aut odit aut fugit. Neque
          </p>
        </section>
        <section className={styles.main__form}>
          <h2>Nemo enim ipsam voluptatem quia sit</h2>
          <div className={styles.form__wrap}>
            <p className={styles.form__text}>
              Thats possibly amazing web-site, because into this information is
              very interesting
            </p>
            <MainForm />
            <p className={styles.form__text}>
              Thats possibly amazing web-site, because into this information is
              very interesting
            </p>
          </div>
          <div className={styles.navigator__wrap}>
            <p className={styles.page__navigator}>
              <span>01</span>
              <i></i>
              <span>02</span>
              <i></i>
              <span>03</span>
              <i></i>
              <span style={{ color: "#fff" }}>04</span>
            </p>
          </div>
          <div className={styles.plug}></div>
          <div
            className={styles.intro__info}
            onClick={() => scrollToElement("main__intro")}
          >
            <p>نص نص</p>
          </div>
        </section>
      </main>
      <div className={styles.bg__footer}></div>
    </>
  );
};

export default Main;
