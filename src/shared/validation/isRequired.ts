import { z } from 'zod';

export const isRequired = (msg?: string) => z.string().min(1, msg ?? 'Ce champ est requis');
