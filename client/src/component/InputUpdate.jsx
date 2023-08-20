import handleChange from "../utils/handleChange";

// eslint-disable-next-line react/prop-types
const InputUpdate = ({ label, name, type, className, value, setValue,fieldValue }) => {
    return (
        <div>
            <label
                className="block"
            >
                {label}
            </label>
            <input
                name={name}
                type={type}
                value={fieldValue}
                onChange={(e) => handleChange(e, value, setValue)}
                className={`w-full p-2 block  focus:outline-none border focus:border-red-500 rounded ${className}`}
            />
        </div>
    );
};

export default InputUpdate;