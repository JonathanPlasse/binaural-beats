let ctx;
let panNodes;
let oscillators;
let gainNode;

const baseFrequencyInput = document.querySelector("#base-frequency");
const beatInput = document.querySelector("#beat");
const volumeInput = document.querySelector("#volume");
const playButton = document.querySelector("#play");
const stopButton = document.querySelector("#stop");

function init() {
  if (ctx) {
    return;
  }

  ctx = new AudioContext();
  gainNode = ctx.createGain();
  gainNode.gain.value = Number(volumeInput.value);
  gainNode.connect(ctx.destination);

  panNodes = [ctx.createStereoPanner(), ctx.createStereoPanner()];
  panNodes[0].pan.value = -1;
  panNodes[1].pan.value = 1;
  panNodes[0].connect(gainNode);
  panNodes[1].connect(gainNode);

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

  oscillators[0].frequency.value = f - b;
  oscillators[1].frequency.value = f + b;
});

stopButton.addEventListener("click", () => {
  oscillators[0].stop();
  oscillators[1].stop();
  oscillators = undefined;
  gainNode = undefined;
  panNodes = undefined;
  ctx = undefined;
});

volumeInput.addEventListener("input", () => {
  if (gainNode) {
    gainNode.gain.value = Number(volumeInput.value);
  }
});
