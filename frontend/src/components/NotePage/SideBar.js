export default function SideBar ({ notes }) {
  console.log('sidebar', notes);
  return (
    <div className="note-sidebar-container">
      <h2>Your Notes</h2>
      {(Object.entries(notes).map(([id, note]) => {
        return <div key={id}>{note.title}</div>;
      }))}
    </div>
  );
}
