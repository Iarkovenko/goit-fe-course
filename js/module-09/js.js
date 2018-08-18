const watches = document.querySelector('.asd');

class Stopwatch {
  constructor({ watches }) {
    this.watches = watches;
    this.createTimer();
    this.watch = this.watches.querySelectorAll('.stopwatch');
    this.startTime = null;
    this.deltaTime = null;
    this.id = null;
    this.isActive = false;

  }
  createTimer() {
    const section = document.createElement('section')
    section.classList.add('watches')

    const div = document.createElement('div')
    div.classList.add('stopwatch')

    const p = document.createElement('p');
    p.classList.add('time')
    p.classList.add('js-time')
    p.textContent = '00:00.0'

    const startBtn = document.createElement('button');
    startBtn.classList.add('btn')
    startBtn.classList.add('js-start')
    startBtn.textContent = 'Start'
    startBtn.addEventListener('click', this.handleStartTimer.bind(this));

    const lapBtn = document.createElement('button');
    lapBtn.classList.add('btn')
    lapBtn.classList.add('js-take-lap')
    lapBtn.textContent = 'Lap'
    lapBtn.addEventListener('click', this.hadleLapTimer.bind(this));

    const resetBtn = document.createElement('button');
    resetBtn.classList.add('btn')
    resetBtn.classList.add('js-reset')
    resetBtn.textContent = 'Reset'
    resetBtn.addEventListener('click', this.hadleResetTimer.bind(this));
    


    div.append(p, startBtn, lapBtn, resetBtn)
    

    const list = document.createElement('ul');
    list.classList.add('laps')
    list.classList.add('js-laps')


    section.append(div, list)
    this.watches.append(section)

    
    
    // this.startBtn = this.watches.querySelector('.js-start');
    // this.lapBtn = this.watches.querySelector('.js-take-lap');
    // this.resetBtn = this.watches.querySelector('.js-reset');
    // this.timerContent = this.watches.querySelector('.js-time');
    // this.listLaps = this.watches.querySelector('.js-laps');
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
const SecondTimer = new Stopwatch({
  watches: watches,
});
