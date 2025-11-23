import "../styles/command.css";
import { useState } from "react";
import { useToast } from "../context/ToastContext";
const Command = ({ data, onSave, setEditingCommand, setShowDeleteConfirm, setCommandToDelete }) => {
    const navigator = window.navigator;
    const [hasClicked, setHasClicked] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [commandData, setCommandData] = useState(data);
    const [isEditingtitle, setIsEditingTitle] = useState(false);
    const [isEditingDescription, setIsEditingDescription] = useState(false);
    const [isEditingCommandText, setIsEditingCommandText] = useState(false);
    const { showSuccess } = useToast();

    const handleClick = () => {
        navigator.clipboard.writeText(data.commandText);
        setHasClicked(true);
        showSuccess("Command copied to clipboard");
        // eslint-disable-next-line no-undef
        setTimeout(() => setHasClicked(false), 5000);
    };

    const handleSaveCommand = async () => {
        setIsSaving(true);
        setIsEditingTitle(false);
        setIsEditingDescription(false);
        setIsEditingCommandText(false);
        if (onSave) {
            await onSave(commandData);
        }
        // eslint-disable-next-line no-undef
        setTimeout(() => setIsSaving(false), 1000);
    };

    const handleKeyDown = async e => {
        if (e.key === "Enter") {
            await handleSaveCommand();
        }
        if (e.key === "Escape") {
            setIsEditingTitle(false);
            setIsEditingDescription(false);
            setIsEditingCommandText(false);
            setCommandData(data);
        }
    };

    return (
        <div className={`command box ${isSaving ? "saving" : ""}`}>
            {isEditingtitle ? (
                <div className="editing-field">
                    <input
                        className="update-command editing"
                        type="text"
                        value={commandData.title}
                        onChange={e => setCommandData({ ...commandData, title: e.target.value })}
                        onBlur={() => setIsEditingTitle(false)}
                        onKeyDown={handleKeyDown}
                        placeholder="Command title"
                        autoFocus
                    />
                    <span className="edit-hint">Press Enter to save, Esc to cancel</span>
                </div>
            ) : (
                <div className="command-header">
                    {" "}
                    <h2
                        className="editable-field"
                        onClick={() => {
                            setIsEditingTitle(true);
                            setEditingCommand(data);
                        }}
                        title="Click to edit"
                    >
                        {commandData.title}
                        <svg
                            className="edit-icon"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="16"
                            height="16"
                            fill="none"
                        >
                            <path
                                d="M15.2141 5.98239L16.6158 4.58063C17.39 3.80646 18.6452 3.80646 19.4194 
                                4.58063C20.1935 5.3548 20.1935 6.60998 19.4194 7.38415L18.0176 
                                8.78591M15.2141 5.98239L6.98023 14.2163C5.93493 15.2616 5.41226 15.7842 
                                5.05637 16.4211C4.70047 17.058 4.3424 18.5619 4 20C5.43809 19.6576 
                                6.94199 19.2995 7.57889 18.9436C8.21579 18.5877 8.73844 18.0651 
                                9.78375 17.0198L18.0176 8.78591M15.2141 5.98239L18.0176 8.78591"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path d="M11 20H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
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
                    <div
                        className="editing-field command-editing"
                        onBlur={e => {
                            // Solo chiudi se il focus esce completamente dal container
                            if (!e.currentTarget.contains(e.relatedTarget)) {
                                setIsEditingCommandText(false);
                            }
                        }}
                    >
                        <div className="command-inputs-row">
                            <div className="command-input-group">
                                <input
                                    className="update-command editing command-text-input"
                                    value={commandData.commandText}
                                    onChange={e => setCommandData({ ...commandData, commandText: e.target.value })}
                                    onKeyDown={handleKeyDown}
                                    placeholder="command"
                                    autoFocus
                                />
                                <label className="input-label">Command</label>
                            </div>
                            <div className="command-input-group">
                                <input
                                    className="update-command editing command-example-input"
                                    value={commandData.example}
                                    onChange={e => setCommandData({ ...commandData, example: e.target.value })}
                                    onKeyDown={handleKeyDown}
                                    placeholder="--flags or arguments"
                                />
                                <label className="input-label">Arguments</label>
                            </div>
                        </div>
                        <span className="edit-hint">Enter to save, Esc to cancel</span>
                    </div>
                ) : (
                    <pre
                        className="editable-field"
                        onClick={() => {
                            setIsEditingCommandText(true);
                            setEditingCommand(data);
                        }}
                        title="Click to edit"
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
                <div className="editing-field">
                    <input
                        className="update-command editing"
                        value={commandData.description}
                        onChange={e => setCommandData({ ...commandData, description: e.target.value })}
                        onBlur={() => setIsEditingDescription(false)}
                        onKeyDown={handleKeyDown}
                        placeholder="Command description"
                        autoFocus
                    />
                    <span className="edit-hint">Press Enter to save, Esc to cancel</span>
                </div>
            ) : (
                <div className="command-description">
                    <p
                        className="editable-field"
                        onClick={() => {
                            setIsEditingDescription(true);
                            setEditingCommand(data);
                        }}
                        title="Click to edit"
                    >
                        {" "}
                        {commandData.description}
                    </p>
                </div>
            )}
            {isSaving && (
                <div className="saving-indicator">
                    <svg
                        className="saving-spinner"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="18"
                        height="18"
                        fill="none"
                    >
                        <path
                            d="M12 3V6M12 18V21M21 12H18M6 12H3M18.364 5.636L16.95 7.05M7.05 16.95L5.636 
                            18.364M18.364 18.364L16.95 16.95M7.05 7.05L5.636 5.636"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                        />
                    </svg>
                    <span>Saving changes...</span>
                </div>
            )}
        </div>
    );
};

export default Command;
