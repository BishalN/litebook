import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'expo-router';
import { applyActionCode } from 'firebase/auth';
import React from 'react';
import { useForm } from 'react-hook-form';
import Toast from 'react-native-toast-message';
import { z } from 'zod';

import { auth } from '@/api/firebase';
import { Button, ControlledInput, Text, View } from '@/ui';

const schema = z.object({
  code: z
    .string({
      required_error: 'Code is required',
    })
    .length(5, 'Code must be 5 characters'),
});

export type FormType = z.infer<typeof schema>;

function VerifyEmail() {
  const { handleSubmit, control } = useForm<FormType>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormType) => {
    // send code to server
    console.log(data);
    try {
      await applyActionCode(auth, data.code);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: error?.message ?? "Couldn't verify email",
      });
      console.error(error);
    }
  };

  return (
    <View className="p-4">
      <Text className="text-center ">
        Let us know that this email address belongs to you. Enter the code in
        the email sent to add@ad
      </Text>
      <Text className="my-3 text-center font-bold">
        Enter the 5 digit code from your email
      </Text>

      <ControlledInput label="Code" control={control} name="code" />
      <Button
        testID="verify-email-button"
        label="Verify"
        onPress={handleSubmit(onSubmit)}
      />
      <Link href="/forgotpassword">Send code again?</Link>
    </View>
  );
}

export default VerifyEmail;
