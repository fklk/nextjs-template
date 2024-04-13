import superjson from "superjson";
import { ZodError } from "zod";

import { db } from "@/server/db";
import { initTRPC, TRPCError } from "@trpc/server";

import { getUser } from "@/lib/auth";

export const createTRPCContext = async (opts: { headers: Headers }) => {
    const user = await getUser();

    return {
        db,
        user,
        ...opts,
    };
};

const t = initTRPC.context<typeof createTRPCContext>().create({
    transformer: superjson,
    errorFormatter({ shape, error }) {
        return {
            ...shape,
            data: {
                ...shape.data,
                zodError:
                    error.cause instanceof ZodError
                        ? error.cause.flatten()
                        : null,
            },
        };
    },
});

export const createCallerFactory = t.createCallerFactory;

export const createTRPCRouter = t.router;

export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(async opts => {
    const { ctx } = opts;

    if (!ctx.user) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    return opts.next({
        ctx: {
            user: ctx.user,
        },
    });
});
