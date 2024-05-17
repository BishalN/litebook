import auth from '@react-native-firebase/auth';
import { useRouter } from 'expo-router';
import React from 'react';
import { Alert } from 'react-native';

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
        const response = await auth().createUserWithEmailAndPassword(
          data.email,
          data.password
        );
        console.log(response);
        if (response.user) {
          await response.user.sendEmailVerification();
          router.push('/verify-email');
        }
      } catch (error) {
        console.error(error);
        Alert.alert('Error');
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
