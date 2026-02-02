import React, { useEffect, useState } from "react";

const COOKIE_KEY = "molos-cookie-banner-dismissed";

export default function CookieBanner(): JSX.Element | null {
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [bites, setBites] = useState(0);
  const [shattering, setShattering] = useState(false);

  useEffect(() => {
    try {
      const dismissed = window.localStorage.getItem(COOKIE_KEY);
      if (!dismissed) {
        setVisible(true);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  if (!visible) {
    return null;
  }

  const finalizeDismiss = () => {
    try {
      window.localStorage.setItem(COOKIE_KEY, "1");
    } catch {
      // Ignore storage errors; banner will reappear on refresh.
    }
    setVisible(false);
  };

  const handleDismiss = () => {
    if (exiting || shattering) {
      return;
    }
    setExiting(true);
    window.setTimeout(finalizeDismiss, 350);
  };

  const handleOk = () => {
    window.setTimeout(() => {
      const target = document.getElementById("quick-install");
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 450);
    handleDismiss();
  };

  const handleCookieClick = () => {
    if (exiting || shattering) {
      return;
    }
    if (bites < 4) {
      setBites((prev) => prev + 1);
      return;
    }
    setShattering(true);
    setExiting(true);
    window.setTimeout(finalizeDismiss, 600);
  };

  return (
    <div
      className={`molos-cookie-banner${exiting ? " is-exiting" : ""}${shattering ? " is-shattering" : ""}`}
      role="region"
      aria-live="polite"
    >
      <div className="molos-cookie-banner__inner">
        <button
          className="molos-cookie-banner__cookie"
          type="button"
          aria-label="Take a bite"
          onClick={handleCookieClick}
        >
          {[0, 1, 2, 3].map((bite) => (
            <span
              key={bite}
              className={`molos-cookie-banner__bite${bites > bite ? " is-active" : ""}`}
              aria-hidden="true"
            />
          ))}
        </button>
        <p className="molos-cookie-banner__text">
          I do not collect cookies but this was kinda empty
        </p>
        <div className="molos-cookie-banner__actions">
          <button
            className="molos-cookie-banner__button molos-cookie-banner__button--ghost"
            type="button"
            onClick={handleOk}
          >
            Ok got it
          </button>
          <button
            className="molos-cookie-banner__button"
            type="button"
            onClick={handleDismiss}
          >
            Nice try
          </button>
        </div>
      </div>
    </div>
  );
}
