"use client";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import styles from "./main.module.scss";
import MainForm from "./main-form/Main-form";

const Main = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

 
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  
  const getAnimationValues = () => {
    if (typeof window === 'undefined') return { y: 1720, x: 200 };
    
    const isTablet = window.innerWidth < 1320;
    
    if (isTablet) {
      return { y: 1720, x: 200 };
    } else {
      return { y: 1520, x: 600 };
    }
  };

  const { y: translateYFactor, x: translateXFactor } = getAnimationValues();

  
  const translateY = useTransform(
    smoothProgress, 
    [0, 1], 
    [0, translateYFactor]
  );
  
  const translateX = useTransform(
    smoothProgress, 
    [0, 1], 
    [0, translateXFactor]
  );

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

      <main className={styles.main} ref={containerRef}>
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
          
         
         <div className={styles.intro__image}>
            
            <motion.div
  style={{
    translateY: translateY,  
    translateX: translateX, 
    willChange: "transform"
  }}
>
              <Image
                src="/parfume.png"
                width={760}      
                height={1160}    
                alt="parfume"
                priority={true}
              />
            </motion.div>
          </div>

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
              <p className={styles.title}>Excepteur sint</p>
              <p className={styles.description}>
                Lorem ipsum, Dolor sit amet, Consectetur adipiscing elit, Sed do
                eiusmod, Tempor incididunt
              </p>
            </div>
            <div className={styles.rect}>
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
          <p className={styles.copyright}>© 2025. All rights reserved</p>
          <p className={styles.designed__by}>Designed by Fcore</p>
        </section>
      </main>
      <div className={styles.bg__footer}></div>
    </>
  );
};

export default Main;