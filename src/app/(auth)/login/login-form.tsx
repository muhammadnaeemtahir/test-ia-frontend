"use client"
import api from "@/utils/api"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { loginSchema } from "@/utils/validation-schemas"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { loginCredentialsTypes } from "@/utils/types"
import { useMutation } from "@tanstack/react-query"
import { useDispatch } from 'react-redux';
import { setCredentials } from '@/lib/features/authSlice';


export const login = async (credentials: loginCredentialsTypes): Promise<any> => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
};

export function LoginForm({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"div">) {
    const dispatch = useDispatch();
    const router = useRouter()

    const loginMutation = useMutation({
        mutationFn: login,
        onSuccess: (data) => {
            const credentials = {
                user: {
                    id: data.loggedInUser._id,
                    name: data.loggedInUser.name,
                    role: data.loggedInUser.role
                },
                token: data.token
            };

            dispatch(setCredentials(credentials));
            localStorage.setItem("token", data.token);
            router.replace("/dashboard");
        },
        onError: (error) => {
            alert('Login failed');
            console.log(error.message)
        }
    })

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(loginSchema),
    })

    const onSubmit = (credentials: z.infer<typeof loginSchema>) => {
        router.replace("/dashboard");
        
        // loginMutation.mutate(credentials)
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="example@email.com"
                                    {...register("email")}
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-sm">{errors.email.message}</p>
                                )}
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                    <a
                                        href="#"
                                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                    >
                                        Forgot your password?
                                    </a>
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="enter your password"
                                    {...register("password")}
                                />
                                {errors.password && (
                                    <p className="text-red-500 text-sm">{errors.password.message}</p>
                                )}
                            </div>
                            <Button type="submit" className="w-full">
                                Login
                            </Button>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            Don&apos;t have an account?{" "}
                            <Link href="/register" className="underline underline-offset-4">
                                Sign up
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
