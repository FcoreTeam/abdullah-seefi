import Image from "next/image";
import clsx from "clsx";
import { useState } from "react";
import styles from "./main-form.module.scss";

interface FormData {
  name: string;
  email: string;
  message: string;
}
const MainForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  const handleData = (key: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  return (
    <div className={styles.main__form}>
      <div className={styles.form__inputs}>
        <p>Your name</p>
        <div className={styles.input__wrap}>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleData("name", e.target.value)}
          />
          <div
            className={clsx(
              styles.complete,
              formData.name !== "" && styles.active
            )}
          >
            <Image
              src="/check_white.svg"
              width={12}
              height={8}
              alt="check"
              className={formData.name !== "" ? styles.active__img : ""}
            />
          </div>
        </div>

        <p>Your email</p>
        <div className={styles.input__wrap}>
          <input
            type="text"
            value={formData.email}
            onChange={(e) => handleData("email", e.target.value)}
          />
          <div
            className={clsx(
              styles.complete,
              formData.email !== "" && styles.active
            )}
          >
            <Image
              src="/check_white.svg"
              width={12}
              height={8}
              alt="check"
              className={formData.email !== "" ? styles.active__img : ""}
            />
          </div>
        </div>
        <p>Message</p>
        <div className={styles.input__wrap}>
          <input
            type="text"
            value={formData.message}
            onChange={(e) => handleData("message", e.target.value)}
          />
          <div
            className={clsx(
              styles.complete,
              formData.message !== "" && styles.active
            )}
          >
            <Image
              src="/check_white.svg"
              width={12}
              height={8}
              alt="check"
              className={formData.message !== "" ? styles.active__img : ""}
            />
          </div>
        </div>
      </div>

      <button>Send</button>
    </div>
  );
};
export default MainForm;
