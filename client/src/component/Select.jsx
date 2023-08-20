import handleChange from '../utils/handleChange';

// eslint-disable-next-line react/prop-types
const Select = ({label,name,data,className,value,setValue}) => {
    return (
        <div>
            <label
                className="block"
            >
            {label}
            </label>
            <select
                name={name}
                onChange={(e)=>handleChange(e,value,setValue)}
                className={`w-full p-2 block  focus:outline-none border focus:border-red-500 rounded ${className}`}
            >
                <option>নির্বাচন করুন </option>
                {
                    // eslint-disable-next-line react/prop-types
                    data.length > 0 && data.map((d,i)=>
                        <option key={i} value={d}>{d}</option>    
                    )
                }
            </select>
        </div>
    );
};

export default Select;