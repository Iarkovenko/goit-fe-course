const watches = document.querySelector('.asd');

class Stopwatch {
  constructor( watches ) {
    this.watches = watches;
    this.startTime = null;
    this.deltaTime = null;
    this.id = null;
    this.isActive = false;
    this.startBtn = '';
    this.resetBtn = '';
    this.listLaps = '';
    this.createTimer();

  }

  createTimer() {
    const section = document.createElement('section');
    section.classList.add('watches');

    const div = document.createElement('div');
    div.classList.add('stopwatch');

    const p = document.createElement('p');
    p.classList.add('time');
    p.classList.add('js-time');
    p.textContent = '00:00.0';

    this.startBtn = document.createElement('button');
    this.startBtn.classList.add('btn');
    this.startBtn.classList.add('js-start');
    this.startBtn.textContent = 'Start';
    this.startBtn.addEventListener('click', this.handleStartTimer.bind(this));

    this.lapBtn = document.createElement('button');
    this.lapBtn.classList.add('btn');
    this.lapBtn.classList.add('js-take-lap');
    this.lapBtn.textContent = 'Lap';
    this.lapBtn.addEventListener('click', this.hadleLapTimer.bind(this));

    this.resetBtn = document.createElement('button');
    this.resetBtn.classList.add('btn');
    this.resetBtn.classList.add('js-reset');
    this.resetBtn.textContent = 'Reset';
    this.resetBtn.addEventListener('click', this.hadleResetTimer.bind(this));

    div.append(p, this.startBtn, this.lapBtn, this.resetBtn);

    this.listLaps = document.createElement('ul');
    this.listLaps.classList.add('laps');
    this.listLaps.classList.add('js-laps');

    section.append(div, this.listLaps);

    this.startBtn = section.querySelector('.js-start');
    this.lapBtn = section.querySelector('.js-take-lap');
    this.resetBtn = section.querySelector('.js-reset');
    this.timerContent = section.querySelector('.js-time');
    this.listLaps = section.querySelector('.js-laps');
    this.watches.append(section);    
  }

  handleStartTimer({ target }) {
    if (!this.isActive) {
      this.setActiveBtn(target);
      this.startTick();
      this.startBtn.textContent = 'Pause';
    } else {
      this.pauseTick();
      this.startBtn.textContent = 'Continue';
    }
  }
  startTick() {
    if (this.isActive) return;
    this.isActive = true;
    this.startTime = Date.now() - this.deltaTime;
    this.id = setInterval(() => {
      const currentTime = Date.now();
      this.deltaTime = currentTime - this.startTime;
      this.updateClockface(this.deltaTime);
    }, 100);
  }
  pauseTick() {
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
    this.startTime = null;
    this.listLaps.innerHTML = null;
  }

  hadleLapTimer() {
    if (!this.isActive) return;
    this.item = document.createElement('li');
    this.item.textContent = this.timerContent.textContent;    
    this.listLaps.append(this.item);
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
const firstTimer = new Stopwatch(watches);
const SecondTimer = new Stopwatch(watches);