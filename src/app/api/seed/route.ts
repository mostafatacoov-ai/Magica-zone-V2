import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/mongodb';
import { Activity } from '@/lib/models/Activity';
import { Product } from '@/lib/models/Product';
import { Course } from '@/lib/models/Course';
import { RadioTrack } from '@/lib/models/RadioTrack';

const officialRadioSongs = [
  {
    titleEn: 'Level Up Your World',
    titleAr: 'ارتقِ بعالمك في ماجيكا',
    artistEn: 'Magica Official Anthem',
    artistAr: 'نشيد ماجيكا الرسمي',
    category: 'anthem',
    duration: '1:15',
    audioSrc: '/audio/Level Up Your World.mp3',
    isActive: true,
    order: 1,
  },
  {
    titleEn: 'Magica Dreams',
    titleAr: 'أحلام ماجيكا',
    artistEn: 'Magica Youth Choir',
    artistAr: 'كورال شباب ماجيكا',
    category: 'song',
    duration: '3:45',
    audioSrc: '/audio/Magica Dreams.mp3',
    isActive: true,
    order: 2,
  },
  {
    titleEn: 'Making Futures Bright',
    titleAr: 'نصنع مستقبلاً مشرقاً',
    artistEn: 'Magica Camp Experience',
    artistAr: 'معسكرات ماجيكا',
    category: 'anthem',
    duration: '3:30',
    audioSrc: '/audio/Magica Making Futures Bright.mp3',
    isActive: true,
    order: 3,
  },
  {
    titleEn: 'Magica Magic',
    titleAr: 'سحر ماجيكا',
    artistEn: 'Magica Beats & Rhythms',
    artistAr: 'إيقاعات ماجيكا',
    category: 'song',
    duration: '2:43',
    audioSrc: '/audio/Magica Magic.mp3',
    isActive: true,
    order: 4,
  },
  {
    titleEn: 'Ready for the Week',
    titleAr: 'جاهزون لأسبوع المغامرة',
    artistEn: 'Field Facilitators',
    artistAr: 'ميسرو الأنشطة الميدانية',
    category: 'chant',
    duration: '2:50',
    audioSrc: '/audio/Magica Ready for the Week.mp3',
    isActive: true,
    order: 5,
  },
  {
    titleEn: 'Magica Rising',
    titleAr: 'انطلاقة ماجيكا الحماسية',
    artistEn: 'Morning Hype Crew',
    artistAr: 'هتاف الصباح الحماسي',
    category: 'chant',
    duration: '0:31',
    audioSrc: '/audio/Magica Rising.mp3',
    isActive: true,
    order: 6,
  },
  {
    titleEn: 'Own the Court',
    titleAr: 'امتلك الميدان والملعب',
    artistEn: 'Sports & Team Dynamism',
    artistAr: 'فريق الأنشطة الرياضية',
    category: 'chant',
    duration: '0:31',
    audioSrc: '/audio/Own the Court.mp3',
    isActive: true,
    order: 7,
  },
];

const initialActivities = [
  {
    titleEn: 'Cup Stacking Challenge',
    titleAr: 'تحدي رص الأكواب',
    descriptionEn: 'Teams synchronize tension on strings connected to a central band to stack pyramids without touching cups.',
    descriptionAr: 'يتعاون الفريق في سحب خيوط متصلة برباط مركزي لرفع الأكواب وبناء هرم متناسق دون لمس الأكواب باليد.',
    category: 'kids_youth',
    ageRange: '6+',
    durationMinutes: 25,
    participantsMin: 4,
    participantsMax: 8,
    pricePerDayEGP: 6000,
    benefitsEn: ['Fine Motor Control', 'Hand-Eye Coordination', 'Collective Patience'],
    benefitsAr: ['التحكم الحركي الدقيق', 'التناسق الحركي البصري', 'الصبر والتعاون الجماعي'],
    isActive: true,
  },
  {
    titleEn: 'Human Knot Puzzle',
    titleAr: 'لغز العقدة البشرية',
    descriptionEn: 'Participants hold hands across a circle and cooperatively untangle themselves without letting go.',
    descriptionAr: 'يمسك المشاركون بأيدي بعضهم البعض عبر الدائرة ويتعاونون لفك العقدة دون إفلات الأيدي.',
    category: 'corporate',
    ageRange: 'All Ages',
    durationMinutes: 20,
    participantsMin: 6,
    participantsMax: 12,
    pricePerDayEGP: 6000,
    benefitsEn: ['Spatial Reasoning', 'Adaptive Leadership', 'Cooperative Problem-Solving'],
    benefitsAr: ['التفكير المكاني', 'القيادة المرنة', 'حل المشكلات التعاوني'],
    isActive: true,
  },
  {
    titleEn: 'Storytime Spontaneity',
    titleAr: 'تحدي القصة الارتجالية',
    descriptionEn: 'In a circle, each participant collaboratively adds exactly four words to build an impromptu story.',
    descriptionAr: 'في دائرة تفاعلية، يضيف كل مشارك أربع كلمات فقط بالترتيب لبناء قصة مبتكرة وشيقة.',
    category: 'corporate',
    ageRange: 'All Ages',
    durationMinutes: 15,
    participantsMin: 5,
    participantsMax: 15,
    pricePerDayEGP: 6000,
    benefitsEn: ['Active Listening', 'Spontaneous Thinking', 'Creative Communication'],
    benefitsAr: ['الاستماع الفعال', 'التفكير التلقائي السريع', 'التواصل الإبداعي'],
    isActive: true,
  },
  {
    titleEn: 'Caterpillar Race',
    titleAr: 'سباق اليرقة الجماعي',
    descriptionEn: 'Teams form a connected line crouching low, moving in sync across the finish line.',
    descriptionAr: 'يشكل الفريق صفاً متصلاً مع الانحناء للتحرك بإيقاع جماعي موحد نحو خط النهاية.',
    category: 'kids_youth',
    ageRange: '6+',
    durationMinutes: 20,
    participantsMin: 4,
    participantsMax: 10,
    pricePerDayEGP: 6000,
    benefitsEn: ['Gross Motor Agility', 'Shared Rhythm', 'Team Balance'],
    benefitsAr: ['المرونة الحركية', 'الإيقاع المشترك', 'التوازن الجماعي'],
    isActive: true,
  },
];

