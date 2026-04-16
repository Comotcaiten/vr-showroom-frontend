import { Button } from "../ui/button";
import Link from "next/link";
import AvartarContainer from "./avartar-container";


const AuthContainer = ({ isSignedIn, setIsSignedIn }: { isSignedIn: boolean, setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>> }) => {
    return (
        <div className="hidden md:flex items-center gap-2 shrink-0">
            {isSignedIn ? (
                <>
                    <AvartarContainer setIsSignedIn={setIsSignedIn} />
                </>
            ) : (
                <>
                    <Button variant="ghost" onClick={() => setIsSignedIn(true)} asChild>
                        <Link href="#">Login</Link>
                    </Button>

                    <Button asChild>
                        <Link href="/register">Register</Link>
                    </Button>
                </>
            )}
        </div>
    );
}

export default AuthContainer;