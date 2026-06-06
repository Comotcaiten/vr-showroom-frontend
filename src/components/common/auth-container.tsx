"use client";

import { Button } from "../ui/button";
import Link from "next/link";
import AvartarContainer from "./avartar-container";
import ThemeToggle from "./theme-toggle";
import { useAuthStore } from "@/stores/useAuthStore";

function AuthContainer() {
  const {user} = useAuthStore();

  // if (!user) {
  //   return (
  //     <div className="hidden md:flex items-center gap-2 shrink-0">loading</div>
  //   );
  // }

  return (
    <div className="flex items-center gap-2 shrink-0">
      <ThemeToggle />
      {user != null ? (
        <>
          <span className="hidden md:flex">Xin chào {user?.name}</span>
          <AvartarContainer />
        </>
      ) : (
        <>
          <Button variant="ghost" asChild>
            <Link href="/login">Login</Link>
          </Button>

          <Button asChild>
            <Link href="/signup">Sign Up</Link>
          </Button>
        </>
      )}
    </div>
  );
}

export default AuthContainer;
