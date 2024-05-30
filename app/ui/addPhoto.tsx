const AddPhoto = () => {
  return (
    <div className="flex flex-col gap-4">
      <h1>Dodaj zdjęcie</h1>
      <input type="file" />
      <input type="text" placeholder="Tytuł" />
      <input type="text" placeholder="Opis" />
      <input type="text" placeholder="Tagi" />
      <button>Dodaj</button>
    </div>
  );
};
export default AddPhoto;
