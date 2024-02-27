import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";

export const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate({ to: "/login" });
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return <Button onClick={handleLogout}>Logout</Button>;
};
