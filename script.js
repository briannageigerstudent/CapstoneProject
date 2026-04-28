const API_KEY = "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"; // open ai key

async function handleAction(type) {
  const input = document.getElementById("inputText").value;
  const outputDiv = document.getElementById("output");

  if (!input.trim()) {
    outputDiv.innerText = "Please enter material first.";
    return;
  }

  outputDiv.innerText = "Loading";

  let prompt = "";

  if (type === "summarize") {
    prompt = `Summarize this in simple terms:\n${input}`;
  } else if (type === "quiz") {
    prompt = `Create 5 quiz questions with answers at the endbased on:\n${input}`;
  } else if (type === "flashcards") {
    prompt = `Create flashcards (term - definition) based on:\n${input}`;
  } else if (type === "recommend resources") {
    prompt = `Recommend a few well known resources (books, websites, videos) to learn more about:\n${input}`;
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "user", content: prompt }
        ]
      })
    });

    const data = await response.json();
    outputDiv.innerText = data.choices[0].message.content;

  } catch (error) {
    outputDiv.innerText = "Error: " + error.message;
  }
}