"use client";

import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { Typography } from "@/components/ui/typography";
import Link from "next/link";

export default function Login() {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);

  const formSchema = z.object({
    email: z.string().email(),
    password: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setSubmitting(true);
      const res = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
        callbackUrl: "/admin/",
      });

      if (res && res.ok) {
        window.location.href = "/admin/";
      } else if (res && res.error === "CredentialsSignin") {
        toast({
          title: "Authentication failed",
          description: "Invalid username or password. Please try again.",
          duration: 8000,
        });
      } else {
        toast({
          title: "Authentication failed",
          description: "An unexpected error occurred. Please try again later.",
          duration: 8000,
        });
      }
    } catch (error) {
      toast({
        title: "Authentication failed",
        description: "An unexpected error occurred. Please try again later.",
        duration: 8000,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-y-hidden bg-kowan-dark p-4 md:p-8 lg:px-24">
      <div className="z-20 rounded-3xl bg-kowan-light px-8 py-16 shadow-2xl sm:p-16">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <Typography
              variant="h6"
              className="text-secondary-normal text-center"
            >
              Admin Login
            </Typography>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="password" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={submitting} className="mt-4 w-full">
              {submitting ? "Submitting..." : "Submit"}
            </Button>
            <Link href="/admin/register" className="w-full flex justify-center">
            <Typography
              variant="p6"
              className="text-secondary-normal text-center"
            >
              Don't have an account? Register here
            </Typography>
            </Link>
          </form>
        </Form>
      </div>
    </main>
  );
}
