import { Link } from "react-router-dom";

interface Props {
  text: string;
  link: string;
  style?: string;
}

export default function Button2(props: Props) {
  return (
    <Link
      to={props.link}
      className={`${props.style} bg-white text-black font-semibold rounded-[4px] py-2 lg:py-3 px-4 text-[0.9rem] sm:text-[0.8rem] md:text-[0.85rem] xxl:text-[0.9rem] w-fit min-w-[176px] text-center hover:scale-95 active:scale-100 transition duration-200`}
    >
      {props.text}
    </Link>
  );
}