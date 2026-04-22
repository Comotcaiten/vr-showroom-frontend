"use client";

import { Button } from "../ui/button";
import Link from "next/link";
import AvartarContainer from "./avartar-container";
import { useAuth } from "@/context/auth-context";

function AuthContainer() {
  const { user, isLoading } = useAuth();

  if (isLoading) return <div className="hidden md:flex items-center gap-2 shrink-0"> loading</div>;

  return (
    <div className="hidden md:flex items-center gap-2 shrink-0">
      {user ? (
        <>
          <span>Xin chào {user.name}</span>
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