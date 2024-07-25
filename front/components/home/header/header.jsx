import MenuLinks from "./menu-links";
import UserButton from "./user-button";

export default function Header({ user }) {
  const capitalizeFirstLetter = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  return (
    <div className="border-b-2">
      <header className="flex items-center max-w-screen-xl mx-auto justify-between py-4">
        <span className="text-4xl font-bold italic">
          <span className="text-blue-800 ">G</span>C
        </span>

        <MenuLinks />

        <div className="flex flex-col">
          <span className="text-sm self-end">Olá</span>
          <UserButton name={capitalizeFirstLetter(user.name)} />
        </div>
      </header>
    </div>
  );
}
