import { z } from 'zod';

export const inquirySchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(8, 'Please enter a valid phone number'),
  organization: z.string().optional(),
  category: z.enum(['kids_youth', 'corporate', 'camp', 'bazar']),
  selectedActivities: z.array(z.string()).optional(),
  estimatedParticipants: z.number().min(1, 'Minimum 1 participant required'),
  eventDate: z.string().optional(),
  location: z.string().optional(),
  notes: z.string().optional(),
});

export type InquiryFormInput = z.infer<typeof inquirySchema>;