import { Logout } from "@/components/Logout";
import { Link } from "@tanstack/react-router";

export const Navbar = () => {
  return (
    <div>
      <div className=" flex gap-2 p-2 border-b items-center">
        <Link
          to="/"
          activeProps={{
            className: "font-bold",
          }}
          activeOptions={{ exact: true }}
        >
          Home
        </Link>
        <Link
          to={"/about"}
          activeProps={{
            className: "font-bold",
          }}
        >
          About
        </Link>
        <div className="grow"></div>
        <Logout />
      </div>
    </div>
  );
};
