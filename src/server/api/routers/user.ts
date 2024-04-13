import {
    UserCreateSchema,
    UserGetUniqueSchema,
    UserUpdateSchema,
} from "@/schemas/user";
import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
} from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const userRouter = createTRPCRouter({
    get: publicProcedure
        .input(UserGetUniqueSchema)
        .query(async ({ ctx, input }) => {
            const { id, username, email } = input;

            return await ctx.db.user.findUnique({
                where: {
                    id: id,
                    username: username,
                    email: email,
                },
            });
        }),

    update: protectedProcedure
        .input(UserUpdateSchema)
        .mutation(async ({ ctx, input }) => {
            return await ctx.db.user.update({
                where: {
                    id: ctx.user.id,
                },
                data: {
                    username: input.username,
                    email: input.email,
                    password: input.password,
                },
            });
        }),

    create: publicProcedure
        .input(UserCreateSchema)
        .mutation(async ({ ctx, input }) => {
            const userWithUsername = await ctx.db.user.findUnique({
                where: {
                    username: input.username,
                },
            });

            if (userWithUsername) {
                throw new TRPCError({
                    code: "CONFLICT",
                    message:
                        "username: A user with the given username already exists.",
                });
            }

            const userWithEmail = await ctx.db.user.findUnique({
                where: {
                    email: input.email,
                },
            });

            if (userWithEmail) {
                throw new TRPCError({
                    code: "CONFLICT",
                    message:
                        "email: A user with the given email already exists.",
                });
            }

            return await ctx.db.user.create({
                data: {
                    username: input.username,
                    email: input.email,
                    password: input.password,
                },
            });
        }),
});
