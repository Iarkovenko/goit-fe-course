const watches = document.querySelector('.asd');

class Stopwatch {
  constructor({ watches }) {
    this.watches = watches;
    this.createTimer();
    this.watch = this.watches.querySelectorAll('.watches');
    this.startBtn = null;
    this.lapBtn = null;
    this.resetBtn = null;
    this.startTime = null;
    this.deltaTime = null;
    this.id = null;
    this.isActive = false;    
    this.listLaps = null;
    this.setWatch(this.watch);
    
    this.startBtn.addEventListener('click', this.handleStartTimer.bind(this));
    this.resetBtn.addEventListener('click', this.hadleResetTimer.bind(this));
    this.lapBtn.addEventListener('click', this.hadleLapTimer.bind(this));
  }
  createTimer() {
    const bodyWatch = `<section class="watches">
                      <div class="stopwatch">
                      <p class="time js-time">00:00.0</p>
                      <button class="btn js-start">Start</button>
                      <button class="btn js-take-lap">Lap</button>
                      <button class="btn js-reset">Reset</button>
                      </div>
                      <ul class="laps js-laps"></ul>
                      </section>`;
    this.watches.innerHTML += bodyWatch;
  }
  setWatch(arr) {
    arr.forEach(el => {
      this.startBtn = el.querySelector('.js-start');
      this.lapBtn = el.querySelector('.js-take-lap');
      this.resetBtn = el.querySelector('.js-reset');
      this.timerContent = el.querySelector('.js-time');
      this.listLaps = el.querySelector('.js-laps');
      console.log(this.startBtn);
    });
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

const secondTimer = new Stopwatch({
  watches: watches,
});