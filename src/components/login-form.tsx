import { zodResolver } from '@hookform/resolvers/zod';
import { Link, router } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { auth } from '@/api/firebase';
import { Button, ControlledInput, Text, View } from '@/ui';

const schema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email('Invalid email format'),
  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(6, 'Password must be at least 6 characters'),
});

export type FormType = z.infer<typeof schema>;

export const LoginForm = () => {
  const { handleSubmit, control } = useForm<FormType>({
    resolver: zodResolver(schema),
  });
  const [isloading, setIsLoading] = React.useState(false);

  const onSubmit = async (data: FormType) => {
    setIsLoading(true);
    const res = await signInWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );
    setIsLoading(false);
    if (res.user) {
      console.log(res.user);
      router.push('/');
    }
  };
  return (
    <View className="flex-1 justify-center p-4">
      <Text className=" text-center text-2xl">Litebook</Text>

      <Separator />

      <ControlledInput
        testID="email-input"
        control={control}
        name="email"
        label="Email"
      />
      <ControlledInput
        testID="password-input"
        control={control}
        name="password"
        label="Password"
        placeholder="***"
        secureTextEntry={true}
      />
      <Button
        testID="login-button"
        label="Login"
        loading={isloading}
        onPress={handleSubmit(onSubmit)}
      />

      <Link href="/forgotpassword">Forgotten password?</Link>

      <View className="mt-4 flex-row items-center justify-center space-x-2">
        <Text>Don't have an account?</Text>
        <Link href="/signup">{'  '}Sign Up</Link>
      </View>
    </View>
  );
};

export const Separator = () => {
  return <View className="mb-4 border-[1px]" />;
};
