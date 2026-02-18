import { AsyncDatabase } from "promised-sqlite3";
import path from "node:path";

export default async function MyNotes() {
  console.log("MyNotes rendered");

  async function fetchNotes() {
    const db = await AsyncDatabase.open(path.resolve(__dirname, "../notes.db"));
    const notes = await db.all("SELECT * FROM notes");
    await db.close();
    return notes;
  }

  const notes = await fetchNotes();
  return (
    <fieldset>
      <legend>My Notes</legend>
      <p>This component is rendered on the server.</p>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>{note.note}</li>
        ))}
      </ul>
    </fieldset>
  );
}
