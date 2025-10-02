import "../styles/addbutton.css";
const AddButton = ({ type, onClick }) => {
    const renderButtonContent = () => {
        switch (type) {
            case "add":
                return "+";

            case "edit":
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 30 31" fill="none">
                        <path
                            d="
                                M4.72726 20.8865
                                L3.75 26.75
                                L9.61357 25.7727
                                C10.6318 25.6031 11.5716 25.1195 12.3015 24.3895
                                L25.5247 11.1661
                                C26.4917 10.199 26.4918 8.63112 25.5246 7.66407
                                L22.8359 4.9753
                                C21.8687 4.00822 20.3007 4.00823 19.3336 4.97533
                                L6.11051 18.1987
                                C5.38059 18.9286 4.89696 19.8684 4.72726 20.8865
                                Z"
                            stroke="#F1F1F1"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M17.5 8L22.5 13"
                            stroke="#F1F1F1"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                );

            default:
                return type;
        }
    };

    return (
        <button className={`add-button ${type !== "add" && type !== "edit" ? "text" : ""}`} onClick={onClick}>
            {renderButtonContent()}
        </button>
    );
};

export default AddButton;
