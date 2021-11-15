const README = `
  # Welcome!

  This simple note-taking app was created by Ilya Novikov as part of the AppAcademy React week.

  The app has the following 4 features implemented:

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
`;

module.exports = { README };
