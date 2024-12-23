import { isRequired } from '@/shared/validation/isRequired';
import { z } from 'zod';

export const InputLoginSchemaValidation = z.object({
  email: isRequired().email('Invalid email'),
  password: isRequired(),
})

export type InputLoginForm = z.infer<typeof InputLoginSchemaValidation>;