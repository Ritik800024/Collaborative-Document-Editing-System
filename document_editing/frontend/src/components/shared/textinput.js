const Textinput=({placeholder,label,value,setValue})=>{
    return (
    <div className="textinput flex flex-col space-y-2 w-full">
        <label for={label} className="font-semibold w-full">{label}</label>
        <input 
            type="text" 
            placeholder={placeholder} 
            className="p-3 border border-gray-400 border-solid rounded placeholder-gray-500 w-full" 
            id={label}
            value={value}
            onChange={(e)=>{
                setValue(e.target.value)
            }}
        />
    </div>
    )}

export default Textinput