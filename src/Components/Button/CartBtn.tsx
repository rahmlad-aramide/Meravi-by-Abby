import { Link } from "react-router-dom";

interface Props {
    text: string;
    onClick?: () => void;
    width?: string
    link: string
}

export const CartBtn = ({ onClick, link, text, width }: Props) => {
    return (
        <Link to={link} onClick={onClick}
            className={`${width} border-Black block text-center text-white text-base border-[1px] font-semibold bg-Black py-3 px-5`}
        >
            {text}
        </Link>
    );
}
