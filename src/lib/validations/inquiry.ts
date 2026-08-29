import { z } from 'zod';

export const inquirySchema = z.object({
  fullName: z.string().min(1, 'Name is required'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(6, 'Please enter a valid phone number'),
  organization: z.string().optional(),
  category: z.string().default('courses'), // Accepts 'courses', 'camp', 'kids_youth', etc.
  selectedActivities: z.array(z.string()).optional(),
  estimatedParticipants: z.coerce.number().min(1).default(1),
  eventDate: z.string().optional(),
  location: z.string().optional(),
  notes: z.string().optional(),
});

export type InquiryFormInput = z.infer<typeof inquirySchema>;