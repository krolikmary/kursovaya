const count_items = [10, 15, 14];
const count_tasks = 5;
const time_wait = 30;
 

const colors = ["blue", "yellow",  "pink", "orange"];
 
const quest_conditions = [
    {condition:'начинающиеся на букву Я',  check: 'я'},
    {condition:'начинающиеся на букву Л', check: 'л'},
    {condition:'начинающиеся на букву А', check: 'а'},
    {condition:'начинающиеся на букву Т', check: 'т'},
    {condition:'означающие животных', check: 'животное'},
    {condition:'означающие фрукт', check: 'фрукт'},
    {condition:'означающие город', check: 'город'}
  
];

 

const words = [
    { word: 'яблоко', condition1: 'фрукт',  condition2: 'я'},
    { word: 'ананас', condition1: 'фрукт', condition2: 'а'},
    { word: 'апельсин', condition1: 'фрукт', condition2: 'а'},
    { word: 'як', condition1: 'животное', condition2: 'я'},
    
    { word: 'лимон', condition1: 'фрукт', condition2: 'л'},
    { word: 'лось', condition1: 'животное' , condition2: 'л'},
    { word: 'лев', condition1: 'животное', condition2: 'л'},
    { word: 'личи', condition1: 'фрукт', condition2: 'л'},
    { word: 'лайм', condition1: 'фрукт', condition2: 'л'},
    { word: 'абрикос', condition1: 'фрукт', condition2: 'а'},
    { word: 'Архангельск', condition1: 'город', condition2: 'а'},
    { word: 'Адлер', condition1: 'город', condition2: 'а'},
    { word: 'Абакан', condition1: 'город', condition2: 'а'},
    { word: 'Анапа', condition1: 'город', condition2: 'а'},
    { word: 'Арзамас', condition1: 'город', condition2: 'а'},
    { word: 'Тверь', condition1: 'город', condition2: 'т'},
    { word: 'Таганрог', condition1: 'город', condition2: 'т'},
    { word: 'Тамбов', condition1: 'город', condition2: 'т'},
    { word: 'Тигр', condition1: 'животное', condition2: 'т'},
    { word: 'Тюлень', condition1: 'животное', condition2: 'т'},
    { word: 'Тукан', condition1: 'животное', condition2: 'т'}
 
]
 





 
let currentTask = 0;
let countAnsw = 0;
 
let userScore = 0;
let level = localStorage.getItem("last_level");
let task_tracking = document.querySelector('.task_tracking').children;
 

 
// Добавление индикаторов
const taskTracking = document.querySelector('.task_tracking');
for (let i = 0; i < count_tasks; i++) {
    const taskIndicator = document.createElement('div');
    taskIndicator.className = 'task_indicator';
    taskTracking.appendChild(taskIndicator);
}
 
 
 
 
    generate_task();
    
    showRules();
 
    function showRules() {
        document.querySelector('.timer_slider').style.animationPlayState = 'paused';
    
        const wrapRes = document.createElement('div');
        wrapRes.className = 'wrap_res';
    
        const title = document.createElement('h1');
        title.className = 'title';
        title.textContent = 'Правило';
        wrapRes.appendChild(title);
    
        const description = document.createElement('h');
        description.style.fontSize = '14pt';
        if(level== 1){description.textContent = 'Выбрать все слова с заданным свойством';}
        else if (level == 2){description.textContent = 'Выбрать все слова с заданным свойством и цветом';}
        else{description.textContent = 'Разделить слова на группы по категориям';}
        
        wrapRes.appendChild(description);
 
        const form = document.createElement('form');
        const button = document.createElement('button');
        button.className = 'button';
        button.type = 'button';
        button.textContent = 'поехали';
        form.appendChild(button);
        wrapRes.appendChild(form);
        
        
        
    
        const mask = document.createElement('div');
        mask.className = 'mask';
    
        document.querySelector('body').appendChild(wrapRes);
        document.querySelector('body').appendChild(mask);
    
        button.addEventListener('click', () => {
            document.querySelector('.timer_slider').style.animationPlayState = 'running';
            wrapRes.remove();
            mask.remove();
        });
    }
    
 
