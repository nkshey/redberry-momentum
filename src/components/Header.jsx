import Logo from "../ui/Logo";
import CTAButtons from "./CTAButtons";

function Header() {
  return (
    <header className="mb-10 flex items-center justify-between py-7.5">
      <Logo />
      <CTAButtons />
    </header>
  );
}

export default Header;
