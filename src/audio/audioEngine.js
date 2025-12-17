// src/audio/audioEngine.js
let ctx = null;
const buffers = {};
let unlocked = false;

export async function unlockAudio() {
  if (!ctx) {
    ctx = new (window.AudioContext || window.webkitAudioContext)();
  }

  if (ctx.state === "suspended") {
    await ctx.resume();
  }

  unlocked = true;
}

export async function loadSound(name, src) {
  if (!ctx || buffers[name]) return;

  const res = await fetch(src);
  const arrayBuffer = await res.arrayBuffer();
  buffers[name] = await ctx.decodeAudioData(arrayBuffer);
}

export function playSound(name) {
  if (!unlocked || !buffers[name]) return;

  const source = ctx.createBufferSource();
  source.buffer = buffers[name];
  source.connect(ctx.destination);
  source.start(0);
}
