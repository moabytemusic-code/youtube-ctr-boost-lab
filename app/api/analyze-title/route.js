import { NextResponse } from 'next/server';
import { calculateCTRScore, generateTitles, generateHooks, generateThumbnailText } from '@/lib/logic';
import { analyzeTitleWithAI } from '@/lib/ai';
import { sendBrevoEmail, createBrevoContact } from '@/lib/brevo';

export async function POST(request) {
    try {
        const body = await request.json();
        const { title, keyword, channelType, email } = body;

        if (!title) {
            return NextResponse.json({ error: 'Title is required' }, { status: 400 });
        }

        let diagnosis, allTitles, hooks, thumbnails, score;

        // DECIDE: AI or Static?
        if (process.env.OPENAI_API_KEY) {
            try {
                // Use AI
                const aiData = await analyzeTitleWithAI(title, keyword, channelType);
                score = aiData.score;
                diagnosis = { score: aiData.score, feedback: aiData.feedback };
                allTitles = aiData.improved_titles;
                hooks = aiData.hooks;
                thumbnails = aiData.thumbnails.map(t => typeof t === 'string' ? t : t.join(' / ')); // Normalize
            } catch (err) {
                console.error("AI Generation Failed, falling back to static:", err);
                // Fallback to static below
            }
        }

        // Static Fallback (if no Key or AI failed)
        if (!allTitles) {
            const staticDiagnosis = calculateCTRScore(title, keyword);
            score = staticDiagnosis.score;
            diagnosis = staticDiagnosis;
            allTitles = generateTitles(title, keyword);
            hooks = generateHooks(title);
            thumbnails = generateThumbnailText(title).map(t => t.join(' / '));
        }

        // Teaser vs Full Response
        if (!email) {
            return NextResponse.json({
                type: 'teaser',
                originalTitle: title,
                score: score,
                feedback: diagnosis.feedback,
                previewTitles: allTitles.slice(0, 2), // Only 2
            });
        }


        // If Email provided - Send actual email via Brevo
        if (email) {
            // Construct a simple accessible HTML email
            const htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
          <h1 style="color: #FF2D55;">YouTube CTR Boost Pack</h1>
          <p>Here are your optimized results for: <strong>"${title}"</strong></p>
          
          <div style="background: #f5f5f5; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h2 style="margin-top:0;">Analysis Score: ${score}/100</h2>
            <ul>${diagnosis.feedback.map(f => `<li>${f}</li>`).join('')}</ul>
          </div>

          <h3>🔥 10 Viral Title Ideas</h3>
          <ol>
            ${allTitles.map(t => `<li style="margin-bottom: 5px;">${t}</li>`).join('')}
          </ol>

          <h3>🪝 5 Hook Scripts</h3>
          <ul style="background: #eef; padding: 15px; border-radius: 8px;">
            ${hooks.map(h => `<li style="margin-bottom: 10px;">"${h}"</li>`).join('')}
          </ul>
          
          <h3>🖼️ Thumbnail Text Ideas</h3>
          <ul style="background: #eee; padding: 15px; border-radius: 8px;">
             ${thumbnails ? thumbnails.map(t => `<li style="margin-bottom: 5px;">${t}</li>`).join('') : ''}
          </ul>

          <p style="margin-top: 30px; font-size: 0.9em; color: #666;">
            Keep creating!<br/>
            - The YouTube CTR Boost Lab Team
          </p>
        </div>
          <div style="margin-top: 40px; border-top: 1px solid #ddd; padding-top: 20px;">
            <p><strong>Want to grow faster? Here are the tools we recommend:</strong></p>
            <p>
              🚀 <a href="https://www.tubebuddy.com" style="color: #FF2D55; text-decoration: none; font-weight: bold;">TubeBuddy</a> - Rank #1 for keywords<br/>
              ⚡ <a href="https://vidiq.com" style="color: #FF2D55; text-decoration: none; font-weight: bold;">VidIQ</a> - Steal your competitors' views<br/>
              🎵 <a href="https://www.epidemicsound.com" style="color: #FF2D55; text-decoration: none; font-weight: bold;">Epidemic Sound</a> - Best music for creators
            </p>
          </div>
        </div>
      `;

            // Send the email (fire and forget usage, or await if critical)
            await sendBrevoEmail({
                to: email,
                subject: `Your CTR Boost Pack: ${title}`,
                htmlContent: htmlContent
            });

            // Add to Brevo Contacts list
            await createBrevoContact({
                email: email,
                attributes: {
                    FIRSTNAME: 'YouTube Creator', // Generic name or parsed from email
                    LEAD_SOURCE: 'CTR_Boost_Lab'
                }
            });
        }

        return NextResponse.json({
            type: 'full',
            originalTitle: title,
            score: score,
            feedback: diagnosis.feedback,
            allTitles: allTitles,
            hooks: hooks,
            thumbnailIdeas: thumbnails,
            message: 'Full report sent to your inbox!'
        });

    } catch (error) {
        console.error("API Error", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
