import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'expo-router';
import React from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button, ControlledInput, Text, View } from '@/ui';

const schema = z
  .object({
    name: z
      .string({
        required_error: 'name is required',
      })
      .min(3, 'name must be at least 3 characters'),
    // email or phone is required
    email: z.string().email('Invalid email format').optional(),
    phone: z.string().optional(),
    password: z
      .string({
        required_error: 'Password is required',
      })
      .min(6, 'Password must be at least 6 characters'),
  })
  .transform((data) => {
    if (!data.email && !data.phone) {
      throw new Error('email or phone is required');
    }
    return data;
  });

export type FormType = z.infer<typeof schema>;

export type SignupFormProps = {
  onSubmit?: SubmitHandler<FormType>;
};

export const SignupForm = ({ onSubmit = () => {} }: SignupFormProps) => {
  const [isEmail, setIsEmail] = React.useState(false);
  const { handleSubmit, control } = useForm<FormType>({
    resolver: zodResolver(schema),
  });
  return (
    <View className="flex-1 justify-center p-4">
      <Text className=" text-center text-2xl">Litebook</Text>

      <Separator />

      <ControlledInput
        testID="name-input"
        control={control}
        name="name"
        label="Name"
      />

      {isEmail ? (
        <ControlledInput
          testID="email-input"
          control={control}
          name="email"
          label="Email"
        />
      ) : (
        <ControlledInput
          testID="phone-input"
          control={control}
          name="phone"
          label="Phone"
        />
      )}

      <ControlledInput
        testID="password-input"
        control={control}
        name="password"
        label="Password"
        placeholder="***"
        secureTextEntry={true}
      />
      <Button
        testID="signup-button"
        label="Sign up"
        onPress={handleSubmit(onSubmit)}
      />

      <Button
        variant="ghost"
        label={`Sign up with ${isEmail ? 'phone' : 'email address'}`}
        onPress={() => setIsEmail(!isEmail)}
      />

      <View className="mt-4 flex-row items-center justify-center space-x-2">
        <Text>Already have an account?</Text>
        <Link href="/login">{'  '}Login</Link>
      </View>
    </View>
  );
};

export const Separator = () => {
  return <View className="mb-4 border-[1px]" />;
};
