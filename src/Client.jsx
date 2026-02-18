import { createRoot } from "react-dom/client";
import { createFromFetch } from "react-server-dom-webpack/client";

const fetchPromise = fetch("/react-flight");

const root = createRoot(document.getElementById("root"));
const p = createFromFetch(fetchPromise);
root.render(p);
