const API_KEY = "AIzaSyCT-ChvFtWuPQAyA-NkihWv-qK1ACtUHqA"

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
    prompt = `Create 5 quiz questions with answers at the end based on:\n${input}`;
  } else if (type === "flashcards") {
    prompt = `Create flashcards (term - definition) based on:\n${input}`;
  } else if (type === "recommend resources") {
    prompt = `Recommend a few well known resources (books, websites, videos) to learn more about:\n${input}`;
  }
  try{
  const response = await fetch(
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": API_KEY
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [{ text: prompt }]
        }
      ]
    })
  }
);

const data = await response.json();

const result = data.candidates?.[0]?.content?.parts?.[0]?.text;

if (result) {
  outputDiv.innerText = result;
} else {
  outputDiv.innerText = data.error?.message || "No response received.";
}
  } catch (error) {
    outputDiv.innerText = "Error: " + error.message;
  }
}