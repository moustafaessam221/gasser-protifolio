import styles from "./ContactForm.module.css";

export default function ContactForm() {
  return (
    <div className={styles.container}>
      <div className="w-full max-w-2xl">
        <h1 className={styles.heading}>Let&apos;s work together</h1>
        <form className={styles.form}>
          <div className={styles.inputContainer}>
            <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
              <label htmlFor="firstName" className="sr-only">
                First Name
              </label>
              <input
                id="firstName"
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
                className={`${styles.input} ${styles.textarea}`}
                placeholder="Your message"
                aria-label="Your message"
                required
              ></textarea>
            </div>
          </div>
          <div className="px-3">
            <button type="submit" className={styles.button}>
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
