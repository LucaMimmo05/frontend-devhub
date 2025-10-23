import { useEffect } from "react";
import Button from "../components/Button";
import "../styles/commands.css";
import { getAllCommands, createCommand, updateCommand, deleteCommand } from "../service";
import { useState } from "react";
import Command from "../components/Command";
import AddCommandModal from "../components/AddCommandModal";
import DeleteModal from "../components/DeleteModal";

const Commands = () => {
    const [commands, setCommands] = useState([]);
    const [showAddCommandModal, setShowAddCommandModal] = useState(false);
    const [editingCommand, setEditingCommand] = useState(null);
    const [commandToDelete, setCommandToDelete] = useState(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    useEffect(() => {
        const fetchCommands = async () => {
            const token = localStorage.getItem("accessToken");

            try {
                const res = await getAllCommands(token);

                setCommands(res);
            } catch (error) {
                console.error("Error fetching commands:", error);
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
            } else {
                const newCommand = await createCommand(commandData, token);

                setCommands([...commands, newCommand]);
            }
            setShowAddCommandModal(false);
        } catch (error) {
            console.error("Error saving command:", error);
        }
    };

    const handleDeleteCommand = async commandId => {
        setCommands(commands.filter(cmd => cmd.id !== commandId));

        try {
            const token = localStorage.getItem("accessToken");

            await deleteCommand(commandId, token);
        } catch (error) {
            console.error("Error deleting command:", error);
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

            <div className="commands-content">
                {commands.length === 0 ? (
                    <p>No commands available. Add a new command to get started!</p>
                ) : (
                    commands.map(command => (
                        <Command
                            key={command.id}
                            data={command}
                            onSave={handleSaveCommand}
                            setEditingCommand={setEditingCommand}
                            setCommandToDelete={setCommandToDelete}
                            setShowDeleteConfirm={setShowDeleteConfirm}
                        />
                    ))
                )}
            </div>
        </section>
    );
};

export default Commands;
