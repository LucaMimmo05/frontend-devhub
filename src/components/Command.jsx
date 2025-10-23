import "../styles/command.css";
import { useState } from "react";
const Command = ({ data, onSave, setEditingCommand, setShowDeleteConfirm, setCommandToDelete }) => {
    const navigator = window.navigator;
    const [hasClicked, setHasClicked] = useState(false);
    const [commandData, setCommandData] = useState(data);
    const [commandInputValue, setCommandInputValue] = useState("");
    const [isEditingtitle, setIsEditingTitle] = useState(false);
    const [isEditingDescription, setIsEditingDescription] = useState(false);
    const [isEditingCommandText, setIsEditingCommandText] = useState(false);

    const handleClick = () => {
        navigator.clipboard.writeText(data.commandText);
        setHasClicked(true);
        // eslint-disable-next-line no-undef
        setTimeout(() => setHasClicked(false), 5000);
    };

    const handleCommandTextChange = e => {
        setCommandInputValue(e.target.value);
    };

    const handleKeyDown = e => {
        if (e.key === "Enter") {
            const parts = commandInputValue.split(" ");
            const cmd = parts[0] || "";
            const example = parts.slice(1).join(" ") || "";

            const newData = {
                ...commandData,
                commandText: cmd,
                example: example,
            };

            setCommandData(newData);
            setCommandInputValue("");
            setIsEditingTitle(false);
            setIsEditingDescription(false);
            setIsEditingCommandText(false);
            if (onSave) {
                onSave(newData);
            }
        }
    };

    return (
        <div className="command box">
            {isEditingtitle ? (
                <input
                    className="update-command"
                    type="text"
                    value={commandData.title}
                    onChange={e => setCommandData({ ...commandData, title: e.target.value })}
                    onBlur={() => setIsEditingTitle(false)}
                    onKeyDown={handleKeyDown}
                />
            ) : (
                <div className="command-header">
                    {" "}
                    <h2
                        onDoubleClick={() => {
                            setIsEditingTitle(true);
                            setEditingCommand(data);
                        }}
                    >
                        {commandData.title}
                    </h2>
                    <button
                        className="command-delete-btn"
                        onClick={() => {
                            setCommandToDelete(data);
                            setShowDeleteConfirm(true);
                        }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="20"
                            height="20"
                            color="#ffffff"
                            fill="none"
                        >
                            <path
                                d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671
                                                    18.0008 20.2879C17.6833 20.7431 17.2747
                                                    21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22
                                                    8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868
                                                    20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5"
                                stroke="#ffffff"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                            ></path>
                            <path d="M9 11.7349H15" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round"></path>
                            <path
                                d="M10.5 15.6543H13.5"
                                stroke="#ffffff"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                            ></path>
                            <path
                                d="M3 5.5H21M16.0555 5.5L15.3729 4.09173C14.9194 3.15626
                                                    14.6926 2.68852 14.3015
                                                    2.39681C14.2148 2.3321 14.1229 2.27454 14.0268 2.2247C13.5937
                                                    2 13.0739 2 12.0343
                                                    2C10.9686 2 10.4358 2 9.99549 2.23412C9.89791 2.28601 9.80479
                                                    2.3459 9.7171
                                                    2.41317C9.32145 2.7167 9.10044 3.20155 8.65842 4.17126L8.05273 5.5"
                                stroke="#ffffff"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                            ></path>
                        </svg>
                    </button>
                </div>
            )}

            <div className="command-content">
                {isEditingCommandText ? (
                    <input
                        className="update-command"
                        value={commandInputValue}
                        onChange={handleCommandTextChange}
                        onBlur={() => setIsEditingCommandText(false)}
                        onKeyDown={handleKeyDown}
                        autoFocus
                    />
                ) : (
                    <pre
                        onDoubleClick={() => {
                            setIsEditingCommandText(true);
                            setCommandInputValue(`${commandData.commandText} ${commandData.example}`.trim());
                            setEditingCommand(data);
                        }}
                    >
                        &gt; &nbsp;
                        <strong>{commandData.commandText}</strong> <em>{commandData.example}</em>
                    </pre>
                )}
                <button className="copy-button" onClick={handleClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path
                            d="M9 15C9 12.1716 9 10.7574 9.87868 9.87868C10.7574 9
                            12.1716 9 15 9H16C18.8284 9 20.2426 9 21.1213 9.87868C22
                            10.7574 22 12.1716 22 15V16C22 18.8284 22 20.2426 21.1213
                            21.1213C20.2426 22 18.8284 22 16 22H15C12.1716 22 10.7574
                            22 9.87868 21.1213C9 20.2426 9 18.8284 9 16V15Z"
                            stroke="#F1F1F1"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M16.9999 9C16.9975 6.04291 16.9528 4.51121 16.092
                            3.46243C15.9258 3.25989 15.7401 3.07418 15.5376 2.90796C14.4312
                            2 12.7875 2 9.5 2C6.21252 2 4.56878 2 3.46243 2.90796C3.25989
                            3.07417 3.07418 3.25989 2.90796 3.46243C2 4.56878 2 6.21252 2
                            9.5C2 12.7875 2 14.4312 2.90796 15.5376C3.07417 15.7401 3.25989
                            15.9258 3.46243 16.092C4.51121 16.9528 6.04291 16.9975 9 16.9999"
                            stroke="#F1F1F1"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    {hasClicked ? "Copied!" : "Copy"}
                </button>
            </div>
            {isEditingDescription ? (
                <input
                    className="update-command"
                    value={commandData.description}
                    onChange={e => setCommandData({ ...commandData, description: e.target.value })}
                    onBlur={() => setIsEditingDescription(false)}
                    onKeyDown={handleKeyDown}
                />
            ) : (
                <div className="command-description">
                    <p
                        onDoubleClick={() => {
                            setIsEditingDescription(true);
                            setEditingCommand(data);
                        }}
                    >
                        {" "}
                        {commandData.description}
                    </p>
                </div>
            )}
        </div>
    );
};

export default Command;
