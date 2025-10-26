import { RingLoader } from "react-spinners";

const Loader = ({ color, size }) => {
    return (
        <div className="loader">
            <RingLoader color={color} size={size} />
        </div>
    );
};

export default Loader;
