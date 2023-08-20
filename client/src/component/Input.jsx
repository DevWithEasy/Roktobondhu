import handleChange from "../utils/handleChange";

// eslint-disable-next-line react/prop-types
const Input = ({label,name,type,className,value,setValue}) => {
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
            onChange={(e)=>handleChange(e,value,setValue)}
            className={`w-full p-2 block  focus:outline-none border focus:border-red-500 rounded ${className}`}
        />
        </div>
    );
};

export default Input;