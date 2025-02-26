"use client";
import { useForm } from "react-hook-form";
import styles from "./ContactForm.module.css";
import { sendMessage } from "@/utils/firebaseFunctions";
import { SentMessageType } from "@/types/project";

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, isValid },
  } = useForm<SentMessageType>();

  const onSubmit = handleSubmit((data) => {
    const messageData = { ...data, read: false };
    sendMessage(messageData);
    reset();
  });
  return (
    <div className={styles.container} id="contact_me">
      <div className="w-full max-w-2xl">
        <h1 className={styles.heading}>Let&apos;s work together</h1>
        <form className={styles.form} onSubmit={onSubmit}>
          <div className={styles.inputContainer}>
            <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
              <label htmlFor="firstName" className="sr-only">
                First Name
              </label>
              <input
                id="firstName"
                {...register("firstName", {
                  required: true,
                  minLength: 3,
                  maxLength: 11,
                })}
                className={styles.input}
                type="text"
                placeholder="First name"
                aria-label="First name"
                required
              />
            </div>

            <div className="w-full md:w-1/2 px-3">
              <label htmlFor="lastName" className="sr-only">
                Last Name
              </label>
              <input
                id="lastName"
                {...register("lastName", {
                  required: true,
                  minLength: 2,
                  maxLength: 11,
                })}
                className={styles.input}
                type="text"
                placeholder="Last name"
                aria-label="Last name"
                required
              />
            </div>
          </div>
          <div className={styles.inputContainer}>
            <div className="w-full md:w-2/5 px-3 mb-4 md:mb-0">
              <label htmlFor="subject" className="sr-only">
                Subject
              </label>
              <input
                id="subject"
                {...register("subject", {
                  required: true,
                  minLength: 5,
                  maxLength: 40,
                })}
                className={styles.input}
                type="text"
                placeholder="Subject"
                aria-label="Subject"
                required
              />
            </div>
            <div className="w-full md:w-3/5 px-3">
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                {...register("email", {
                  required: true,
                  pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                })}
                className={styles.input}
                type="email"
                placeholder="Email"
                aria-label="Email"
                required
              />
            </div>
          </div>
          <div className="flex flex-wrap mb-6">
            <div className="w-full px-3">
              <label htmlFor="message" className="sr-only">
                Your Message
              </label>
              <textarea
                id="message"
                {...register("message", {
                  required: true,
                  minLength: 10,
                  maxLength: 270,
                })}
                className={`${styles.input} ${styles.textarea}`}
                placeholder="Your message"
                aria-label="Your message"
                required
              ></textarea>
            </div>
          </div>
          <div className="px-3">
            <button
              type="submit"
              className={styles.button}
              disabled={!isValid || isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
