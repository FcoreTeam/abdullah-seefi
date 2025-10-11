"use client";
import Image from "next/image";
import { useRef, useEffect, useState, useCallback } from "react";
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
  const introSectionRef = useRef<HTMLElement>(null);
  const aboutSectionRef = useRef<HTMLElement>(null);

  const animationValues = useRef({
    startOffset: 0,
    endOffset: 0,
    windowHeight: 0,
    translateYFactor: 1720,
    translateXFactor: 200,
  });

  useEffect(() => {
    const updateFactors = () => {
      const isMobileNow = window.innerWidth < 768;
      const isLowHeight = window.innerHeight < 836;

      let baseTranslateY = window.innerWidth < 1320 ? 1120 : 1520;
      let baseTranslateX = window.innerWidth < 1320 ? 200 : 600;

      if (isMobileNow) {
        baseTranslateY = 1420;
        baseTranslateX = 0;
      }

      if (isLowHeight) {
        baseTranslateY = 1250;
      }
      animationValues.current.translateYFactor = baseTranslateY;
      animationValues.current.translateXFactor = baseTranslateX;
    };

    updateFactors();
    window.addEventListener("resize", updateFactors);

    return () => {
      window.removeEventListener("resize", updateFactors);
    };
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();

    const handleResize = () => {
      checkMobile();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const updateImagePosition = useCallback(() => {
    const progress = currentProgress.current;
    const translateY = animationValues.current.translateYFactor * progress;
    const translateX = animationValues.current.translateXFactor * progress;

    setImageStyle({
      left: `${translateX}px`,
      top: `${translateY}px`,
      position: "relative",
      willChange: "left, top",
    });
  }, []);

  const calculateOffsets = useCallback(() => {
    if (!introSectionRef.current || !aboutSectionRef.current) return;

    const introRect = introSectionRef.current.getBoundingClientRect();
    const aboutRect = aboutSectionRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const scrollY = window.scrollY;

    animationValues.current.startOffset =
      introRect.top + scrollY + introRect.height - windowHeight * 0.7;
    animationValues.current.endOffset = aboutRect.top + scrollY;
    animationValues.current.windowHeight = windowHeight;
  }, []);

  useEffect(() => {
    calculateOffsets();

    const calculateProgress = () => {
      if (
        animationValues.current.startOffset === 0 &&
        animationValues.current.endOffset === 0
      ) {
        calculateOffsets();
        return 0;
      }

      const scrollY = window.scrollY;
      const { startOffset, endOffset } = animationValues.current;

      const progress = (scrollY - startOffset) / (endOffset - startOffset);
      return Math.max(0, Math.min(1, progress));
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

    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      const scrollY = window.scrollY;

      if (Math.abs(scrollY - lastScrollY) < 5) return;
      lastScrollY = scrollY;

      if (!ticking) {
        ticking = true;

        requestAnimationFrame(() => {
          const progress = calculateProgress();

          if (progress > maxProgress.current) {
            maxProgress.current = progress;
          }

          if (progress < maxProgress.current) {
            targetProgress.current = progress;
          } else {
            const maxAllowedProgress = 0.75;
            targetProgress.current = Math.min(progress, maxAllowedProgress);
            maxProgress.current = Math.min(maxProgress.current, 0.7);
          }

          if (!rafId.current) {
            rafId.current = requestAnimationFrame(smoothUpdate);
          }

          ticking = false;
        });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    const handleResizeForOffsets = () => {
      calculateOffsets();
    };

    window.addEventListener("resize", handleResizeForOffsets);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResizeForOffsets);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [isMobile, calculateOffsets, updateImagePosition]);

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
        <section
          className={styles.main__intro}
          id="intro"
          ref={introSectionRef}
        >
          <div className={styles.intro__left}>
            <h1 className={styles.intro__title}>My Lab</h1>
            <div className={styles.intro__description__pos}>
              <p>
                أكثر من مجرد عطر، ساش هو عطركِ الخاص من الصباح إلى المساء. دع
                حضوركِ يعبر عنكِ أكثر من الكلمات. ساش ، جري ومتوازن، مصمم لمن
                يُقدّرون الأناقة والعمق
              </p>
            </div>
            <div
              className={styles.intro__info}
              onClick={() => {
                scrollToElement("form");
              }}
            >
              <p>اكتب طلبا</p>
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
              مع ساش، كل دخول يبدأ قصة جديدة. ادخل إلى عالم تلتقي فيه الأناقة
              بالعمق. ساش تحيطك بالثقة وهالة متألقة تلفت الأنظار.
            </p>
            <div className={styles.scroll__particle}>
              <i></i>
              <p>Scrole</p>
            </div>
          </div>
        </section>

        <section
          className={styles.main__about}
          ref={aboutSectionRef}
          style={isMobile ? { paddingBottom: "500px" } : {}}
          id="about"
        >
          <div className={styles.main__text}>
            <h2>عن عطرنا</h2>
            <p>
              دع وجودك يتحدث بصوت أعلى من الكلمات. تجربة ساش -العطر الذي يصبح
              جزءا من قصتك.
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

        <section className={styles.main__composition} id="composition">
          <h2>تركيبة العطر</h2>
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
              <p className={styles.title}>أعلى الملاحظات</p>
              <p className={styles.description}> جلد </p>
            </div>
            <div className={styles.rect}>
              <p className={styles.title}>الملاحظات الوسطى</p>
              <p className={styles.description}> نجيل الهند وتيليا </p>
            </div>
            <div className={styles.rect}>
              {" "}
              <p className={styles.title}>الملاحظات السفلية</p>
              <p className={styles.description}>لبان والمسك</p>
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
                <p className={styles.title}>أعلى الملاحظات</p>
                <p className={styles.description}> جلد </p>
              </div>
              <div className={styles.middle}>
                <p className={styles.title}>الملاحظات الوسطى</p>
                <p className={styles.description}> نجيل الهند وتيليا </p>
              </div>
              <div className={styles.bottom}>
                <p className={styles.title}>الملاحظات السفلية</p>
                <p className={styles.description}>لبان والمسك</p>
              </div>
            </div>
          </div>
          <p>
            تشكل هذه المكونات معًا مزيجًا جذابًا ومقويًا، مثاليًا للفرد العصري
            الذي يقدر الأسلوب الحقيقي والمضمون.
          </p>
        </section>

        <section className={styles.main__form} id="form">
          <h2>اتصل بنا</h2>
          <div className={styles.form__wrap}>
            <p className={styles.form__text}>
              وراء كل عطر لا يُنسى، يكمن صاحب رؤية ثاقبة. مُبتكر عطر SASH هو
              خبير عطور يتمتع بحدس عميق، ينسج العواطف والذكريات في كل قطرة.
            </p>
            <MainForm />
            <p className={styles.form__text}>
              رضاك هو اولويتنا : الضمان الذهبي يكفل لك حق استرجاع كامل المبلغ في
              حال عدم رضاك عن المنتج.
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
            onClick={() => scrollToElement("intro")}
          >
            <p>العودة إلى الصفحة الرئيسية</p>
          </div>
          <p className={styles.copyright}>© 2025. All rights reserved</p>
          <a href="https://fcore.tech" className={styles.designed__by}>
            Designed by Fcore
          </a>
        </section>
      </main>
      <div className={styles.bg__footer}></div>
    </>
  );
};

export default Main;
