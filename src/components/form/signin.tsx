"use client";

import { userAuthenticateAction } from "@/actions/auth";
import { ServerActionForm } from "@/components/base/form";
import config from "@/config/form/signin";
import { UserAuthenticateSchema } from "@/schemas/user";

export const SignInForm = () => {
    return (
        <div className="flex min-h-screen w-screen flex-col items-center justify-center gap-12">
            <h1 className="text-5xl font-bold">Sign In</h1>
            <ServerActionForm
                action={userAuthenticateAction}
                formSchema={UserAuthenticateSchema}
                config={config}
                submitValue="Sign In"
                defaultValues={{
                    email: "",
                    password: "",
                }}
                className="flex w-96 flex-col gap-4"
            />
        </div>
    );
};
