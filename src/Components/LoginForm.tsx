import { useNavigate } from "react-router";
import { useForm } from "react-hook-form"
import { Button } from "./ui/button";
import logoUrl from "@/assets/KSP-FullLogo.svg";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAuth } from "@/Context/AuthContext";


const LoginSchema = z.object({
    email: z.string()
        .regex(/[^@ \t]+@[^@ \t]+\.[^@ \t]+/, { message: "Email tidak valid" }),
    password: z.string()
        .min(8, { message: "Password minimal 8 karakter" }),
})

type LoginFormSchema = z.infer<typeof LoginSchema>;

const LoginForm = () => {

    const form = useForm<LoginFormSchema>({
        resolver: zodResolver(LoginSchema),
    });

    const { signIn } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (values: LoginFormSchema) => {
        const { data, error } = await signIn(values.email, values.password);

        if (error) {
            alert('Login failed');
        }
        else {
            navigate('/admin/dashboard');
        }
    }

    return (
        <div className="w-full max-w-sm bg-neutral-900 p-6 rounded-lg shadow-lg">
            <img src={logoUrl} alt="Logo" className="mx-auto w-60 mb-6" />

            <h1 className="text-center text-l font-semibold mb-4">Login</h1>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold mb-0">Email</label>
                    <input {...form.register('email')} className="bg-neutral-800 p-2 rounded-lg" type="email" placeholder="Email"></input>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold">Password</label>
                    <input {...form.register('password')} className="bg-neutral-800 p-2 rounded-lg" type="password" placeholder="Password"></input>
                </div>
                <Button type="submit">Login</Button>
            </form>
        </div>
    )
}

export default LoginForm;