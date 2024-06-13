
const questions = [
    {
        question : "Who has the most number of runs in International Cricket ? ",
        answers : [
               {text:"Virat Kohli", correct : false},
               {text:"Rohit Sharma", correct : false},
               {text:"Sachin Tendulkar", correct : true},
               {text:"Ricky Ponting", correct : false},

        ]
    },
    {
        question : "Who is the largest animal in the World ? ",
        answers : [
               {text:"Elephant", correct : false},
               {text:"Lion", correct : false},
               {text:"Blue Whale", correct : true},
               {text:"Tiger", correct : false},

        ]
    },
    {
        question : "Who is the first President of India ? ",
        answers : [
               {text:"Jawahar Lal Nehru", correct : false},
               {text:"Rajendra Prasad", correct : true},
               {text:"B.R. Ambedkar", correct : false},
               {text:"Lal Bahadur Shastri", correct : false},

        ]
    }
]

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();                                                                                                                          
}
function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML =  answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        // If answer.correct is true, this code assigns this value to a custom data attribute (data-correct) on the button element. 
        if(answer.correct){
            button.dataset.correct = answer.correct; 
        }
        button.addEventListener("click", selectAnswer);
    });
}

function  resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
const selectedBtn = e.target;
const isCorrect = selectedBtn.dataset.correct === "true";
if(isCorrect){
selectedBtn.classList.add("correct");
score++;
}
else{
    selectedBtn.classList.add("incorrect");
}
Array.from(answerButtons.children).forEach(button=>{
    if(button.dataset.correct === "true"){
        button.classList.add("correct");
    }
    button.disabled = true;
});
nextButton.style.display = "block";
}

function showScore(){
    resetState();
questionElement.innerHTML=`Your score is ${score} out of ${questions.length}`;
nextButton.innerHTML = `Play again`;
nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}
nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex<questions.length){
    handleNextButton();
    }
    else{
        startQuiz();
    }
})
startQuiz();