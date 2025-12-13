import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    dangerouslyAllowBrowser: true // NB: In Next.js API routes this runs on server, but this flag suppressed warnings if mixed
});

export async function analyzeTitleWithAI(title, keyword, channelType) {
    if (!process.env.OPENAI_API_KEY) {
        throw new Error("Missing OPENAI_API_KEY");
    }

    const prompt = `
    Act as a YouTube Viral Expert (like MrBeast or Veritasium).
    
    Analyze this video concept:
    - Current Title: "${title}"
    - Niche/Channel Type: "${channelType}"
    - Keyword: "${keyword || 'None'}"

    Output a JSON response with the following structure (do NOT include markdown formatting, just raw JSON):
    {
      "score": <number 1-100 based on CTR potential>,
      "feedback": ["<point 1>", "<point 2>", "<point 3>"],
      "improved_titles": [
        "<Viral Title 1>",
        "<Viral Title 2>",
        ... (10 total)
      ],
      "hooks": [
        "<Hook script 1 (1-2 sentences)>",
        ... (5 total)
      ],
      "thumbnails": [
        ["<Thumb Text 1A>", "<Thumb Text 1B>"],
        ["<Thumb Text 2A>", "<Thumb Text 2B> (Alternative)"],
        ... (3 variations)
      ]
    }

    Rules:
    1. Titles must be under 60 chars where possible.
    2. Use curiosity gaps and emotional triggers.
    3. Hooks must be "scroll-stopping".
  `;

    try {
        const completion = await openai.chat.completions.create({
            messages: [{ role: "system", content: "You are a YouTube Expert API that calculates CTR." }, { role: "user", content: prompt }],
            model: "gpt-4-turbo-preview", // or gpt-3.5-turbo if cost is concern
            response_format: { type: "json_object" },
        });

        return JSON.parse(completion.choices[0].message.content);
    } catch (err) {
        console.error("OpenAI API Error:", err);
        throw err;
    }
}
