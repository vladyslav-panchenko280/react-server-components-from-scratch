import { Suspense } from "react";
import ServerComponent from "./ServerComponent";
import ClientComponent from "./ClientComponent";

export default function App() {
  console.log("App rendered");
  return (
    <div>
      <h1>React Server Components from Scratch</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <ServerComponent />
      </Suspense>
      <ClientComponent />
    </div>
  );
}
