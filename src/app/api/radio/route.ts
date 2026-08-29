import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/mongodb';
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
    },
];

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const all = searchParams.get('all') === 'true';

        try {
            await connectToDatabase();
            const filter = all ? {} : { isActive: true };
            const tracks = await RadioTrack.find(filter).sort({ order: 1, createdAt: -1 }).lean();
            if (tracks && tracks.length > 0) {
                return NextResponse.json({ success: true, data: tracks });
            }
        } catch (dbError) {
            console.warn('[Radio API Fallback]', dbError);
        }

        // Always fallback to the 7 official songs with 200 OK
        return NextResponse.json({ success: true, data: officialRadioSongs });
    } catch (error: any) {
        return NextResponse.json({ success: true, data: officialRadioSongs });
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        await connectToDatabase();
        const newTrack = await RadioTrack.create(body);
        return NextResponse.json({ success: true, data: newTrack }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}