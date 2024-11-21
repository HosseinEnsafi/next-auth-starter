import Logo from "./Logo";
import MoreDropDown from "./MoreDropDown";
import NavLinks from "./NavLinks";

async function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <nav className="fixed bottom-0 left-0 z-50 flex h-16 w-full flex-1 flex-row items-center justify-evenly space-x-2 border-t bg-white p-2 dark:bg-neutral-950 md:relative md:ml-0 md:h-full md:flex-col md:justify-between md:space-x-0 md:space-y-2 md:border-none">
        <Logo />
        <NavLinks />
        <div className="relative hidden w-full flex-1 items-end md:mt-auto md:flex">
          <MoreDropDown />
        </div>
      </nav>
    </div>
  );
}

export default SideNav;
