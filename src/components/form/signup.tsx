"use client";

import { userCreateAction } from "@/actions/auth";
import { ServerActionForm } from "@/components/base/form";
import config from "@/config/form/signup";
import { UserCreateSchema } from "@/schemas/user";

export const SignUpForm = () => {
    return (
        <div className="flex min-h-screen w-screen flex-col items-center justify-center gap-12">
            <h1 className="text-5xl font-bold">Sign Up</h1>
            <ServerActionForm
                action={userCreateAction}
                formSchema={UserCreateSchema}
                config={config}
                submitValue="Sign Up"
                defaultValues={{
                    username: "",
                    email: "",
                    password: "",
                }}
                className="flex w-96 flex-col gap-4"
            />
        </div>
    );
};
