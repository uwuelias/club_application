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
import { Link } from 'react-router'

// schema for form validation
const formSchema = z.object({
    email: z.email().regex(/^[A-Za-z0-9._%+-]+@binghamton\.edu$/, {
        message: "Must be a valid Binghamton University email",
    }),
    password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
})

const SignIn = () => {
    
    const navigate = useNavigate()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        
        try {
            const res = await fetch("http://localhost:3000/api/auth/signin", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values)
            })

            const data = await res.json()

            if (!res.ok) {
                toast.error(data.message || "Invalid email or password");
                return;
            }

            toast.success("Signed in successfully!")
            navigate('/')

        } catch (e: unknown) {
            if (e instanceof Error) {
                toast.error(`An error has occurred: ${e.message}`)
            }
        }
    }

  return (
    <main className='flex flex-col items-center justify-center min-h-screen'>
        <h2 className='font-bold text-xl'>Sign in</h2>
        <Form {...form}>
            <form className='space-y-4 w-full max-w-md' onSubmit={form.handleSubmit(onSubmit)}>

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

                    <p className='italic text-center'>Don&apos;t have an account? <Link to="/signup" className='hover:underline hover:cursor-pointer'>Sign up</Link></p>
                    <div className="flex justify-center">
                        <Button type='submit' className='hover:cursor-pointer'>Submit</Button>
                    </div>
            </form>
        </Form>
    </main>
  )
}

export default SignIn