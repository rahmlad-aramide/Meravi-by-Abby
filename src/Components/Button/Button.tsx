import { Link } from "react-router-dom";

interface StateProps {
  gender: 'male' | 'female';
}

interface ButtonProps {
  text: string;
  link: string;
  state?: StateProps; // Define state as an object with the specific shape
}
interface AuthBtn {
  text: string;
  width: string
}

export default function Button(props: ButtonProps) {
  return (
    <Link
    state={props.state}
      to={props.link}
      className=" text-[#222222] text-[0.9rem] sm:text-[0.8rem] lg:text-[0.85rem] xxl:text-[0.9rem] border-[1px] font-semibold hover:bg-black hover:text-White border-Black py-2 sm:py-2 lg:py-2 px-5 sm:px-4 lg:px-6  "
    >
      {props.text}
    </Link>
  );
}


export const AuthButton = ({ text, width }: AuthBtn) => {
  return (
    <button className={`${width} block transition-all duration-200 ease-in-out hover:text-Black text-white text-base border-[1px] border-Black font-semibold bg-Black hover:bg-White py-3 px-5`}>
      {text}
    </button>
  )
}