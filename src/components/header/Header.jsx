import Logo from "../../ui/Logo";
import CTAButtons from "./CTAButtons";

function Header() {
  return (
    <header className="sticky top-0 z-999 mb-10 flex items-center justify-between bg-white py-7.5">
      <Logo />
      <CTAButtons />
    </header>
  );
}

export default Header;
