import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'expo-router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button, ControlledInput, Text, View } from '@/ui';

const schema = z.object({
  code: z
    .string({
      required_error: 'Code is required',
    })
    .length(5, 'Code must be 5 characters'),
});

export type FormType = z.infer<typeof schema>;

function VerifyPhone() {
  const { handleSubmit, control } = useForm<FormType>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormType) => {
    console.log(data);
  };

  return (
    <View className="p-4">
      <Text className="text-center ">
        Let us know that this phone belongs to you. Enter the code in the phone
        sent to examplenumberhere
      </Text>
      <Text className="my-3 text-center font-bold">
        Enter the 5 digit code from your phone
      </Text>

      <ControlledInput label="Code" control={control} name="code" />
      <Button
        testID="verify-phone-button"
        label="Verify"
        onPress={handleSubmit(onSubmit)}
      />

      <Link href="/forgotpassword">Send code again?</Link>
    </View>
  );
}

export default VerifyPhone;
