let ctx;
let panNodes;
let oscillators;

const baseFrequencyInput = document.querySelector("#base-frequency");
const beatInput = document.querySelector("#beat");
const playButton = document.querySelector("#play");
const stopButton = document.querySelector("#stop");

function init() {
  if (ctx) {
    return;
  }

  ctx = new AudioContext();
  panNodes = [ctx.createStereoPanner(), ctx.createStereoPanner()];
  panNodes[0].pan.value = -1;
  panNodes[1].pan.value = 1;
  panNodes[0].connect(ctx.destination);
  panNodes[1].connect(ctx.destination);

  oscillators = [ctx.createOscillator(), ctx.createOscillator()];
  oscillators[0].type = "sine";
  oscillators[1].type = "sine";
  oscillators[0].start();
  oscillators[1].start();
  oscillators[0].connect(panNodes[0]);
  oscillators[1].connect(panNodes[1]);
}

playButton.addEventListener("click", () => {
  init();

  let b = Number(beatInput.value);
  let f = Number(baseFrequencyInput.value);

  oscillators[0].frequency.value = f;
  oscillators[1].frequency.value = f + b;
});

stopButton.addEventListener("click", () => {
  oscillators[0].stop();
  oscillators[1].stop();
  oscillators = undefined;
  panNodes = undefined;
  ctx = undefined;
});
