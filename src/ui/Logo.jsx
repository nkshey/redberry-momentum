import { Link } from "react-router-dom";
import LogoIcon from "./icons/LogoIcon";

function Logo() {
  return (
    <Link className="flex items-center gap-2" to="/">
      <span className="text-purple font-fredoka-one text-[1.9375rem]">
        Momentum
      </span>
      <LogoIcon />
    </Link>
  );
}

export default Logo;
