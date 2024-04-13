"use server";

import { lucia, validateRequest } from "@/lib/auth";
import { formDataToObject } from "@/lib/utils";
import { type FormStateSchema } from "@/schemas/form";
import { UserAuthenticateSchema, UserCreateSchema } from "@/schemas/user";
import { api } from "@/trpc/server";
import { TRPCError } from "@trpc/server";
import { cookies } from "next/headers";
import { Argon2id } from "oslo/password";
import { redirect } from "next/navigation";

export const userCreateAction = async (
    prevState: FormStateSchema,
    formData: FormData,
): Promise<FormStateSchema> => {
    const validatedFields = UserCreateSchema.safeParse(
        formDataToObject(formData),
    );

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const hashedPassword = await new Argon2id().hash(
        validatedFields.data.password,
    );

    try {
        const user = await api.user.create({
            ...validatedFields.data,
            password: hashedPassword,
        });
        const session = await lucia.createSession(user.id, { country: "DE" });
        const sessionCookie = lucia.createSessionCookie(session.id);
        cookies().set(
            sessionCookie.name,
            sessionCookie.value,
            sessionCookie.attributes,
        );
        return redirect("/");
    } catch (e) {
        if (e instanceof TRPCError) {
            const field = e.message.split(":").at(0);
            const errorMessage = e.message.split(":").at(1)!.trim();
            if (field === "username") {
                return {
                    errors: {
                        username: [errorMessage],
                    },
                };
            } else if (field === "email") {
                return {
                    errors: {
                        email: [errorMessage],
                    },
                };
            }
        }
    }
};

export const userAuthenticateAction = async (
    prevState: FormStateSchema,
    formData: FormData,
): Promise<FormStateSchema> => {
    const validatedFields = UserAuthenticateSchema.safeParse(
        formDataToObject(formData),
    );

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const user = await api.user.get({ email: validatedFields.data.email });

    const incorrectCredentialsErrorMessage =
        "The provided password is incorrect or there is no user with the given email.";

    if (!user) {
        return {
            errors: {
                global: [incorrectCredentialsErrorMessage],
            },
        };
    }

    const isPasswordValid = await new Argon2id().verify(
        user.password,
        validatedFields.data.password,
    );

    if (!isPasswordValid) {
        return {
            errors: {
                global: [incorrectCredentialsErrorMessage],
            },
        };
    }

    const session = await lucia.createSession(user.id, {
        country: "DE",
    });
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
    );
    return redirect("/");
};

export const userSignOutAction = async (_: FormData) => {
    const { session } = await validateRequest();
    if (!session) {
        return;
    }

    await lucia.invalidateSession(session.id);

    const sessionCookie = lucia.createBlankSessionCookie();
    cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
    );

    return redirect("/");
};
