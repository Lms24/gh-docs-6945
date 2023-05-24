import "./style.css";

import * as Sentry from "@sentry/browser";

console.log("test");

const initialScope = new Sentry.Scope();
initialScope.update({
  user: { id: "1234-test" },
});

const sentryClient = new Sentry.BrowserClient({
  transport: Sentry.makeFetchTransport,
  stackParser: Sentry.defaultStackParser,
  integrations: Sentry.defaultIntegrations,
  dsn: import.meta.env.VITE_SENTRY_DSN,
  debug: true,
  initialScope, // This no-ops
});

const sentryHub = new Sentry.Hub(sentryClient, initialScope);

const btn1 = document.querySelector("#btn1");
btn1.addEventListener("click", () => {
  console.log("btn1 clicked");
  sentryHub.captureMessage("btn1 clicked");
});

console.log("test3");
