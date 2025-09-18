import Image from "next/image";
import clsx from "clsx";
import { useState } from "react";
import styles from "./main-form.module.scss";
import { sendForm } from "@/api/requests";

export interface FormData {
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

  const validateForm = (type: "email" | "message" | "name"): boolean => {
    switch (type) {
      case "name":
        const nameRegex = /^[^\d]*$/;
        return formData.name.length >= 2 && nameRegex.test(formData.name);

      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(formData.email);

      case "message":
        return formData.message.length > 0 && formData.message.length <= 400;

      default:
        return false;
    }
  };
  const validateAllFields = (): boolean => {
    return (
      validateForm("name") && validateForm("email") && validateForm("message")
    );
  };

  const sendFormUi = async (data: FormData) => {
    if (validateAllFields()) {
      try {
        const response = await sendForm(data);
      } catch (err) {
        throw err;
      }
    } else {
      console.log("Форма содержит ошибки");
    }
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

      <button onClick={() => sendFormUi(formData)}>Send</button>
    </div>
  );
};
export default MainForm;