const initialProducts = [
  {
    nameEn: 'Magica Official Camp Uniform Kit',
    nameAr: 'طقم يونيفورم معسكر ماجيكا الرسمي',
    descriptionEn: 'High-breathability 100% cotton T-shirt and branded sun visor cap designed for active youth camps.',
    descriptionAr: 'تيشيرت قطن 100% عالي الجودة ومسامي مع كاب واقي من الشمس مصمم لمعسكرات الأطفال والشباب.',
    category: 'uniforms',
    priceEGP: 450,
    inStock: true,
    featuresEn: ['100% Breathable Cotton', 'Includes Sun Visor Cap', 'Custom School/Team Logo Printing'],
    featuresAr: ['قطن 100% مريح ومسامي', 'يشمل كاب واقي من الشمس', 'إمكانية طباعة شعار المدرسة أو الفريق'],
  },
  {
    nameEn: 'Team Facilitation Master Kit',
    nameAr: 'حقيبة أدوات بناء الفرق الاحترافية',
    descriptionEn: 'Comprehensive facilitator kit including elastic ropes, marker cones, blindfolds, and team bands for 50 participants.',
    descriptionAr: 'حقيبة متكاملة للمدربين تشمل حبال مطاطية، أقماع تحديد، عصابات أعين، وأشرطة تمييز لـ 50 مشارك.',
    category: 'event_supplies',
    priceEGP: 2800,
    inStock: true,
    featuresEn: ['Complete Gear for 50+ Players', 'Durable Weatherproof Bag', 'Activity Guide Included'],
    featuresAr: ['معدات متكاملة لأكثر من 50 لاعب', 'حقيبة متينة ومقاومة للعوامل الجوية', 'دليل إرشادي مطبوع للأنشطة'],
  },
  {
    nameEn: 'Insulated Sports Camp Water Bottle',
    nameAr: 'زجاجة مياه رياضية حافظة للحرارة',
    descriptionEn: 'BPA-free stainless steel double-walled water bottle (750ml) with spill-proof straw lid.',
    descriptionAr: 'زجاجة مياه ستانلس ستيل معزولة خالية من مادة BPA سعة 750 مل مع غطاء مانع للتسرب.',
    category: 'camp_gear',
    priceEGP: 320,
    inStock: true,
    featuresEn: ['750ml Capacity', 'Keeps Cold for 24 Hours', 'BPA-Free Eco Friendly'],
    featuresAr: ['سعة 750 مل', 'تحفظ البرودة لمدة 24 ساعة', 'صديقة للبيئة وخالية من BPA'],
  },
  {
    nameEn: 'Magica Achievement Medals & Badges',
    nameAr: 'ميداليات وشارات التميز التذكارية',
    descriptionEn: 'Pack of 30 custom gold, silver, and bronze finish achievement medals with woven lanyards.',
    descriptionAr: 'مجموعة من 30 ميدالية وشارة تميز تذكارية للمشاركين في الفعاليات والمسابقات.',
    category: 'souvenirs',
    priceEGP: 950,
    inStock: true,
    featuresEn: ['Pack of 30 Medals', 'Custom Engraving Available', 'Premium Ribbon Included'],
    featuresAr: ['عبوة تحتوي على 30 ميدالية', 'إمكانية الحفر المخصص', 'شريط تعليق عالي الجودة'],
  },
];

