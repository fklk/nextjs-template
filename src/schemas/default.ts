import { z } from "zod";

export const GenericIdSchema = z.string().uuid();
