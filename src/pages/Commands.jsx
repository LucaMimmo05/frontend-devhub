import { useEffect } from "react";
import Button from "../components/Button";
import "../styles/commands.css";
import { getAllCommands } from "../service";
import { useState } from "react";
import Command from "../components/Command";

const Commands = () => {
    const [commands, setCommands] = useState([]);

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

    return (
        <section className="commands">
            <div className="commands-top">
                <div className="title">
                    <h1>Commands</h1>
                    <p>Store your commands here for easy access.</p>
                </div>
                <Button type={"add"} onClick={() => {}} />
            </div>

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
