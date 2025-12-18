import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';
import { OpenAI } from 'openai';

// Reuse the OpenAI client from the existing environment
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
    try {
        const { url, text } = await req.json();

        if (!url && !text) {
            return NextResponse.json({ error: 'URL or Text is required' }, { status: 400 });
        }

        let rawContext = '';

        if (url) {
            console.log(`Scraping: ${url}`);

            // 1. Fetch the HTML
            const response = await fetch(url, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
                }
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch URL: ${response.status}`);
            }

            const html = await response.text();
            const $ = cheerio.load(html);

            // 2. Extract meaningful text
            const title = $('title').text() || '';
            const metaDesc = $('meta[name="description"]').attr('content') || '';
            const h1 = $('h1').text() || '';

            // Get paragraphs (limit to first 5 meaningful ones to avoid noise)
            const paragraphs = [];
            $('p').each((i, el) => {
                const t = $(el).text().trim();
                if (t.length > 50) paragraphs.push(t);
                if (paragraphs.length >= 5) return false;
            });

            // Extract About content if "About" page or section is detected (basic heuristic)
            // Or just grab the general context

            rawContext = `
    Title: ${title}
    Meta Description: ${metaDesc}
    H1: ${h1}
    Content Snippets: ${paragraphs.join('\n')}
    `;
        } else if (text) {
            console.log('Analyzing Raw Text...');
            rawContext = text;
        }

        console.log('Raw Context extracted. Sending to AI for summarization...');

        // 3. Use AI to structure this into our Form Data format
        const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                { role: "system", content: "You are an expert content analyzer." },
                {
                    role: "user", content: `
          Analyze this content and extract the Product Name, Target Audience, and Core Promise.
          
          CONTENT:
          ${rawContext}

          Return JSON only:
          {
            "productName": "Name of the product/brand",
            "audience": "Who calls this product is for",
            "promise": "The main benefit or promise"
          }
        `}
            ],
            response_format: { type: "json_object" },
        });

        const parsedData = JSON.parse(completion.choices[0].message.content);
        return NextResponse.json(parsedData);

    } catch (error) {
        console.error('Scrape API Error:', error);
        return NextResponse.json({ error: 'Failed to analyze URL' }, { status: 500 });
    }
}
