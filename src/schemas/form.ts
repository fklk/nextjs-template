import { z } from "zod";

export const FormStateSchema = z
    .object({
        errors: z.record(z.unknown()).optional(),
    })
    .optional();

const FormFieldElement = z.enum(["INPUT", "SELECT"]);

const FormFieldSelectItem = z.object({
    value: z.string(),
    displayValue: z.string(),
});

const FormFieldInputType = z.enum(["TEXT", "EMAIL", "PASSWORD"]);

const FormFieldSchema = z
    .object({
        name: z.string(),
        element: FormFieldElement,
        items: z.array(FormFieldSelectItem).optional(),
        type: FormFieldInputType.optional(),
        placeholder: z.string().optional(),
    })
    .refine(({ element, items, type }) => {
        return (
            (element === "INPUT" && type !== undefined) ||
            (element === "SELECT" && items !== undefined)
        );
    }, "Items need to be provided if a select element is chosen.");

export const FormConfigSchema = z.array(FormFieldSchema);

export type FormStateSchema = z.infer<typeof FormStateSchema>;
export type FormConfigSchema = z.infer<typeof FormConfigSchema>;
