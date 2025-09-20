import Image from "next/image";
import clsx from "clsx";
import { useState } from "react";
import styles from "./main-form.module.scss";
import { sendForm } from "../../../api/requests";

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

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    message: false,
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleData = (key: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleFocus = (field: string) => {
    setTouched((prev) => ({
      ...prev,
      [field]: false,
    }));
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({
      ...prev,
      [field]: true,
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

  const showError = (field: "name" | "email" | "message"): boolean => {
    return touched[field] && !validateForm(field);
  };

  const validateAllFields = (): boolean => {
    return (
      validateForm("name") && validateForm("email") && validateForm("message")
    );
  };

  const sendFormUi = async (data: FormData) => {
    setTouched({
      name: true,
      email: true,
      message: true,
    });

    setFormSubmitted(true);

    if (validateAllFields()) {
      try {
        const response = await sendForm(data);
        setFormSubmitted(false);
        setFormData({
          name: "",
          message: "",
          email: "",
        });
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
        <div
          className={clsx(
            styles.input__wrap,
            showError("name") && styles.error
          )}
        >
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleData("name", e.target.value)}
            onFocus={() => handleFocus("name")}
            onBlur={() => handleBlur("name")}
            className={showError("name") ? styles.error : ""}
          />
          <div
            className={clsx(
              styles.complete,
              formData.name !== "" && validateForm("name") && styles.active,
              showError("name") && styles.error
            )}
          >
            <Image
              src="/check_white.svg"
              width={12}
              height={8}
              alt="check"
              className={clsx(
                formData.name !== "" &&
                  validateForm("name") &&
                  styles.active__img
              )}
            />
          </div>
        </div>

        <p>Your email</p>
        <div
          className={clsx(
            styles.input__wrap,
            showError("email") && styles.error
          )}
        >
          <input
            type="text"
            value={formData.email}
            onChange={(e) => handleData("email", e.target.value)}
            onFocus={() => handleFocus("email")}
            onBlur={() => handleBlur("email")}
            className={showError("email") ? styles.error : ""}
          />
          <div
            className={clsx(
              styles.complete,
              formData.email !== "" && validateForm("email") && styles.active,
              showError("email") && styles.error
            )}
          >
            <Image
              src="/check_white.svg"
              width={12}
              height={8}
              alt="check"
              className={clsx(
                formData.email !== "" &&
                  validateForm("email") &&
                  styles.active__img
              )}
            />
          </div>
        </div>

        <p>Message</p>
        <div
          className={clsx(
            styles.input__wrap,
            showError("message") && styles.error
          )}
        >
          <input
            type="text"
            value={formData.message}
            onChange={(e) => handleData("message", e.target.value)}
            onFocus={() => handleFocus("message")}
            onBlur={() => handleBlur("message")}
            className={showError("message") ? styles.error : ""}
          />
          <div
            className={clsx(
              styles.complete,
              formData.message !== "" &&
                validateForm("message") &&
                styles.active,
              showError("message") && styles.error
            )}
          >
            <Image
              src="/check_white.svg"
              width={12}
              height={8}
              alt="check"
              className={clsx(
                formData.message !== "" &&
                  validateForm("message") &&
                  styles.active__img
              )}
            />
          </div>
        </div>
      </div>

      <button onClick={() => sendFormUi(formData)}>Send</button>
    </div>
  );
};

export default MainForm;
