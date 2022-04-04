const main = document.querySelector("#main");
const qna = document.querySelector("#qna");
const result = document.querySelector("#result");
const startBtn = document.querySelector(".main-startbtn");
const endPoint = 12;
const select = { mouse: 0, cow: 0, tiger: 0, rabbit: 0,
                dragon: 0, snake: 0, horse: 0, sheep: 0,
                monkey: 0, chick: 0, dog: 0, pig: 0
                };
const selectArr =  ["mouse", "cow", "tiger", "rabbit", "dragon", "snake", "horse", "sheep", "monkey", "chick", "dog", "pig"]
    

function addAnswer(answerText, qIdx, idx){
    var a = document.querySelector(".answer-box");
    var answer = document.createElement("button");
    answer.classList.add('answerList-Element');
    answer.classList.add('fadeIn');
    answer.classList.add('mx-auto');
    answer.innerHTML = answerText;
    a.appendChild(answer);

    answer.addEventListener("click", function(){
        var children = document.querySelectorAll(".answerList-Element");
        for(let i = 0; i < children.length; i++){
            children[i].disabled = true;
            children[i].style.WebkitAnimation = "fadeOut 0.5s";
            children[i].style.animation = "fadeOut 0.5s";
        }
        setTimeout(() => {
            var target = qnaList[qIdx].a[idx].type;
            for(let i = 0; i < target.length; i++){
                select[target[i]]++;
            }
            console.log(select);
            for(let j = 0; j < children.length; j++){
                children[j].style.display = "none";
            }
            goNext(++qIdx); 
            }, 450)
    });
}
function setResult(){
    let point = calculateResult();
    const resultName = document.querySelector(".result-name");
    resultName.innerHTML = infoList[point].name;

    var resultImg = document.createElement("img");
    const imgDiv = document.querySelector(".result-img");
    var imgURL = `./resource/img/${images[point]}`;
    console.log(imgURL);
    resultImg.src = imgURL;
    resultImg.alt = point;
    resultImg.classList.add("img-fluid");
    imgDiv.appendChild(resultImg);

    const resultDesc = document.querySelector(".result-desc");
    resultDesc.innerHTML = infoList[point].desc;
}

function calculateResult(){
    let selecResult = Object.keys(select).reduce(function(a, b){ return select[a] > select[b] ? a : b });
    console.log(selecResult);
    let selectResultIdx = selectArr.indexOf(selecResult);
    console.log(selectResultIdx);
    return selectResultIdx;
}

function goResult(){
    qna.style.WebkitAnimation = "fadeOut 1s";
    qna.style.animation = "fadeOut 1s";

    setTimeout(() => {
        result.style.WebkitAnimation = "fadeIn 1s";
        result.style.animation = "fadeIn 1s";
        setTimeout(() => {
            qna.style.display = "none";
            result.style.display = "block";
        }, 450);
    }, 450);

    setResult();
}

function goNext(qIdx){
    if(qIdx === endPoint){ 
        goResult();
        return;
    }
    var q = document.querySelector(".question-box");
    q.innerHTML = qnaList[qIdx].q;
    for(let i in qnaList[qIdx].a){
        addAnswer(qnaList[qIdx].a[i].answer, qIdx, i);
    }
    var status = document.querySelector(".status-bar");
    status.style.width = (100/endPoint) * (qIdx+1) + '%';
}
function begin(){
    main.style.WebkitAnimation = "fadeOut 1s";
    main.style.animation = "fadeOut 1s";
    startBtn.disabled = true;

    setTimeout(() => {
        qna.style.WebkitAnimation = "fadeIn 1s";
        qna.style.animation = "fadeIn 1s";
        setTimeout(() => {
            main.style.display = "none";
            qna.style.display = "block";
        }, 450);
        let qIdx = 0;
        goNext(qIdx);
    }, 450);
}