import { useEffect } from "react";
import Button from "../components/Button";
import "../styles/commands.css";
import { getAllCommands, createCommand, updateCommand, deleteCommand } from "../service";
import { useState } from "react";
import Command from "../components/Command";
import AddCommandModal from "../components/AddCommandModal";
import DeleteModal from "../components/DeleteModal";
import Loader from "../components/Loader";
import { useToast } from "../context/ToastContext";
import EmptyState from "../components/EmptyState";

const Commands = () => {
    const [commands, setCommands] = useState([]);
    const [showAddCommandModal, setShowAddCommandModal] = useState(false);
    const [editingCommand, setEditingCommand] = useState(null);
    const [commandToDelete, setCommandToDelete] = useState(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [loading, setLoading] = useState(true);
    const { showSuccess, showError } = useToast();

    useEffect(() => {
        const fetchCommands = async () => {
            const token = localStorage.getItem("accessToken");

            try {
                const res = await getAllCommands(token);

                setCommands(res);
            } catch (error) {
                console.error("Error fetching commands:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCommands();
    }, []);

    const handleSaveCommand = async commandData => {
        const token = localStorage.getItem("accessToken");

        try {
            if (editingCommand) {
                console.log(editingCommand);

                const updatedCommand = await updateCommand(editingCommand.id, commandData, token);

                setCommands(commands.map(cmd => (cmd.id === editingCommand.id ? updatedCommand : cmd)));
                setEditingCommand(null);
                showSuccess("Command updated successfully");
            } else {
                const newCommand = await createCommand(commandData, token);

                setCommands([...commands, newCommand]);
                showSuccess("Command created successfully");
            }
            setShowAddCommandModal(false);
        } catch (error) {
            console.error("Error saving command:", error);
            showError(editingCommand ? "Failed to update command" : "Failed to create command");
        }
    };

    const handleDeleteCommand = async commandId => {
        setCommands(commands.filter(cmd => cmd.id !== commandId));

        try {
            const token = localStorage.getItem("accessToken");

            await deleteCommand(commandId, token);
            showSuccess("Command deleted successfully");
        } catch (error) {
            console.error("Error deleting command:", error);
            showError("Failed to delete command");
        }
    };

    return (
        <section className="commands">
            <div className="commands-top">
                <div className="title">
                    <h1>Commands</h1>
                    <p>Store your commands here for easy access.</p>
                </div>
                <Button
                    type={"add"}
                    onClick={() => {
                        setShowAddCommandModal(true);
                    }}
                />
            </div>
            {showAddCommandModal && (
                <AddCommandModal
                    onClose={() => {
                        setShowAddCommandModal(false);
                        setEditingCommand(null);
                    }}
                    onSave={handleSaveCommand}
                    edit={editingCommand !== null}
                    initialData={editingCommand || { title: "", commandText: "", example: "", description: "" }}
                />
            )}

            {showDeleteConfirm && (
                <DeleteModal
                    onClose={() => setShowDeleteConfirm(false)}
                    onDelete={() => handleDeleteCommand(commandToDelete.id)}
                    title={commandToDelete.title}
                    itemType="Command"
                />
            )}

            {loading ? (
                <Loader color="#4A90E2" size={60} />
            ) : commands.length === 0 ? (
                <EmptyState
                    icon={
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M9 3.5H5.5C4.67157 3.5 4 4.17157 4 5V18.5C4 19.3284 4.67157 20 5.5 20H18.5C19.3284 20 20 19.3284 20 18.5V15M14.5 3.5H18.5C19.3284 3.5 20 4.17157 20 5V9"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M7 13.5H11M7 9.5H13M7 17.5H9"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                        </svg>
                    }
                    title="No commands saved"
                    message="Store your frequently used commands here for quick access."
                    actionButton={
                        <Button
                            type={"add"}
                            onClick={() => {
                                setShowAddCommandModal(true);
                            }}
                        />
                    }
                />
            ) : (
                <div className="commands-list">
                    {commands.map(command => (
                        <Command
                            key={command.id}
                            data={command}
                            onSave={handleSaveCommand}
                            setEditingCommand={setEditingCommand}
                            setCommandToDelete={setCommandToDelete}
                            setShowDeleteConfirm={setShowDeleteConfirm}
                        />
                    ))}
                </div>
            )}
        </section>
    );
};

export default Commands;
