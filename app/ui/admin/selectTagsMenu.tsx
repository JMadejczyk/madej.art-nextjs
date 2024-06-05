const SelectTagsMenu = (props: {
  tags: { name: string; count: number }[];
  selectedTags: string[];
  handleSetSelectedTags: (tags: string[]) => void;
}) => {
  return (
    <div className="m-8 mt-0 p-8 w-fit bg-dark-gray rounded-xl border border-[#909090] shadow-custom_shadow">
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
  );
};

export default SelectTagsMenu;
