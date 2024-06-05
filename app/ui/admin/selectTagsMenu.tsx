const SelectTagsMenu = (props: {
  tags: { name: string; count: number }[];
  selectedTags: string[];
  handleSetSelectedTags: (tags: string[]) => void;
  handleSetSelectedPhotos: (photo_ids: string[]) => void;
  selectedPhotos: string[];
  handleSwapPhotos: (selectedPhotos: string[]) => void;
}) => {
  return (
    <div>
      <div className="m-8 mt-0 mb-2 p-8 w-fit bg-dark-gray rounded-xl border border-[#909090] shadow-custom_shadow">
        {props.tags.map((tag, index) => {
          return (
            <div className="" key={index + "div"}>
              <label key={index + "label"} className="text-white text-nowrap">
                <input
                  type="checkbox"
                  className="m-2 w-4 h-4 bg-white border-2 border-gray-400 rounded-md cursor-pointer"
                  key={index}
                  {...(props.selectedTags.includes(tag.name)
                    ? { checked: true }
                    : { checked: false })}
                  value={tag.name}
                  onChange={(e) => {
                    if (e.target.checked) {
                      props.handleSetSelectedTags([
                        ...props.selectedTags,
                        tag.name,
                      ]);
                    } else {
                      props.handleSetSelectedTags(
                        props.selectedTags.filter((item) => item !== tag.name)
                      );
                    }
                  }}
                />
                {tag.name} <span className="text-[#909090]">({tag.count})</span>
              </label>
            </div>
          );
        })}
      </div>
      <div className="m-8 mt-0 p-8  bg-dark-gray rounded-xl border border-[#909090] shadow-custom_shadow">
        <button
          className={`bg-[#333333] w-full text-black p-2 rounded-md border hover:scale-[102%] hover:bg-[#444444] border-[#909090] shadow-custom_shadow`}
          onClick={() => {
            if (props.selectedPhotos.length === 0) {
              props.handleSetSelectedPhotos([""]);
            } else {
              props.handleSetSelectedPhotos([]);
            }
          }}
        >
          {props.selectedPhotos.length === 0 ? "Zamień zdjęcia" : "Anuluj"}
        </button>
        <button
          className={`${
            props.selectedPhotos.length === 2 && props.selectedPhotos[1] !== ""
              ? ""
              : "hidden"
          }  bg-[#333333] w-full text-black mt-3 p-2 rounded-md border hover:scale-[102%] hover:bg-[#444444] border-[#909090] shadow-custom_shadow`}
          onClick={() => {
            if (
              props.selectedPhotos.length === 2 &&
              props.selectedPhotos[1] !== ""
            ) {
              props.handleSwapPhotos(props.selectedPhotos);
              props.handleSetSelectedPhotos([]);
            }
          }}
        >
          Zamień
        </button>
        <p
          className={`${
            props.selectedPhotos[0] === "" || props.selectedPhotos[1] === ""
              ? "mt-6"
              : ""
          }`}
        >
          {props.selectedPhotos[0] === ""
            ? "Wybierz 1. zdjęcie"
            : props.selectedPhotos[0] !== "" && props.selectedPhotos[1] === ""
            ? "Wybierz 2. zdjęcie"
            : ""}
        </p>
      </div>
    </div>
  );
};

export default SelectTagsMenu;
