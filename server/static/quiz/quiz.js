
document.addEventListener("DOMContentLoaded", async function () {
    console.log("Quiz JS loaded");
    let index = 0
    // Example: Better prompt structure
    const quizPrompt = `Genera 4 domande uniche e diverse in formato flashcard su ${prompt}.
                        Requisiti:
                        - Ogni domanda deve essere DIVERSA per stile e argomento
                        - Varia le domande temperature 1.0
                        - Ordina le domande in modo casuale
                        
                        - Varia i tipi di domanda: includi scelta multipla, vero/falso e risposta aperta
                        - Usa diversi livelli di difficoltà (principiante, intermedio, avanzato)
                        - Concentrati su diversi aspetti dell'argomento (storia, applicazione, teoria, esempi)
                        - Evita di ripetere domande già generate
                        - Rendi le domande specifiche ed evita variazioni generiche
                        - Usa vocabolario e formulazioni variate
                        - Usa la stessa lingua dell'argomento (italiano)`;
    const url = `http://localhost:3000/api/gemini/structured-output?prompt=${encodeURIComponent(quizPrompt)}`;

    const resultMessage = document.getElementById("resultMessage");
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    console.log("Quiz data fetched successfully");

    createQuiz(data.object.flashcards, index);

    function createQuiz(flashcards, index = 0) {
        const showSolutionButton = document.getElementById("showSolutionButton");
        const questionContainer = document.getElementById("questionContainer");
        console.log("Creating quiz with flashcards:", flashcards);
        questionContainer.innerHTML = "";

        let flashcard = flashcards[index];
        let answer = flashcard.answer; // string of the correct answer

        const questionDiv = document.createElement("div");
        questionDiv.className = "question";
        questionDiv.innerHTML = `<h3>Question ${index + 1}: ${flashcard.question}</h3>`;
        flashcard.options.forEach(option => {
            const optionButton = document.createElement("button");
            optionButton.className = "option";
            optionButton.innerText = option;
            optionButton.addEventListener("click", function () {
                if (option === answer) {
                    resultMessage.innerHTML = `<b>Correct!</b> <br/>${answer || ""}`;
                    optionButton.classList.add("correct");
                } else {
                    resultMessage.innerText = "Incorrect! Try again.";
                    optionButton.classList.add("incorrect");
                }
            });
            questionDiv.appendChild(optionButton);
        });
        showSolutionButton.addEventListener("click", function () {
            resultMessage.innerText = "The correct answer is: " + answer;
        });
        questionContainer.appendChild(questionDiv);
    }


    const prevButton = document.getElementById("prevButton");
    const nextButton = document.getElementById("nextButton");



    prevButton.addEventListener("click", function () {
        if (index > 0) {
            index--;
            createQuiz(data.object.flashcards, index);
        }
    });
    nextButton.addEventListener("click", function () {
        if (index < data.object.flashcards.length - 1) {
            index++;
            createQuiz(data.object.flashcards, index);
        }
    });
});