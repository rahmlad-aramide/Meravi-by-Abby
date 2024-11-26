import { FC } from "react"

interface AuthInputProps {
    type: string
    placeholder?: string
    name: string
    label: string
    onChange?: () => void
}

export const AuthInput: FC<AuthInputProps> = ({ type, placeholder, name, label, onChange }) => {
    return (
        <div className="mt-4">
            <label className="text-sm font-medium text-[#344054]" htmlFor={name}>{label}</label>
            <input
                type={type}
                placeholder={placeholder}
                // name={name}
                id={name}
                onChange={onChange}
                className="block border-[1px] border-[#D0D5DD] focus:outline-[#e4e6ea] shadow-shawdowCart text-[#344054] font-sm text-[.95rem] font-medium mt-1 px-2 py-2 w-full"
            />
        </div>
    )
}