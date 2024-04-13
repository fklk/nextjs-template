"use client";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useForm, type FieldValues, type DefaultValues } from "react-hook-form";
import { type ZodSchema } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { useFormState, useFormStatus } from "react-dom";
import type { FormStateSchema, FormConfigSchema } from "@/schemas/form";
import { Input } from "../ui/input";
import { capitalize } from "@/lib/utils";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";

type FormProps<T extends FieldValues> = {
    action: (
        prevState: FormStateSchema,
        formData: FormData,
    ) => Promise<FormStateSchema>;
    formSchema: ZodSchema<T>;
    defaultValues: DefaultValues<T>;
    config: FormConfigSchema;
    submitValue: string;
    className?: string;
};

const initialState = {
    errors: undefined,
} satisfies FormStateSchema;

export const ServerActionForm = <T extends FieldValues>({
    action,
    formSchema,
    config,
    submitValue,
    defaultValues,
    className,
}: FormProps<T>) => {
    const form = useForm<T>({
        resolver: zodResolver(formSchema),
        defaultValues: defaultValues,
    });

    const { pending } = useFormStatus();
    const [state, formAction] = useFormState(action, initialState);

    return (
        <Form {...form}>
            <form
                className={className}
                action={formAction}
            >
                <p className="text-sm text-muted-foreground">
                    {state?.errors ? String(state?.errors.global ?? "") : null}
                </p>
                {config.map((element, i) => (
                    <FormField
                        key={element.name + i}
                        name={element.name}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    {capitalize(element.name)}
                                </FormLabel>
                                <FormControl>
                                    <>
                                        {element.element === "INPUT" && (
                                            <Input
                                                type={element.type!.toLowerCase()}
                                                placeholder={
                                                    element.placeholder ?? ""
                                                }
                                                {...field}
                                            />
                                        )}
                                        {element.element === "SELECT" && (
                                            <Select>
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {element.items!.map(
                                                        item => (
                                                            <SelectItem
                                                                key={
                                                                    item.value +
                                                                    "select_item"
                                                                }
                                                                value={
                                                                    item.value
                                                                }
                                                            >
                                                                {
                                                                    item.displayValue
                                                                }
                                                            </SelectItem>
                                                        ),
                                                    )}
                                                </SelectContent>
                                            </Select>
                                        )}
                                    </>
                                </FormControl>
                                <FormMessage />
                                <FormDescription>
                                    {state?.errors
                                        ? String(
                                              state?.errors[element.name] ?? "",
                                          )
                                        : null}
                                </FormDescription>
                            </FormItem>
                        )}
                    />
                ))}
                <Button
                    type="submit"
                    disabled={pending}
                >
                    {submitValue}
                </Button>
            </form>
        </Form>
    );
};
