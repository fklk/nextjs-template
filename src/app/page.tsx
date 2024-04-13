import { SignOutButton } from "@/components/button/signout";
import { Button } from "@/components/ui/button";
import { getUser } from "@/lib/auth";
import Link from "next/link";

const Home = async () => {
    const user = await getUser();

    return (
        <div className="flex min-h-screen w-screen items-center justify-center gap-12">
            {!user && (
                <>
                    <Link href="/signin">
                        <Button>Sign In</Button>
                    </Link>
                    <Link href="/signup">
                        <Button>Sign Up</Button>
                    </Link>
                </>
            )}
            {user && <SignOutButton />}
        </div>
    );
};

export default Home;
