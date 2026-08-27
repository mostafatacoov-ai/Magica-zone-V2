export type ProgramCategory = 'kids_youth' | 'corporate' | 'camp' | 'bazar' | 'courses';

export type ProductCategory = 'uniforms' | 'camp_gear' | 'event_supplies' | 'souvenirs';

export type CourseCategory = 'stem_robotics' | 'leadership' | 'creative_arts' | 'outdoor_survival';

export type InquiryStatus = 'pending' | 'contacted' | 'confirmed' | 'cancelled';

export type UserRole = 'student' | 'teacher' | 'employee' | 'admin';

export interface IAssignmentSubmission {
  id?: string;
  _id?: any;
  courseTitle: string;
  assignmentTitle: string;
  fileOrUrl: string;
  notes?: string;
  submittedAt: Date;
  status: 'submitted' | 'reviewed' | 'graded';
}

export interface IUser {
  id?: string;
  _id?: any;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  enrolledCourses?: string[]; // Course Titles or IDs
  submissions?: IAssignmentSubmission[];
  createdAt: Date;
}

export interface IActivity {
  id?: string;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  category: ProgramCategory;
  ageRange?: string;
  durationMinutes: number;
  participantsMin: number;
  participantsMax: number;
  pricePerDayEGP: number;
  benefitsEn: string[];
  benefitsAr: string[];
  imageUrl?: string;
  isActive: boolean;
}

export interface IProduct {
  id?: string;
  nameEn: string;
  nameAr: string;
  descriptionEn: string;
  descriptionAr: string;
  category: ProductCategory;
  priceEGP: number;
  imageUrl?: string;
  inStock: boolean;
  featuresEn: string[];
  featuresAr: string[];
}

export interface ICourse {
  id?: string;
  _id?: string;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  category: CourseCategory;
  ageGroup: string;
  durationWeeks: number;
  sessionsCount: number;
  priceEGP: number;
  instructorNameEn: string;
  instructorNameAr: string;
  instructorTitleEn?: string;
  instructorTitleAr?: string;
  instructorImage?: string;
  syllabusEn: string[];
  syllabusAr: string[];
  scheduleEn: string;
  scheduleAr: string;
  isActive: boolean;
}

export interface IInquiry {
  id?: string;
  fullName: string;
  email: string;
  phone: string;
  organization?: string;
  category: ProgramCategory;
  selectedActivities?: string[];
  estimatedParticipants: number;
  eventDate?: Date;
  location?: string;
  status: InquiryStatus;
  notes?: string;
  createdAt: Date;
}