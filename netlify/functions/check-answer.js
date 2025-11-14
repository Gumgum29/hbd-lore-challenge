// This is the secret file, deployed securely on a serverless platform.

exports.handler = async (event) => {
    // 1. All the secret answers are defined here and are not exposed to the user's browser.
    const secretAnswers = {
        1: ["lander", "ulo", "megamind"],
        2: ["ivan", "ivan pogi", "otnis", "ivan royce marasigan", "turtur", "ivan royce turtur"],
        3: ["emman", "boratilyo", "abdul", "emman romeo", "emman romeo sarmiento"],
        4: ["burat", "tite", "dick", "anim na burat"]
    };

    // 2. Parse the incoming request data (stage and answer)
    let body;
    try {
        body = JSON.parse(event.body);
    } catch (e) {
        return { statusCode: 400, body: JSON.stringify({ error: "Invalid JSON body" }) };
    }
    
    const { stage, answer } = body;
    const stageNumber = parseInt(stage);
    const sanitizedAnswer = String(answer).toLowerCase().trim();

    let isCorrect = false;

    // 3. Check the user's answer against the secret list
    if (secretAnswers[stageNumber] && secretAnswers[stageNumber].includes(sanitizedAnswer)) {
        isCorrect = true;
    }

    // 4. Return the result back to the user's browser
    return {
        statusCode: 200,
        headers: {
            // Required for cross-origin requests
            "Access-Control-Allow-Origin": "*", 
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ correct: isCorrect }),
    };
};