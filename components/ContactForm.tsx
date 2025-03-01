"use client";
import { SentMessageType } from "@/types/project";
import { sendMessage } from "@/utils/firebaseFunctions";
import { useForm } from "react-hook-form";
import styles from "./ContactForm.module.css";
import { useQueryClient } from "@tanstack/react-query";

export default function ContactForm() {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors, isSubmitSuccessful },
  } = useForm<SentMessageType>();

  console.log(errors);

  const onSubmit = handleSubmit((data) => {
    const messageData = { ...data, read: false, date: new Date() };
    sendMessage(messageData).then(() =>
      queryClient.invalidateQueries({ queryKey: ["messages"] })
    );
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
                  required: "First name is required",
                  minLength: {
                    value: 3,
                    message: "First name must be at least 3 characters",
                  },
                  maxLength: {
                    value: 11,
                    message: "First name must be at most 11 characters",
                  },
                })}
                className={styles.input}
                type="text"
                placeholder="First name"
                aria-label="First name"
                required
              />
              {errors.firstName && (
                <p className={styles.error}>{errors.firstName.message}</p>
              )}
            </div>

            <div className="w-full md:w-1/2 px-3">
              <label htmlFor="lastName" className="sr-only">
                Last Name
              </label>
              <input
                id="lastName"
                {...register("lastName", {
                  required: "Last name is required",
                  minLength: {
                    value: 2,
                    message: "Last name must be at least 2 characters",
                  },
                  maxLength: {
                    value: 11,
                    message: "Last name must be at most 11 characters",
                  },
                })}
                className={styles.input}
                type="text"
                placeholder="Last name"
                aria-label="Last name"
                required
              />
              {errors.lastName && (
                <p className={styles.error}>{errors.lastName.message}</p>
              )}
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
                  required: "Subject is required",
                  minLength: {
                    value: 5,
                    message: "Subject must be at least 5 characters",
                  },
                  maxLength: {
                    value: 40,
                    message: "Subject must be at most 40 characters",
                  },
                })}
                className={styles.input}
                type="text"
                placeholder="Subject"
                aria-label="Subject"
                required
              />
              {errors.subject && (
                <p className={styles.error}>{errors.subject.message}</p>
              )}
            </div>
            <div className="w-full md:w-3/5 px-3">
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email address",
                  },
                })}
                className={styles.input}
                type="email"
                placeholder="Email"
                aria-label="Email"
                required
              />
              {errors.email && (
                <p className={styles.error}>{errors.email.message}</p>
              )}
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
                  required: "Message is required",
                  minLength: {
                    value: 10,
                    message: "Message must be at least 10 characters",
                  },
                  maxLength: {
                    value: 270,
                    message: "Message must be at most 270 characters",
                  },
                })}
                className={`${styles.input} ${styles.textarea}`}
                placeholder="Your message"
                aria-label="Your message"
                required
              ></textarea>
              {errors.message && (
                <p className={styles.error}>{errors.message.message}</p>
              )}
            </div>
          </div>
          <div className="px-3">
            <button type="submit" className={styles.button}>
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </div>
          {isSubmitSuccessful && (
            <div className="px-3">
              <p className={styles.success}>Message sent successfully</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
