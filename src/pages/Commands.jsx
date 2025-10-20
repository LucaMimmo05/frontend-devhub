import { useEffect } from "react";
import Button from "../components/Button";
import "../styles/commands.css";
import { getAllCommands, createCommand, updateCommand } from "../service";
import { useState } from "react";
import Command from "../components/Command";
import AddCommandModal from "../components/AddCommandModal";

const Commands = () => {
    const [commands, setCommands] = useState([]);
    const [showAddCommandModal, setShowAddCommandModal] = useState(false);
    const [editingCommand, setEditingCommand] = useState(null);

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
                // Update existing command
                const updatedCommand = await updateCommand(editingCommand.id, commandData, token);

                setCommands(commands.map(cmd => (cmd.id === editingCommand.id ? updatedCommand : cmd)));
                setEditingCommand(null);
            } else {
                // Create new command
                const newCommand = await createCommand(commandData, token);

                setCommands([...commands, newCommand]);
            }
            setShowAddCommandModal(false);
        } catch (error) {
            console.error("Error saving command:", error);
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

            <div className="commands-content">
                {commands.length === 0 ? (
                    <p>No commands available. Add a new command to get started!</p>
                ) : (
                    commands.map(command => <Command key={command.id} data={command} />)
                )}
            </div>
        </section>
    );
};

export default Commands;
