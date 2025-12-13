/**
 * YouTube CTR Boost Lab - Analysis Logic
 */

export function calculateCTRScore(title, keyword) {
    let score = 70; // Base score
    const feedback = [];

    // Length Check (ideal 45-70)
    if (title.length < 30) {
        score -= 10;
        feedback.push("Title is too short. Add more detail.");
    } else if (title.length > 70) {
        score -= 5;
        feedback.push("Title is a bit long. Can you tighten it?");
    } else {
        score += 10;
        feedback.push("Great length (40-70 chars).");
    }

    // Power Words Check
    const powerWords = [/secret/i, /mistake/i, /never/i, /stop/i, /easy/i, /fast/i, /insane/i, /how to/i, /tutorial/i];
    const hasPowerWord = powerWords.some(pw => pw.test(title));
    if (hasPowerWord) {
        score += 10;
        feedback.push("Contains scroll-stopping power words.");
    } else {
        score -= 5;
        feedback.push("Lacks emotional trigger words.");
    }

    // Specificity (Numbers)
    if (/\d+/.test(title)) {
        score += 5;
        feedback.push("Uses numbers for specificity.");
    }

    // Keyword Presence
    if (keyword && title.toLowerCase().includes(keyword.toLowerCase())) {
        score += 5;
        feedback.push(`Includes target keyword: "${keyword}"`);
    }

    // Cap score
    return {
        score: Math.min(Math.max(score, 0), 100),
        feedback: feedback.slice(0, 3)
    };
}

export function generateTitles(originalTitle, keyword = "Video") {
    // Simple heuristic patterns - in a real app, this would use an LLM
    // We will simply frame the topic in different templates

    const topic = keyword || originalTitle.split(' ').slice(0, 3).join(' ');

    return [
        `How I Mastered ${topic} in 7 Days (Step-by-Step)`,
        `Stop Doing This If You Want Better ${topic} Results`,
        `The ${topic} Secret No One Tells You`,
        `I Tried ${topic} for 30 Days - Here's What Happened`,
        `10 ${topic} Hacks That Actually Work`,
        `Why Most People Fail at ${topic}`,
        `The Ultimate Guide to ${topic} (2025 Edition)`,
        `$0 to Pro: ${topic} Masterclass`,
        `Don't Buy ${topic} Until You Watch This`,
        `7 ${topic} Mistakes That Are Killing Your Channel`
    ];
}

export function generateHooks(title) {
    return [
        "I bet you've been doing this wrong your whole life, and today implies why.",
        `If you want to master ${title}, you need to stop making this one mistake right now.`,
        "What if I told you that everything you know about this topic is a lie?",
        "In the next 5 minutes, I'm going to reveal the exact system used by pros.",
        "This is the only video you need to watch if you're serious about getting results."
    ];
}

export function generateThumbnailText(titleKeywords) {
    // Extract key concept if possible, or use generic strong phrases
    return [
        ["DON'T DO THIS", "HUGE MISTAKE"],
        ["100% WORKS", "THE TRUTH"],
        ["STOP!", "IT'S OVER"]
    ];
}
