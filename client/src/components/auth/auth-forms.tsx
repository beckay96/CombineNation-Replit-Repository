import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import * as React from 'react';
import { useTheme } from "@/hooks/use-theme";
import { ThemeToggle } from "@/components/theme-toggle";

// Steps for the onboarding process
const STEPS = [
  { number: 1, title: 'Create your account' },
  { number: 2, title: 'Personal details' },
  { number: 3, title: 'Choose your experience' }
];

// Registration form schema
const registerSchema = z.object({
  displayName: z.string().min(2, "Display name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegisterFormData = z.infer<typeof registerSchema>;

export function AuthForms() {
  const { registerMutation } = useAuth();

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      displayName: "",
    },
  });

  const handleRegister = async (data: RegisterFormData) => {
    const { confirmPassword, ...registerData } = data;
    registerMutation.mutate(registerData);
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8">
      {/* Theme Toggle */}
      <div className="flex justify-end mb-4">
        <ThemeToggle />
      </div>

      {/* Step Indicator */}
      <div className="w-full mb-8">
        <div className="flex items-center justify-between">
          {STEPS.map((step, idx) => (
            <React.Fragment key={step.number}>
              <div className="flex flex-col items-center gap-2">
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium
                  ${step.number === 1 ? 'bg-purple-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'}
                `}>
                  {step.number}
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {step.title}
                </span>
              </div>
              {idx < STEPS.length - 1 && (
                <div className="h-[2px] flex-1 mx-4 bg-gray-200 dark:bg-gray-700" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Registration Form */}
      <div className="w-full max-w-lg mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-medium">Create your account</h2>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleRegister)} className="space-y-4">
            <FormField
              control={form.control}
              name="displayName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Display Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="your.email@example.com" {...field} />
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-purple-500 hover:bg-purple-600"
              disabled={registerMutation.isPending}
            >
              {registerMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                'Create Account'
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}