const initialCourses = [
  {
    titleEn: 'Creative STEM & Structural Prototyping',
    titleAr: 'ورشة العلوم والتفكير الهندسي STEM',
    descriptionEn: 'Hands-on engineering workshop where students design load-bearing bridges, pneumatic lifts, and mechanical models.',
    descriptionAr: 'ورشة عملية يتعلم فيها الطلاب تصميم الجسور الحاملة، الرافعات الهيدروليكية، والنماذج الميكانيكية.',
    category: 'stem_robotics',
    ageGroup: '8 - 14 Years',
    durationWeeks: 4,
    sessionsCount: 8,
    priceEGP: 2400,
    syllabusEn: ['Bridge & Tower Structural Physics', 'Pneumatic Mechanics', 'Trial & Error Problem Solving', 'Final Capstone Project'],
    syllabusAr: ['فيزياء بناء الأبراج والجسور', 'الميكانيكا الهيدروليكية', 'حل المشكلات بالتجربة والخطأ', 'مشروع التخرج النهائي'],
    scheduleEn: 'Saturdays & Tuesdays (4:00 PM - 6:00 PM)',
    scheduleAr: 'السبت والثلاثاء (4:00 عصراً - 6:00 مساءً)',
    isActive: true,
  },
  {
    titleEn: 'Junior Leadership & Public Speaking',
    titleAr: 'برنامج إعداد القادة الصغار وفن الخطابة',
    descriptionEn: 'Interactive program empowering youth with speech structuring, active listening, body language, and debate confidence.',
    descriptionAr: 'برنامج تفاعلي يطور مهارات الخطابة، الاستماع الفعال، لغة الجسد، وإدارة الحوار والتفاوض بثقة.',
    category: 'leadership',
    ageGroup: '10 - 16 Years',
    durationWeeks: 4,
    sessionsCount: 8,
    priceEGP: 2200,
    syllabusEn: ['Speech Structure & Hook Design', 'Body Language & Voice Control', 'Structured Team Debates', 'Final Showcase Speech'],
    syllabusAr: ['هيكلة الحديث وجذب الجمهور', 'لغة الجسد ونبرة الصوت', 'المناظرات الجماعية المنظمة', 'عرض التخرج أمام الجمهور'],
    scheduleEn: 'Fridays & Mondays (5:00 PM - 7:00 PM)',
    scheduleAr: 'الجمعة والاثنين (5:00 مساءً - 7:00 مساءً)',
    isActive: true,
  },
  {
    titleEn: 'Outdoor Survival & Scout Skills',
    titleAr: 'دورة المهارات الكشفية والحياة البرية',
    descriptionEn: 'Field skills masterclass covering compass navigation, emergency shelter building, knot tying, and team orienteering.',
    descriptionAr: 'دورة عملية تغطي الملاحة بالبوصلة، بناء الملاجئ الطارئة، العقد الكشفية، وإدارة الفريق في الطبيعة.',
    category: 'outdoor_survival',
    ageGroup: '9 - 15 Years',
    durationWeeks: 2,
    sessionsCount: 4,
    priceEGP: 1800,
    syllabusEn: ['Topography & Map Reading', 'Advanced Knot Mechanics', 'Outdoor Safety & First Aid', 'Wilderness Challenge'],
    syllabusAr: ['قراءة الخرائط والملاحة', 'ميكانيكا العقد والربط', 'الإسعافات الأولية والسلامة', 'تحدي التوجيه في الميدان'],
    scheduleEn: 'Fridays (10:00 AM - 2:00 PM)',
    scheduleAr: 'أيام الجمعة (10:00 صباحاً - 2:00 ظهراً)',
    isActive: true,
  },
];

async function handleSeed() {
  try {
    await connectToDatabase();
    await Activity.deleteMany({});
    await Product.deleteMany({});
    await Course.deleteMany({});
    await RadioTrack.deleteMany({});

    const activities = await Activity.insertMany(initialActivities);
    const products = await Product.insertMany(initialProducts);
    const courses = await Course.insertMany(initialCourses);
    const seededTracks = await RadioTrack.insertMany(officialRadioSongs);

    return NextResponse.json({
      success: true,
      message: `Successfully seeded ${activities.length} activities and ${products.length} bazar products and ${courses.length} courses and ${seededTracks.length} radio tracks into MongoDB`,
      activitiesCount: activities.length,
      productsCount: products.length,
      coursesCount: courses.length,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function GET() {
  return handleSeed();
}

export async function POST() {
  return handleSeed();
}