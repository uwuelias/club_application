import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod" 
import { useForm } from "react-hook-form"

import { Button } from '@/components/ui/button'
import { 
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage, 
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { useNavigate } from 'react-router'

// schema for form validation
const formSchema = z.object({
    email: z.email().regex(/^[A-Za-z0-9._%+-]+@binghamton\.edu$/, {
        message: "Must be a valid Binghamton University email",
    }),
    fullName: z.string().min(1, { message: "Enter your full name" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
})

const SignUp = () => {
    const navigate = useNavigate()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            fullName: "",
            password: "",
        }
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const res = await fetch("http://localhost:3000/api/auth/signup", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values)
            })

            const data = await res.json()

            if (!res.ok) {
                if (res.status === 409) {
                    toast.error(data.message || "User with this email already exists")
                } else {
                    toast.error(data.message || "Something went wrong")
                }
                return
            }

            toast.success("Account created successfully")
            navigate("/signin")
        } catch (e: unknown) {
            if (e instanceof Error) {
                toast.error(`An error has occurred: ${e.message}`)
            }
        }
    }

    return (
        <main className='flex flex-col items-center justify-center min-h-screen space-y-4'>
            <h2 className='font-bold text-xl'>Sign up</h2>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 w-full max-w-md'>

                    {/*email section*/}
                    <FormField control={form.control} name='email' render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="jdoe@binghamton.edu" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />

                    {/*full name section*/}
                    <FormField control={form.control} name='fullName' render={({ field }) => (
                        <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                                <Input placeholder='John Doe' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />

                    {/*password section*/}
                    <FormField control={form.control} name='password' render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input placeholder='Password' type='password' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />

                    <div className="flex justify-center">
                        <Button type='submit'>Submit</Button>
                    </div>
                </form>
            </Form>
        </main>
    )
}

export default SignUp
