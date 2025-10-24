import ModalInputField from "../components/ModalInputField";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import "../styles/settings.css";
import { deleteUserAccount, updateUserSettings } from "../service/userApi";
import DeleteModal from "../components/DeleteModal";

const Settings = () => {
    const { user, setUser, logout } = useAuth();
    const [name, setName] = useState(user?.name || "");
    const [surname, setSurname] = useState(user?.surname || "");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleSave = async e => {
        e.preventDefault();
        setIsSaving(true);
        try {
            // TODO: Add API call to save settings
            console.log("Saving:", { name, surname });
            const token = localStorage.getItem("accessToken");

            await updateUserSettings(token, { name, surname });
            setUser(prevUser => ({ ...prevUser, name, surname }));
        } catch (error) {
            console.error("Error saving settings:", error);
        } finally {
            setIsSaving(false);
        }
    };

    const handleChangePassword = async e => {
        e.preventDefault();

        if (password !== confirmPassword) {
            console.error("Passwords do not match");

            return;
        }

        setIsSaving(true);
        try {
            const token = localStorage.getItem("accessToken");

            await updateUserSettings(token, { password });
            setPassword("");
            setConfirmPassword("");
        } catch (error) {
            console.error("Error changing password:", error);
        } finally {
            setIsSaving(false);
        }
    };

    const handleDeleteAccount = async () => {
        const token = localStorage.getItem("accessToken");

        try {
            await deleteUserAccount(token);
        } catch (error) {
            console.error("Error deleting account:", error);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        logout();
    };

    return (
        <section className="settings">
            <div className="settings-top">
                <div className="title">
                    <h1>Settings</h1>
                    <p>Manage your account settings and preferences</p>
                </div>
            </div>
            <div className="settings-content">
                <div className="settings-box">
                    <div className="title">
                        <h2>Account Settings</h2>
                        <hr />
                    </div>
                    <form className="setting" onSubmit={handleSave}>
                        <div className="settings-items">
                            <div className="settings-item ">
                                <span>Name</span>
                                <ModalInputField
                                    type="text"
                                    value={name}
                                    name={"name"}
                                    onChange={e => setName(e.target.value)}
                                />
                            </div>
                            <div className="settings-item">
                                <span>Surname</span>
                                <ModalInputField
                                    type="text"
                                    value={surname}
                                    name={"surname"}
                                    onChange={e => setSurname(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="settings-actions">
                            <button className="button-save" type="submit" disabled={isSaving}>
                                {isSaving ? "Saving..." : "Save Changes"}
                            </button>
                        </div>
                    </form>
                </div>
                {showModal && (
                    <DeleteModal
                        onClose={handleCloseModal}
                        onCancel={() => setShowModal(false)}
                        onDelete={handleDeleteAccount}
                        title={user.name}
                        itemType="account"
                    />
                )}
                <div className="settings-box">
                    <div className="title">
                        <h2>Change Password</h2>
                        <hr />
                    </div>
                    <form className="setting" onSubmit={handleChangePassword}>
                        <div className="settings-items">
                            <div className="settings-item ">
                                <span>Password</span>
                                <ModalInputField
                                    type="password"
                                    value={password}
                                    name={"password"}
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="settings-item">
                                <span>Confirm Password</span>
                                <ModalInputField
                                    type="password"
                                    value={confirmPassword}
                                    name={"confirmPassword"}
                                    onChange={e => setConfirmPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="settings-actions">
                            <button className="button-save" type="submit" disabled={isSaving}>
                                {isSaving ? "Saving..." : "Save Changes"}
                            </button>
                        </div>
                    </form>
                </div>
                <div className="settings-box danger-zone">
                    <div className="title">
                        <h2>Danger Zone</h2>
                        <hr />
                    </div>
                    <div className="danger-content">
                        <div className="danger-item">
                            <div className="danger-text">
                                <h3>Delete Account</h3>
                                <p>Permanently delete your account and all associated data</p>
                            </div>
                            <button className="button-danger" onClick={() => setShowModal(true)}>
                                Delete Account
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Settings;
