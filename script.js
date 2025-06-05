// Questions du questionnaire
const questions = [
  {
    question: "Le poisson a attendu 3 heures sur la ligne de production",
    options: [
      "Les bactéries se sont développées ",
      "Ce n’est pas grave, le surgélateur va le surgeler ensuite",
      "Un retour en stock aurait dû être fait dès le début de la panne",
      "Il faut détruire toutes les matières qui ont dégelées lors de la panne"
    ],
    correct: [
      "Les bactéries se sont développées ",
      "Un retour en stock aurait dû être fait dès le début de la panne",
      "Il faut détruire toutes les matières qui ont dégelées lors de la panne"
    ],
    multiple: true
  },
  {
    question: "La sauce a attendu 3 heures dans le bas tampon à une température estimée à 60°C",
    options: [
      "Les bactéries se sont développées ",
      "La température reste correcte mais il faut refaire un CCP de cuisson",
      "La sauce a décanté mais je dose quand même ",
      "La sauce doit être mise en PSO"
    ],
    correct: [
      "La température reste correcte mais il faut refaire un CCP de cuisson",
      "La sauce doit être mise en PSO"
    ],
    multiple: true
  },
  {
    question: "Le mécanicien est venu de dehors sans se laver les mains",
    options: [
      "Il a eu raison car la panne était urgente",
      "Il a eu raison car il ne touche pas la matière",
      "Il a eu raison puisqu’il va les salir en manipulant la machine",
      "Il a eu tort, même s’il ne touche pas la matière"
    ],
    correct: ["Il a eu tort, même s’il ne touche pas la matière"]
  },
  {
    question: "Le mécanicien a posé la plaque de la pompe est posée au sol",
    options: [
      "Il a eu raison car il va rincer la plaque à l’eau",
      "Il a eu raison pour ne pas perdre de temps",
      "Il aurai dû se faire aider, pour aller chercher un bac propre et poser la plaque à l’intérieur",
      "Il l’a posé au sol, car il pensait que la ligne sera dans tous les cas nettoyée"
    ],
    correct: ["Il aurai dû se faire aider, pour aller chercher un bac propre et poser la plaque à l’intérieur"]
  }
];

let currentQuestionIndex = 0;

function afficherQuestion() {
  const question = questions[currentQuestionIndex];
  if (!question) return;

  const questionText = document.getElementById("question-text");
  const optionsContainer = document.getElementById("options-container");
  const nextButton = document.getElementById("next-button");

  questionText.textContent = question.question;
  optionsContainer.innerHTML = "";

  question.options.forEach(option => {
    const label = document.createElement("label");
    const input = document.createElement("input");
    input.type = question.multiple ? "checkbox" : "radio";
    input.name = "option";
    input.value = option;
    label.appendChild(input);
    label.appendChild(document.createTextNode(" " + option));
    optionsContainer.appendChild(label);
    optionsContainer.appendChild(document.createElement("br"));
  });

  nextButton.style.display = "block";
}

document.getElementById("next-button").addEventListener("click", () => {
  const inputs = document.querySelectorAll("#options-container input");
  const selected = Array.from(inputs).filter(i => i.checked).map(i => i.value);
  const correct = questions[currentQuestionIndex].correct.sort().toString();
  const selectedStr = selected.sort().toString();

  if (correct !== selectedStr) {
    afficherMessageErreur("Réponse incorrecte. Essayez encore !");
    return;
  }

  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    afficherQuestion();
  } else {
    document.getElementById("questionnaire").innerHTML = "<h3>Bravo ! Vous avez terminé !</h3>";
  }
});

function afficherMessageErreur(message) {
  const ancienneErreur = document.querySelector(".erreur-fullscreen");
  if (ancienneErreur) ancienneErreur.remove();

  const erreurDiv = document.createElement("div");
  erreurDiv.className = "erreur-fullscreen";
  erreurDiv.innerHTML = `
    <div class="erreur-content">
      <p>${message}</p>
      <button onclick="fermerMessageErreur()">RETOUR</button>
    </div>
  `;

  document.body.appendChild(erreurDiv);
}

function fermerMessageErreur() {
  const erreurDiv = document.querySelector(".erreur-fullscreen");
  if (erreurDiv) erreurDiv.remove();
}

function demarrerQuestionnaire() {
  document.getElementById("consignes-container").style.display = "none";
  document.getElementById("questionnaire").style.display = "block";
  currentQuestionIndex = 0;
  afficherQuestion();
}
