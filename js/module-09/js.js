/*
  - Если секундомер находится в состоянии паузы, текст на кнопке button.js-start
    меняется на 'Continue'. При следующем клике в нее, продолжается отсчет времени, 
    а текст меняется на 'Pause'. То есть если во время нажатия 'Pause' прошло 6 секунд 
    со старта, при нажатии 'Continue' 10 секунд спустя, секундомер продолжит отсчет времени 
    с 6 секунд, а не с 16. 
    
    🔔 Подсказка: сохраните время секундомера на момент паузы и используйте его 
                  при рассчете текущего времени после возобновления таймера отнимая
                  это значение от времени запуска таймера.
    
  - Если секундомер находится в активном состоянии или в состоянии паузы, кнопка 
    button.js-reset должна быть активна (на нее можно кликнуть), в противном случае
    disabled. Функционал при клике - остановка таймера и сброс всех полей в исходное состояние.
    
  - Функционал кнопки button.js-take-lap при клике - сохранение текущего времени секундомера 
    в массив и добавление в ul.js-laps нового li с сохраненным временем в формате xx:xx.x
*/

const clockface = document.querySelector('.js-time');
const startBtn = document.querySelector('.js-start');
const lapBtn = document.querySelector('.js-take-lap');
const resetBtn = document.querySelector('.js-reset');
const listLaps = document.querySelector('.js-laps');

class Timer {
  constructor({
    startBtn,
    lapBtn,
    resetBtn,
    clockface,
    listLaps
  }) {
    this.startBtn = startBtn;
    this.lapBtn = lapBtn;
    this.resetBtn = resetBtn;
    this.timerContent = clockface;
    this.listLaps = listLaps;
    this.timerContent.textContent = '00:00.0';
    this.startTime = null;
    this.deltaTime = null;
    this.id = null;
    this.isActive = false;
    this.pauseTime = null;
    this.onPaused = false;
    this.startBtn.addEventListener('click', this.handleStartTimer.bind(this));
    this.resetBtn.addEventListener('click', this.hadleResetTimer.bind(this));
    this.lapBtn.addEventListener('click', this.hadleLapTimer.bind(this));
  }

  handleStartTimer({target}) {
    if(!this.isActive && !this.onPaused) {
      this.setActiveBtn(target);
      target.textContent = 'Pause';
      this.startTick(target);
    } else {
      this.pauseTick(target);
      target.textContent = 'Continue'
      console.log('next')
      
    }   
        
  }
  startTick(target) {
    if (this.isActive) return;
    this.isActive = true;
    this.startTime = Date.now();
    console.log('start')
    this.id = setInterval(() => {
      const currentTime = Date.now();
      this.deltaTime = currentTime - this.startTime;      
      const time = new Date(this.deltaTime);
      this.updateClockface(this.timerContent, time);
    }, 100);
  }
  pauseTick(target) {
    this.isActive = false;
    this.onPaused = true;
    this.startTime = this.deltaTime;
    target.textContent = 'Pause'; 
    console.log('pause') 
    this.pauseTime = this.deltaTime;
    console.log(this.pauseTime)  
    clearInterval(this.id);
    target.addEventListener('click', ()=> {
      console.log('go next')
    })
  }

  hadleResetTimer({target}) {
    this.isActive = false;
    this.onPaused = false;  
    this.setActiveBtn(target);
    this.startBtn.textContent = 'Start';
    console.log('reset')
    this.timerContent.textContent = '00:00.0';
    clearInterval(this.id);
    this.listLaps.innerHTML = null;
    this.startTime = 0;
    this.deltaTime = 0;
  }

  hadleLapTimer() {
    if (!this.isActive) return;
    const item = document.createElement('li');
    item.textContent = this.timerContent.textContent;
    this.listLaps.append(item);
  }

  updateClockface(elem, time) {
    let min = time.getMinutes();
    let sec = time.getSeconds();
    let ms = parseInt(time.getMilliseconds() / 100);
    if (min < 10) {
      min = `0${min}`;
    }
    if (sec < 10) {
      sec = `0${sec}`;
    }
    elem.textContent = `${min}:${sec}.${ms}`;
    return elem.textContent;
  }
  
  setActiveBtn(target) {
    if (target.classList.contains('active')) {
      return;
    }
    this.startBtn.classList.remove('active');
    this.resetBtn.classList.remove('active');

    target.classList.add('active');
  }
}

const firstTimer = new Timer({
  startBtn: startBtn,
  lapBtn: lapBtn,
  resetBtn: resetBtn,
  clockface: clockface,
  listLaps: listLaps,
});