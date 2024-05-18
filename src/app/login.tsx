// import auth from '@react-native-firebase/auth';
import React from 'react';

import { LoginForm } from '@/components/login-form';
import { useSoftKeyboardEffect } from '@/core/keyboard';
import { FocusAwareStatusBar } from '@/ui';

export default function Login() {
  // const signIn = useAuth.use.signIn();
  useSoftKeyboardEffect();

  return (
    <>
      <FocusAwareStatusBar />
      <LoginForm />
    </>
  );
}
