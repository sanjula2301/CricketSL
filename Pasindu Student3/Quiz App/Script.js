//getting all required elements
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const timeCount = quiz_box.querySelector(".timer .timer_sec");
const timeOff = quiz_box.querySelector("header .time_text");

const option_list = document.querySelector(".option_list");

//If start Quiz Button Clicked
start_btn.onclick =()=>{
    info_box.classList.add("activeInfo"); //show the info box
}

//If Exit Button Clicked
exit_btn.onclick =()=>{
    info_box.classList.remove("activeInfo");//hide the info box
}

//If Continue Button Clicked
continue_btn.onclick =()=>{
    info_box.classList.remove("activeInfo");//hide the info box
    quiz_box.classList.add("activeQuiz");//Show the quiz box
    showQuestions(0);
    queCounter(1);
    startTimer(6);
}

let que_count = 0;
let que_numb =1;
let counter;
let counterLine;
let timeValue = 6;
let widthValue =0;
let userScore = 0;

const next_btn = quiz_box.querySelector(".next_btn")
const result_box = document.querySelector(".result_box");
const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

quit_quiz .onclick = ()=>{
    window.location.reload();
}
//If Next Button Clicked
next_btn.onclick =()=>{
    if(que_count < questions.length - 1){
        que_count++;
        que_numb++;
        showQuestions(que_count);
        queCounter(que_numb);
        clearInterval(counter);
        startTimer(timeValue);
        clearInterval(counterLine);
        next_btn.style.display = "none";
        
    }else{
        clearInterval(counter);
        clearInterval(counterLine);
        showResultBox();
    }
}

//getting questions and from array
function showQuestions(index){
    const que_text = document.querySelector(".que_text");
    let que_tag = '<span>'+ questions[index].numb + "." + questions[index].question +'</span>';
    let option_tag = '<div class="option">'+ questions[index].options[0] +'<span></span></div>'
                     + '<div class="option">'+ questions[index].options[1] +'<span></span></div>'
                     + '<div class="option">'+ questions[index].options[2] +'<span></span></div>'
                     + '<div class="option">'+ questions[index].options[3] +'<span></span></div>';
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;
    const option = option_list.querySelectorAll(".option");
    for (let i =0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

let tickIcon ='<div class="icon tick">&checkmark;</i></div>';
let crossIcon ='<div class="icon cross">&cross;</i></div>';

function optionSelected(answer){
    clearInterval(counter);
    clearInterval(counterLine);
    let userAns = answer.textContent;
    let correctAns = questions[que_count].answer;
    let alloptions = option_list.children.length;
    if(userAns==correctAns){
        userScore =userScore+2;
        console.log(userScore);
        answer.classList.add("correct");
        answer.insertAdjacentHTML("beforeend", tickIcon);
    }
    else {
        userScore -=1;
        answer.classList.add("incorrect");
        answer.insertAdjacentHTML("beforeend", crossIcon);
    

        //if answer is incorrect then automatically selected the correct answer
        for (let i =0; i < alloptions; i++){
            if(option_list.children[i].textContent == correctAns){
                option_list.children[i].setAttribute("class", "option correct");
                option_list.children[i].insertAdjacentHTML("beforeend", tickIcon);
            }
        }
    }
    
    //once user selected disabled all options
    for (let i = 0; i < alloptions; i++) {
        option_list.children[i].classList.add("disabled")  
    }
    next_btn.style.display = "block";
}

function showResultBox(){
    info_box.classList.remove("activeInfo");//hide the info box
    quiz_box.classList.remove("activeQuiz");//hide the quiz box
    result_box.classList.add("activeResult");//Show the result box
    const scoretext = result_box.querySelector(".score_text");
    if( userScore > 15){
        let scoreTag ='<span>and congrats!, you got  <p>'+ userScore +'</p>out of <p>'+ questions.length*2 +'</p></span>';
        scoretext.innerHTML = scoreTag;
        document.body.style.backgroundColor="#E56448";//background color changing
    }
    else if( userScore > 10){
        let scoreTag ='<span>and nice, you got  <p>'+ userScore +'</p>out of <p>'+ questions.length*2 +'</p></span>';
        scoretext.innerHTML = scoreTag;
        document.body.style.backgroundColor="#EF2A00";//background color changing
    }
    else{
        let scoreTag ='<span>and sorry, you got only <p>'+ userScore +'</p>out of <p>'+ questions.length*2 +'</p></span>';
        scoretext.innerHTML = scoreTag;
        document.body.style.backgroundColor="#05F007";//background color changing
    }
}

function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time;
        time--;
        if(time < 9){
            let addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero; 
        }
        if(time < 0){
            clearInterval(counter);
            timeCount.textContent = "00";
            
            

            let correctAns = questions[que_count].answer;
            let alloptions = option_list.children.length;

            for (let i =0; i < alloptions; i++){
                if(option_list.children[i].textContent == correctAns){
                    option_list.children[i].setAttribute("class", "option correct");
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIcon);
                }
            }
            for (let i = 0; i < alloptions; i++) {
                option_list.children[i].classList.add("disabled")  
            }
            next_btn.style.display = "block";
        }
    }
}

function queCounter(index){
    const bottom_ques_counter = quiz_box.querySelector(".total_que");
    let totalQuesCountTag = '<span><p>'+ index  +'</p>of<p>'+ questions.length +'</p>Question</span>';
    bottom_ques_counter.innerHTML = totalQuesCountTag;
}