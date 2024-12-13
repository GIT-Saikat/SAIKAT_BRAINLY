import {z} from "zod";

export const SchemaZod=z.object({
    username:z.string().min(3, "Username must be at least 3 characters long").max(20, "Username must be at most 20 characters long"),
    password:z.string()
        .min(8, "Password must be at least 8 characters long")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one digit")
        .regex(/[\W_]/, "Password must contain at least one special character"),
});