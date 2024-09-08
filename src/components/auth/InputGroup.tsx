const InputGroup = ({
    label,
    type = "text",
    name,
    placeholder,
    hidden = false,
    extras = {},
}: {
    label: string;
    type?: string;
    name: string;
    placeholder?: string;
    extras?: Object;
    hidden?: boolean;
}) => {
    return !hidden ? (
        <div className="flex flex-col w-full">
            <label className="text-white text-lg mb-1">{label}</label>
            <input
                {...extras}
                type={type}
                name={name}
                placeholder={placeholder ?? `Enter ${label}`}
                className="px-5 py-2 rounded-md bg-white/20 outline-white/80"
                required
            />
        </div>
    ) : null;
};

export default InputGroup;