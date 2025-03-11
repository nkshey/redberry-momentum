import Logo from "../ui/icons/Logo";
import CTAButtons from "./CTAButtons";

function Header() {
  return (
    <header className="mb-10 flex items-center justify-between py-7.5">
      <div className="flex items-center gap-2">
        <span className="text-purple font-fredoka-one text-[1.9375rem]">
          Momentum
        </span>
        <Logo />
      </div>

      <CTAButtons />
    </header>
  );
}

export default Header;
