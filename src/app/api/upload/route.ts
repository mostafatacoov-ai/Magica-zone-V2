import { NextRequest, NextResponse } from 'next/server';
import fs from 'node:fs/promises';
import path from 'node:path';

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get('file') as File | null;
        const folder = (formData.get('folder') as string) || 'uploads';

        if (!file) {
            return NextResponse.json({ success: false, message: 'No file selected' }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Generate safe clean filename with timestamp
        const timestamp = Date.now();
        const cleanFileName = `${timestamp}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;

        // Target upload directory inside public/
        const targetDir = path.join(process.cwd(), 'public', folder);

        try {
            await fs.mkdir(targetDir, { recursive: true });
        } catch (e) {
            // directory already exists
        }

        const filePath = path.join(targetDir, cleanFileName);
        await fs.writeFile(filePath, buffer);

        const publicUrl = `/${folder}/${cleanFileName}`;

        return NextResponse.json({
            success: true,
            url: publicUrl,
            fileName: cleanFileName,
        });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}