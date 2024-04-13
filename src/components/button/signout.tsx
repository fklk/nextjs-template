import { userSignOutAction } from "@/actions/auth";
import { Button } from "../ui/button";

export const SignOutButton = () => {
    return (
        <form action={userSignOutAction}>
            <Button>Sign Out</Button>
        </form>
    );
};
