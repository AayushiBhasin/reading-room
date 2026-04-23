import { useEffect, useRef, useState } from "react";
import "./Classic.css";

const OTP_LENGTH = 6;

function OtpInput({ value, onChange }) {
  const refs = useRef([]);
  const digits = Array.from({ length: OTP_LENGTH }, (_, i) => value[i] ?? "");

  const setDigit = (i, d) => {
    const arr = digits.slice();
    arr[i] = d;
    onChange(arr.join("").slice(0, OTP_LENGTH));
  };

  const handleChange = (i, e) => {
    const v = e.target.value.replace(/\D/g, "").slice(-1);
    if (!v) return;
    setDigit(i, v);
    if (i < OTP_LENGTH - 1) refs.current[i + 1]?.focus();
  };

  const handleKey = (i, e) => {
    if (e.key === "Backspace") {
      if (digits[i]) {
        setDigit(i, "");
      } else if (i > 0) {
        refs.current[i - 1]?.focus();
        setDigit(i - 1, "");
      }
    } else if (e.key === "ArrowLeft" && i > 0) {
      refs.current[i - 1]?.focus();
    } else if (e.key === "ArrowRight" && i < OTP_LENGTH - 1) {
      refs.current[i + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
    if (!pasted) return;
    onChange(pasted);
    const next = Math.min(pasted.length, OTP_LENGTH - 1);
    refs.current[next]?.focus();
  };

  return (
    <div className="classic-otp-row">
      {digits.map((d, i) => (
        <input
          key={i}
          ref={(el) => (refs.current[i] = el)}
          inputMode="numeric"
          maxLength={1}
          value={d}
          onChange={(e) => handleChange(i, e)}
          onKeyDown={(e) => handleKey(i, e)}
          onPaste={handlePaste}
          aria-label={`Digit ${i + 1}`}
          className="classic-otp-box"
        />
      ))}
    </div>
  );
}

export default function Classic() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [countdown, setCountdown] = useState(30);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (countdown <= 0) return;
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (otp.length !== OTP_LENGTH) return;
    setMessage(`Welcome back, ${email || "reader"}. OTP verified.`);
  };

  const handleResend = () => {
    if (countdown > 0) return;
    setCountdown(30);
    setMessage("New OTP sent. Please check your inbox.");
  };


  function handleClick(){
   alert("Please enter correct password")

  }
  return (
    <main className="classic-page">
      <aside className="classic-aside">
        <a href="/" className="classic-back">
          <span className="classic-back-arrow">←</span> Back to gallery
        </a>

        <div className="classic-aside-content">
          <svg
            className="classic-book-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
          </svg>

          <h2 className="classic-headline">
            A quiet hall of <em>infinite</em> stories.
          </h2>
          <div className="classic-divider" />
          <p className="classic-subtext">
            Step into the reading room. Your shelf, your loans, and a world of borrowed
            words await your member ID.
          </p>
        </div>

        <blockquote className="classic-quote">
          "A library is not a luxury but one of the necessities of life."
          <footer className="classic-quote-footer">— Henry Ward Beecher</footer>
        </blockquote>
      </aside>

      <section className="classic-form-section">
        <form onSubmit={handleSubmit} className="classic-form">
          <div className="classic-form-header">
            <p className="classic-eyebrow">Member sign-in</p>
            <h1 className="classic-title">Welcome to the Reading Room</h1>
            <p className="classic-description">
              Enter your details and the 6-digit code we sent to your inbox.
            </p>
          </div>

          <div className="classic-field">
            <label htmlFor="email-classic" className="classic-label">
              Member email
            </label>
            <input
              id="email-classic"
              type="email"
              placeholder="reader@library.org"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="classic-input"
            />
          </div>

          <div className="classic-field">
            <label className="classic-label classic-label-otp">Enter your password</label>
            <OtpInput value={otp} onChange={setOtp} />
          </div>

          <button
            type="submit"
            disabled={otp.length !== OTP_LENGTH}
            className="classic-submit"
            onClick={handleClick}
          >
            Verify & Sign In
          </button>

          {message && <p className="classic-message">{message}</p>}

          
        </form>
      </section>
    </main>
  );
}
