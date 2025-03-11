import Logo from "../ui/icons/Logo";
import CTAButtons from "./CTAButtons";

function Header() {
  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-purple text-[1.9375rem]">Momentum</span>
        <Logo />
      </div>

      <CTAButtons />
    </header>
  );
}

export default Header;
