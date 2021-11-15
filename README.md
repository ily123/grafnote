<p align="center" alt="Logo of grafnote (purple crystal)">
  <img src="http://i.imgur.com/eXCFVIE.png" />
</p>
<div align="center">
  <img src="https://img.shields.io/badge/-React-blue" alt="React badge"/>
   <img src="https://img.shields.io/badge/-Express-blue" alt="Express badge"/>
  <img src="https://img.shields.io/badge/-PostgreSQL-blue" alt="PSQL badge"/>
  <img src="https://img.shields.io/badge/Heroku-blue" alt="Heroku badge"/>
   <img src="https://img.shields.io/badge/style-standard-blue" alt="React badge"/>

</div>
<br>
<div align="center">
<a href="https://grafnote.herokuapp.com/">
  <img src="https://img.shields.io/badge/live_website-red?style=for-the-badge" alt="Grafnote link"/>
<a>
</div>

This website is a MVP clone of [evernote.com](https://evernote.com), with [Obsidian](https://obsidian.md/)-inspired styling & layout. Live website can be found [here](https://grafnote.herokuapp.com/).


# Main features

  - Notes
    - users can create new Notes (note icon on top left)
    - users can rename Notes (input field in the top line)
    - users can delete Notes (trash can icon on top right)
    - users can assign notes to folders (top line dropdown)
  - Folders
    - users can create new folders (folder icon on top left)
    - users can delete folders (trash can icon next to folder name)
    - users can rename folders (double click on folder name)
      - rename is saved when you unfocus the field (onblur)
  - Markdown editor
    - users can switch between READ and EDIT mode (toggle in top line)
    - in EDIT mode, the text is entered in Markdown format
    - in READ mode, the markdown text is rendered
  - Autosave of note title and note content
    - as the user types the content is automatically patched (with 1 sec debounce)


  Feature not implemented (maybe in the future):
  - d3 visualizion of node connections (a graph!)
  - tokenized (ts-vector) search of note content

# Design Docs & Database Schema

Can be viewed in the [Project Wiki](https://github.com/ily123/grafnote/wiki).

# Deployment Instructions & Requirements

- Requires a `Postgres` installations
- Run the following commands (these instructions are incomplete)
	```
	git clone https://github.com/ily123/grafnote
	cd grafnote
	npm install
	npm start
	```
- Make sure to create & populate the `.env` file following the example given in `.env.example`.

# Tech Used

- Express backend
- React front-end with Redux state management
- Vanilla CSS

# Code Snippets

- Example below is of two react functional components: a `FileLink` and a `FolderLink` navigation items for the `SideBar` component.

```javascript
function FileLink ({ type, payload }) {
  const dispatch = useDispatch();
  return (
    <div
      className={type + '-link'}
      key={type + payload.id}
      onClick={() => dispatch(setActiveNoteId(payload.id))}
    >{payload.title}</div>
  );
}

function FolderLink ({ type, payload }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(payload.title);
  const [readOnly, setReadOnly] = useState(true);
  if (!payload || !type) return null;

  const sendNewTitle = () => {
    setReadOnly(true);
    dispatch(editFolderTitle(payload.id, title));
  };

  return (
    <div
      className={type + '-link'}
      key={type + payload.id}
    >
      <i className="fas fa-folder" style={{ paddingRight: '5px' }}></i>
      <input type="text"
        value={title}
        readOnly={readOnly}
        className={readOnly ? 'inactive' : 'active'}
        onDoubleClick={() => setReadOnly(false)}
        onBlur={(e) => sendNewTitle(e.target.value)}
        onChange={(e) => setTitle(e.target.value)}
      ></input>
      <i className="far fa-trash-alt"
        onClick={() => dispatch(deleteFolder(payload.id))}
      ></i>
    </div>
  );
};
```

# Screen shots

- Main note display (read mode)
![read note display](http://i.imgur.com/Yxlh2fj.png)

- Main note display (edit mode)
![Main note display (edit mode)](http://i.imgur.com/nerKc1D.png)

- Note navigation sidebar
![Note navigation sidebar](http://i.imgur.com/4RvPA14.png)
