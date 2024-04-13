import type { FormConfigSchema } from "@/schemas/form";

const config = [
    {
        name: "username",
        element: "INPUT",
        type: "TEXT",
        placeholder: "username",
    },
    {
        name: "email",
        element: "INPUT",
        type: "EMAIL",
        placeholder: "email@example.com",
    },
    {
        name: "password",
        element: "INPUT",
        type: "PASSWORD",
        placeholder: "password",
    },
] satisfies FormConfigSchema;

export default config;
