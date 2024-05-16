import { useRouter } from 'expo-router';
import React from 'react';

import type { SignupFormProps } from '@/components/signup-form';
import { SignupForm } from '@/components/signup-form';
import { useAuth } from '@/core';
import { useSoftKeyboardEffect } from '@/core/keyboard';
import { FocusAwareStatusBar } from '@/ui';

export default function SignUp() {
  const router = useRouter();
  const signIn = useAuth.use.signIn();
  useSoftKeyboardEffect();

  const onSubmit: SignupFormProps['onSubmit'] = (data) => {
    console.log(data);
    signIn({ access: 'access-token', refresh: 'refresh-token' });
    // if email then go to verify email
    // if phone then go to verify phone
    // else should not arise as form validation should prevent this
    if (data.email) {
      router.push('/verify-email');
    } else if (data.phone) {
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
