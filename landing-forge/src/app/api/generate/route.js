import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const maxDuration = 60; // Allow 60s for detailed generation

export async function POST(req) {
  try {
    const body = await req.json();
    const { productName, audience, promise, goal, style } = body;

    const prompt = `
    You are a world-class Conversion Rate Optimization (CRO) copywriter.
    Your goal is to write the content for a high-converting landing page for a product.
    
    PRODUCT DETAILS:
    - Name: ${productName}
    - Target Audience: ${audience}
    - Core Promise: ${promise}
    - Page Goal: ${goal}
    - Tone/Style: ${style}

    OUTPUT FORMAT:
    Return ONLY valid JSON. The structure must be exactly this:
    {
      "meta": {
        "title": "SEO Title (under 60 chars)",
        "description": "Meta description (under 160 chars)"
      },
      "nav": {
        "logo": "Brand Name",
        "cta": "Nav Button Text"
      },
      "hero": {
        "headline": "H1 Headline (Benefit Driven, Bold)",
        "subhead": "H2 Subheadline (Clarifies the offer, addresses objection)",
        "cta": "Primary CTA Text",
        "trust": "Micro-text below CTA (e.g. 'No credit card required')"
      },
      "features": {
        "heading": "Section Heading",
        "items": [
          { "title": "Feature 1", "desc": "Benefit of feature 1" },
          { "title": "Feature 2", "desc": "Benefit of feature 2" },
          { "title": "Feature 3", "desc": "Benefit of feature 3" }
        ]
      },
      "howItWorks": {
        "heading": "How It Works",
        "steps": [
          { "title": "Step 1", "desc": "Description 1" },
          { "title": "Step 2", "desc": "Description 2" },
          { "title": "Step 3", "desc": "Description 3" }
        ]
      },
      "testimonials": {
        "heading": "What Users Say",
        "reviews": [
          { "name": "User 1", "role": "Role 1", "text": "Review text 1" },
          { "name": "User 2", "role": "Role 2", "text": "Review text 2" }
        ]
      },
      "pricing": {
        "heading": "Simple Pricing",
        "price": "$XX",
        "period": "/month or /one-time",
        "items": ["Benefit 1", "Benefit 2", "Benefit 3"],
        "cta": "Buy Now CTA"
      },
      "faq": [
        { "q": "Question 1?", "a": "Answer 1" },
        { "q": "Question 2?", "a": "Answer 2" },
        { "q": "Question 3?", "a": "Answer 3" }
      ],
      "footer": {
         "copyright": "© 2024 ${productName}. All rights reserved."
      }
    }
    `;

    console.log('Generating page for:', productName);

    if (!process.env.OPENAI_API_KEY) {
      console.error('Missing OpenAI API Key');
      return NextResponse.json({ error: 'Missing API Key' }, { status: 500 });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "You are a JSON generator. You always return valid JSON. No markdown formatting." },
        { role: "user", content: prompt }
      ],
      response_format: { type: "json_object" },
    });

    console.log('AI Response received');

    const content = JSON.parse(completion.choices[0].message.content);
    return NextResponse.json(content);

  } catch (error) {
    console.error('AI Error:', error);
    return NextResponse.json({ error: 'Failed to generate page' }, { status: 500 });
  }
}
