import MenuLinks from "./menu-links";
import UserButton from "./user-button";

export default function Header({ user }) {
  const capitalizeFirstLetter = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  return (
    <div className="border-b-2 max-xl:px-4 max-md:border-0">
      <header className="flex items-center max-w-screen-xl mx-auto justify-between py-4 max-md:flex-col max-md:">
        <div className="flex w-full items-center justify-between max-md:pb-5">
          <span className="text-4xl font-bold italic max-sm:text-3xl">
            <span className="text-blue-800 ">G</span>C
          </span>

          <span className="max-md:hidden">
            <MenuLinks />
          </span>

          <div className="flex flex-col">
            <span className="text-sm self-end">Olá</span>
            <UserButton name={capitalizeFirstLetter(user.name)} />
          </div>
        </div>
        <span className="hidden max-md:flex justify-center w-full border-t-2 py-3 ">
          <MenuLinks />
        </span>
      </header>
    </div>
  );
}
