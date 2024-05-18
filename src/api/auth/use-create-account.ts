import type { AxiosError } from 'axios';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from 'firebase/auth';
import { createMutation } from 'react-query-kit';

import type { SignupFormType } from '@/components/signup-form';

import { auth } from '../firebase';

type Response = {};

export const useCreateAccount = createMutation<
  Response,
  SignupFormType,
  AxiosError
>({
  mutationFn: async (variables) => {
    // variables is going to contain the data from the form
    // if email then go to verify email
    // if phone then go to verify phone
    // else should not arise as form validation should prevent this
    if (variables.email) {
      // create user with email and password firebase
      try {
        const response = await createUserWithEmailAndPassword(
          auth,
          variables.email,
          variables.password
        );
        if (response.user) {
          await sendEmailVerification(response.user);
        }
      } catch (error) {
        console.error(error);
      }
    }
    return {};
  },
});
