import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
    return twMerge(clsx(inputs));
};

export const capitalize = (text: string) => {
    return text.at(0)?.toUpperCase() + text.slice(1).toLowerCase();
};

export const formDataToObject = (
    formData: FormData,
): Record<string, string> => {
    const object: Record<string, string> = {};
    for (const [key, value] of formData.entries()) {
        object[key] = String(value);
    }
    return object;
};