//генерация задания
function generate_task() {
    let items = document.querySelector('.items');
    let title = document.querySelector('.title_quest');
    countAnsw = 0;
    task_words = []; 

     // выбор условия для задания
     let condition_index = Math.floor(Math.random() * quest_conditions.length);
     let condition = quest_conditions[condition_index][Object.keys(quest_conditions[0])[0]];
     let conditioncheck = quest_conditions[condition_index][Object.keys(quest_conditions[0])[1]];


     if (level == 2){
        
        randomColor = colors[ Math.floor(Math.random() * colors.length)];
        title.innerHTML = `<span style="color: ${randomColor};">Выберите все слова ${condition}</span>`;
    }
     if (level == 1) title.innerHTML = `Выберите все слова ${condition}`;
    

   
     
    const index = words.findIndex(item => item.condition1 === conditioncheck || item.condition2 === conditioncheck);

    task_words.push(words[index]);
 
    //выбор случайных слов
    for (let i = 0; i < count_items[level - 1]; i++) {
        task_words.push(words[Math.floor(Math.random() * words.length)]); //тут лежат выбранные слова с подходящими им условиями
    }
 
  
    console.log("очищение")
 
    items.replaceChildren(); // очищение от слов
    while(document.getElementsByClassName('word').length > 0) {
        document.getElementsByClassName('word')[0].remove();
    }
    let k = 0;
    setWords(task_words).forEach((element, index) => {
        items.appendChild(element)
        
        if (level == 2){
                const randomIndex = Math.floor(Math.random() * colors.length);
                if (index === 0) {
                    element.style.background = randomColor;
                } else {
                    element.style.background = colors[randomIndex];
                }
        }
        if(level == 3){
            element.style.background = "white"; 
            const parentRect = items.getBoundingClientRect();
        const randomTop = Math.floor(Math.random()* (parentRect.height  - element.offsetHeight -20)+20);
        const randomLeft = Math.floor(Math.random() * (parentRect.width -   element.offsetWidth-40 )+40);
        
        
        // Устанавливаем координаты
        element.style.top = randomTop + "px"; 
        element.style.left = randomLeft + "px"; 
        }
        
        
    });


    
    
    if (level == 1 || level == 2) {
        
        animateWords() ;}
    if (level == 3){
        
       addMoveHandler();
        
        
    }
  
 
    isStartTimer(true); // запуск таймера
    
 
    let arrAnswers = quest_conditions[condition_index] 
    //обработка нажатия на ответы

    if (level == 1) {
        document.querySelectorAll('.word').forEach(item => {
            item.addEventListener('click', () => { processing(item, arrAnswers, generate_task) })
        });
    } else if (level == 2) {
        document.querySelectorAll('.word').forEach(item => {
            item.addEventListener('dblclick', () => { processing(item, arrAnswers, generate_task) })
        });
    }

    

    
}
 
 
 
 
 
 
function isStartTimer(a) {
    const timerContainer = document.querySelector('.timer');
 
    if (a) { // добавление таймера
        const timerSlider = document.createElement('div');
        timerSlider.className = 'timer_slider';
        timerSlider.style.animation = `${time_wait}s timer forwards linear`;
 
        timerSlider.addEventListener('animationend', () => {
            task_tracking[currentTask++].style.background = 'brown';
            if (currentTask === count_tasks) {
                showRes();
            } else {
                isStartTimer(false);
                generate_task();
            }
        });
 
        timerContainer.insertAdjacentElement('afterbegin', timerSlider);
    } else { // удаление таймера
        timerContainer.replaceChildren();
    }
}
 
 
function showRes() {
    
    document.querySelector('.timer_slider').remove();
    const wrapRes = document.createElement('div');
    wrapRes.className = 'wrap_res';
 
    const title = document.createElement('h');
    title.className = 'title';
    title.textContent = `Ваш результат: ${userScore}`;
    

    // сохранение результата
    let name = localStorage.getItem("last_player");
    let userScores = localStorage.getItem(name).split(',');
    userScores[level - 1] = userScore > (userScores[level - 1] || 0) ? userScore : userScores[level - 1];
    if (isNaN(userScores[level - 1])) {
        userScores[level - 1] = userScore;
    }
    userScores[level - 1] = +userScores[level - 1];
    localStorage.setItem(name, userScores);
    let res = document.querySelector('.wrap_res');


    
    const form = document.createElement('form');

    if (userScore === 5 && level < 3) {
        alert(level);
        const nextLevelButton = document.createElement('button');
        nextLevelButton.className = 'button';
        nextLevelButton.type = 'button';
        nextLevelButton.textContent = 'next lvl';
        nextLevelButton.addEventListener('click', function(){
            level++;
            localStorage.setItem("last_level", level);
            window.location.href = 'game.html';
            
        });
        form.appendChild(nextLevelButton);
        
    }
    else{
        const restartButton = document.createElement('button');
        restartButton.className = 'button';
        restartButton.type = 'button';
        restartButton.textContent = 'again';
        restartButton.addEventListener('click', function(){
            
            
            window.location.href = 'game.html';
            
        });
        form.appendChild(restartButton);
    }
    
 
    wrapRes.appendChild(title);
    wrapRes.appendChild(form);
 
    const mask = document.createElement('div');
    mask.className = 'mask';
 
    document.querySelector('body').appendChild(wrapRes);
    document.querySelector('body').appendChild(mask);
 
    
}
 
