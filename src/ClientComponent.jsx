"use client";

import React from "react";

export default function ClientComponent() {
  const [count, setCount] = React.useState(0);

  return (
    <fieldset>
      <legend>Client Component</legend>
      <p>This component is rendered on the client.</p>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
    </fieldset>
  );
}
