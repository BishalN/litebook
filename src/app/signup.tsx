import { useRouter } from 'expo-router';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from 'firebase/auth';
import React from 'react';
import Toast from 'react-native-toast-message';

import { auth } from '@/api/firebase';
import type { SignupFormProps } from '@/components/signup-form';
import { SignupForm } from '@/components/signup-form';
import { signIn } from '@/core';
import { useSoftKeyboardEffect } from '@/core/keyboard';
import { FocusAwareStatusBar } from '@/ui';

export default function SignUp() {
  const router = useRouter();
  // const signIn = useAuth.use.signIn();
  useSoftKeyboardEffect();

  const onSubmit: SignupFormProps['onSubmit'] = async (data) => {
    console.log('request received');
    signIn({ access: 'access-token', refresh: 'refresh-token' });
    // if email then go to verify email
    // if phone then go to verify phone
    // else should not arise as form validation should prevent this
    if (data.email) {
      // create user with email and password firebase
      try {
        const response = await createUserWithEmailAndPassword(
          auth,
          data.email,
          data.password
        );
        if (response.user) {
          await sendEmailVerification(response.user);

          Toast.show({
            type: 'success',
            text1: 'User created successfully',
            text2: 'Please verify your email',
          });

          router.push('/verify-email');
        }
      } catch (error) {
        console.error(error);
        Toast.show({
          type: 'error',
          text1: error?.message ?? "Couldn't create user",
        });
      }
    } else if (data.phone) {
      // create user with phone and password firebase
      router.push('/verify-phone');
    }
    // router.push('/');
  };
  return (
    <>
      <FocusAwareStatusBar />
      <SignupForm onSubmit={onSubmit} />
    </>
  );
}