function processing(item, arrAnswers, generate) {
    item.setAttribute("checked", true)
    let win = false;
    let count = 0;
    if (level == 3) {
        const words = document.querySelectorAll('.word'); // Получаем все слова
        
        words.forEach(word1 => {
            words.forEach(word2 => {
                rect1 = word1.getBoundingClientRect();
                rect2 = word2.getBoundingClientRect();
                // Проверяем условия совпадения для каждой пары слов
                if ((Math.abs(rect1.top - rect2.top) < 100 &&
                    Math.abs(rect1.left - rect2.left) < 100 &&
                    word1.getAttribute("condition1") === word2.getAttribute("condition1")) || 
                    ((Math.abs(rect1.top - rect2.top) > 100 ||
                    Math.abs(rect1.left - rect2.left) > 100) &&
                    word1.getAttribute("condition1") != word2.getAttribute("condition1"))) {
                    count++;
                }
            });
        });

        // Если количество совпадений равно 225 (15x15), значит, все слова находятся в правильных группах
        if (count === 225) {
            
            countAnsw += 1
            userScore += 1
            
            console.log("userScore=" + userScore)
            console.log("currentTask=" + currentTask)
            console.log("count_tasks="+count_tasks)
            task_tracking[currentTask++].style = 'background: green';
            if (currentTask == count_tasks) {
                showRes();
            } else {
                isStartTimer(false);
                generate();
            }
        }
        else {
        // task_tracking[currentTask++].style = 'background: brown';
        // if (currentTask == count_tasks) {
        //     showRes();
        // } else {
        //     isStartTimer(false);
        //     generate();
        // }
        }

        
    }


    

    if (level == 2){
        if ((arrAnswers.check == item.textContent[0] || arrAnswers.check == item.getAttribute("condition1") ||  arrAnswers.check == item.getAttribute("condition2"))
        && randomColor == item.style.backgroundColor) {
            countAnsw += 1;
            item.style = 'background: rgb(90 169 90)';
            if (noMoreLeft(arrAnswers)) { //!!!
                userScore += 1;
                console.log("userScore=" + userScore)
                console.log("currentTask=" + currentTask)
                console.log("count_tasks="+count_tasks)
                task_tracking[currentTask++].style = 'background: green';
                if (currentTask == count_tasks) {
                    showRes();
                } else {
                    isStartTimer(false);
                    generate();
                }
            }
        } else {
            task_tracking[currentTask++].style = 'background: brown';
            if (currentTask == count_tasks) {
                showRes();
            } else {
                isStartTimer(false);
                generate();
            }
        }
    }


    if(level == 1){
        if (arrAnswers.check == item.textContent[0] || arrAnswers.check == item.getAttribute("condition1") ||  arrAnswers.check == item.getAttribute("condition2")) {
            countAnsw += 1;
            item.style = 'background: rgb(90 169 90)';
            if (noMoreLeft(arrAnswers)) { //!!!
                userScore += 1;
                console.log("userScore=" + userScore)
                console.log("currentTask=" + currentTask)
                console.log("count_tasks="+count_tasks)
                task_tracking[currentTask++].style = 'background: green';
                if (currentTask == count_tasks) {
                    showRes();
                } else {
                    isStartTimer(false);
                    generate();
                }
            }
        } else {
            task_tracking[currentTask++].style = 'background: brown';
            if (currentTask == count_tasks) {
                showRes();
            } else {
                isStartTimer(false);
                generate();
            }
        }

    }
    
}

