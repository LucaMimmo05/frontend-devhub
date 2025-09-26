import { useState } from "react";
import "../styles/tagsinput.css";

const TagsInput = ({ onChange, name }) => {
    const [tags, setTags] = useState([]);
    const [inputValue, setInputValue] = useState("");

    const handleKeyDown = e => {
        if (e.key === "Enter" && inputValue.trim() !== "") {
            e.preventDefault();
            const newTags = [...tags, inputValue.trim()];

            setTags(newTags);
            setInputValue("");
            onChange && onChange(newTags);
        }
    };

    const removeTag = index => {
        const newTags = tags.filter((_, i) => i !== index);

        setTags(newTags);
        onChange && onChange(newTags);
    };

    return (
        <div className="tags-input">
            {tags.map((tag, index) => (
                <div key={index} className="tag">
                    {tag}
                    <button type="button" onClick={() => removeTag(index)}>
                        x
                    </button>
                </div>
            ))}
            <input
                name={name}
                className="tag-input"
                type="text"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type and press Enter"
            />
        </div>
    );
};

export default TagsInput;
