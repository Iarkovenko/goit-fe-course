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

// 

const watches = document.querySelector('.watches');

class Stopwatch {
  constructor({ watches }) {    
    this.watches = watches;
    this.createTimer()
    this.startBtn = this.watches.querySelector('.js-start');
    this.lapBtn = this.watches.querySelector('.js-take-lap');
    this.resetBtn = this.watches.querySelector('.js-reset');
    this.timerContent = this.watches.querySelector('.js-time');
    this.listLaps = this.watches.querySelector('.js-laps');
    this.startTime = null;
    this.deltaTime = null;
    this.id = null;
    this.isActive = false;
    this.startBtn.addEventListener('click', this.handleStartTimer.bind(this));
    this.resetBtn.addEventListener('click', this.hadleResetTimer.bind(this));
    this.lapBtn.addEventListener('click', this.hadleLapTimer.bind(this));
  }
  createTimer() {
    const bodyWatch = `<div class="stopwatch">
                      <p class="time js-time">00:00.0</p>
                      <button class="btn js-start">Start</button>
                      <button class="btn js-take-lap">Lap</button>
                      <button class="btn js-reset">Reset</button>
                      </div>
                      <ul class="laps js-laps"></ul>`;
    this.watches.innerHTML += bodyWatch;
  }
  handleStartTimer({ target }) {
    if (!this.isActive) {
      this.setActiveBtn(target);
      this.startTick(target);
      this.startBtn.textContent = 'Pause';
    } else {
      this.pauseTick(target);
      this.startBtn.textContent = 'Continue';
    }
  }
  startTick(target) {
    if (this.isActive) return;
    this.isActive = true;
    this.startTime = Date.now() - this.deltaTime;
    this.id = setInterval(() => {
      const currentTime = Date.now();
      this.deltaTime = currentTime - this.startTime;
      this.updateClockface(this.deltaTime);
    }, 100);
  }
  pauseTick(target) {
    clearInterval(this.id);
    this.isActive = false;
  }

  hadleResetTimer({ target }) {
    clearInterval(this.id);
    this.isActive = false;
    this.setActiveBtn(target);
    this.deltaTime = 0;
    this.updateClockface(this.deltaTime);
    this.startBtn.textContent = 'Start';
    this.listLaps.innerHTML = null;
    this.startTime = null;
  }

  hadleLapTimer(time) {
    if (!this.isActive) return;
    const item = document.createElement('li');
    item.textContent = this.timerContent.textContent;
    this.listLaps.append(item);
  }
  updateClockface(time) {
    const formattedTime = this.getFormatedTime(time);
    this.timerContent.textContent = formattedTime;
  }
  getFormatedTime(mls) {
    const date = new Date(mls);
    let min = date.getMinutes();
    let sec = date.getSeconds();
    let ms = parseInt(date.getMilliseconds() / 100);
    if (min < 10) {
      min = `0${min}`;
    }
    if (sec < 10) {
      sec = `0${sec}`;
    }
    return `${min}:${sec}.${ms}`;
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

const firstTimer = new Stopwatch({
  watches: watches,
});
