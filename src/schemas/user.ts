import { z } from "zod";

import { GenericIdSchema } from "./default";

// ,---.        ,--.
// '   .-'  ,---.|  ,---.  ,---. ,--,--,--. ,--,--. ,---.
// `.  `-. | .--'|  .-.  || .-. :|        |' ,-.  |(  .-'
// .-'    |\ `--.|  | |  |\   --.|  |  |  |\ '-'  |.-'  `)
// `-----'  `---'`--' `--' `----'`--`--`--' `--`--'`----'

export const UserUsernameSchema = z
    .string()
    .min(4, "A username must at least be 4 characters long.");

export const UserEmailSchema = z.string().email();

export const UserPasswordSchema = z
    .string()
    .min(8, "A password must at least be 8 characters long.");

export const UserCreateSchema = z.object({
    username: UserUsernameSchema,
    email: UserEmailSchema,
    password: UserPasswordSchema,
});

export const UserAuthenticateSchema = z.object({
    email: UserEmailSchema,
    password: UserPasswordSchema,
});

export const UserGetUniqueSchema = z
    .object({
        id: GenericIdSchema.optional(),
        username: UserUsernameSchema.optional(),
        email: UserEmailSchema.optional(),
    })
    .refine(({ id, username, email }) => {
        return (
            [id, username, email].filter(
                uniqueIdentifier => uniqueIdentifier !== undefined,
            ).length === 1
        );
    }, "Please provide only one unique identifier.");

export const UserUpdateSchema = z
    .object({
        id: GenericIdSchema,
        username: UserUsernameSchema.optional(),
        email: UserEmailSchema.optional(),
        password: UserPasswordSchema.optional(),
    })
    .refine(({ username, email }) => {
        return [username, email].filter(attr => attr !== undefined).length > 1;
    }, "Please provide at least one value to update.");

// ,--------.
// '--.  .--',--. ,--.,---.  ,---.  ,---.
//    |  |    \  '  /| .-. || .-. :(  .-'
//    |  |     \   ' | '-' '\   --..-'  `)
//    `--'   .-'  /  |  |-'  `----'`----'
//           `---'   `--'

export type UserUsernameSchema = z.infer<typeof UserUsernameSchema>;
export type UserEmailSchema = z.infer<typeof UserEmailSchema>;
export type UserPasswordSchema = z.infer<typeof UserPasswordSchema>;
export type UserCreateSchema = z.infer<typeof UserCreateSchema>;
export type UserAuthenticateSchema = z.infer<typeof UserAuthenticateSchema>;
export type UserGetUniqueSchema = z.infer<typeof UserGetUniqueSchema>;
export type UserUpdateSchema = z.infer<typeof UserUpdateSchema>;