function noMoreLeft(arrAnswers) {
    let ans = true
    document.querySelectorAll('.word').forEach(item => {
        if (isCorrect(item, arrAnswers) && item.getAttribute("checked") != "true") {
            ans = false
        }
    });
    return ans
}
 
function isCorrect(item, arrAnswers) {
    if (level == 2){
        return (arrAnswers.check == item.textContent[0] || arrAnswers.check == item.getAttribute("condition1") || arrAnswers.check == item.getAttribute("condition2"))&& randomColor == item.style.backgroundColor
    }
    return arrAnswers.check == item.textContent[0] || arrAnswers.check == item.getAttribute("condition1") || arrAnswers.check == item.getAttribute("condition2")
}
 
function setWords(words, conditionKey) {
    return words.map(item => {
        const wordDiv = document.createElement('div');
        wordDiv.className = 'word';
        wordDiv.textContent = item['word'];
        wordDiv.setAttribute('condition1', item['condition1'])
        wordDiv.setAttribute('condition2', item['condition2'])
        return wordDiv;
    });
    
}
 
 
function wrapWord(word) {
    return word;
}
function random(n) {
    return Math.floor(Math.random() * n);
}
 
 

 
 
 
function animateWords() {
    const words = document.querySelectorAll('.word');
    const items = document.querySelector('.items');
    
    words.forEach(word => {
        // Генерация случайных начальных координат
        let x = Math.random() * (items.clientWidth - word.clientWidth);
        let y = Math.random() * (items.clientHeight - word.clientHeight);

        // Генерация случайных скоростей
        let speedX = (Math.random() - 0.3) * 2; // от -1 до 1
        let speedY = (Math.random() - 0.3) * 2;

        if(level === 2) {speedX *= 2;  speedY *= 2;} // Увеличение скорости на 100%
        else if (level === 3) {// Увеличение скорости на 200%
            speedX *= 10;  
            speedY *= 10;
        }
        // Анимация перемещения
        function move() {
          
            // Обновление координат на основе вектора скорости
            x += speedX;
            y += speedY;

            // Проверка на выход за границы items
            
            if (x < 60 || x > items.clientWidth - word.clientWidth +30  ) {
                speedX *= -1; // Изменение направления по оси X
                if (  items.clientWidth - word.clientWidth == 40) {
                    speedX *= -1; // Изменение направления по оси X
                }
            }

            if (y < 60 || y > items.clientHeight - word.clientHeight+30  ) {
                speedY *= -1; // Изменение направления по оси Y
                if (  items.clientHeight - word.clientHeight == 10) {
                    speedY *= -1; // Изменение направления по оси X
                }
            }

            // Установка координат элемента
            word.style.left = `${x}px`;
            word.style.top = `${y}px`;

            requestAnimationFrame(move);
        }

        // Запуск анимации
        move();
    });
}




function addMoveHandler() {
    var words = document.querySelectorAll('.word');
  
    words.forEach(function(word, i) {
      word.onmousedown = function(e) { // 1. отследить нажатие
  
        var coords = getCoords(word);
        var shiftX = e.pageX - coords.left;
        var shiftY = e.pageY - coords.top;
        // подготовить к перемещению
        // 2. разместить на том же месте, но в абсолютных координатах
        word.style.position = 'absolute';
        document.body.appendChild(word);
        moveAt(e);
        // переместим в body, чтобы слово было точно не внутри position:relative
  
  
        word.style.zIndex = 1000; // показывать слово над другими элементами
  
        // передвинуть слово под координаты курсора
        // и сдвинуть на половину ширины/высоты для центрирования
        
        function moveAt(e) {
            
          word.style.left = e.pageX - shiftX + 'px';
          word.style.top = e.pageY - shiftY + 'px';
        }
  
        // 3, перемещать по экрану
        document.onmousemove = function(e) {
          moveAt(e);
        }
  
        // 4. отследить окончание переноса
        document.onmouseup = function() {
          document.onmousemove = null;
          document.onmouseup = null;
          e.target.click();
        }
        word.ondragstart = function() {
          return false;
        };
  
        function getCoords(elem) { // кроме IE8-
          var box = elem.getBoundingClientRect();
          return {
            top: box.top + pageYOffset,
            left: box.left + pageXOffset
          };
        }
      }
    });
  }
  
  

  
  
  
  
  
  


