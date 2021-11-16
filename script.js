let video = document.querySelector('video');
let picBtn = document.querySelector('.picCapture');
let recordBtn = document.querySelector('.videoRecord');
let isRecord = false;
let recorder;
let chuncks;
let filterColor = 'transparent'
let constraints = {
  video: true,
  audio: true,
};

navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
  video.srcObject = stream;
  recorder = new MediaRecorder(stream);
 recorder.addEventListener('start', (e) => {
  chuncks = [];
  
  });
  recorder.addEventListener('dataavailable', (e) => {
    chuncks.push(e.data);
  });

 recorder.addEventListener('stop', (e) => {
    let blob = new Blob(chuncks, { type: 'Video/mp4' });
    let videoURL = URL.createObjectURL(blob);
    let a = document.createElement('a');
    a.href = videoURL;
    a.download = 'stream.mp4';
    a.click();
  });
});

picBtn.addEventListener('click', (e) => {

  picBtn.classList.add('picCaptureAni');
  setTimeout(function () {
    picBtn.classList.remove('picCaptureAni');
  }, 1000);

  let canvas = document.createElement('canvas')
  canvas.height = video.videoHeight
  canvas.width = video.videoWidth

  let tool = canvas.getContext('2d')
  tool.drawImage(video, 0, 0, canvas.width, canvas.height)
  tool.fillStyle = filterColor;
  tool.fillRect(0,0,canvas.width,canvas.height)
  let imageURl = canvas.toDataURL();
   let a = document.createElement('a');
   a.href = imageURl;
   a.download = 'image.jpg';
   a.click();

});

recordBtn.addEventListener('click', (e) => {
  if (!recorder) return;
  isRecord ? (isRecord = false) : (isRecord = true);
  if (isRecord) {
    recordBtn.classList.add('videoRecordAni');
   recorder.start();
   startTimer();
  } else {
    recordBtn.classList.remove('videoRecordAni');
     recorder.stop();
    stopTimer();
  }
});


let count = 0;
let timer = document.querySelector('.timer');
let startTimerID;
function startTimer() {
 startTimerID = setInterval(() => {
  let hours = Number.parseInt(count / 3600);
  hours = (hours<10)?'0'+hours :hours
  let totalSeconds = count % 3600;
  let min = Number.parseInt(totalSeconds / 60);
  totalSeconds = totalSeconds % 60;
  let seconds = totalSeconds
   seconds = seconds < 10 ? '0' + seconds : seconds;
  timer.innerText = `${hours}:${min}:${seconds}`
  count++
 },1000)
}
function stopTimer() {
 clearInterval(startTimerID)
 timer.innerText = '00:00:00'
}

let filterBox = document.querySelectorAll('.filterBox');
let filterScreen = document.querySelector('.filterScreen');
filterBox.forEach((filterElement) => {
  filterElement.addEventListener('click', (e) => {
    filterColor = getComputedStyle(filterElement).getPropertyValue('background-color');
    filterScreen.style.backgoundColor = filterColor;
    filterScreen.style.backgroundColor =filterColor
  })
})