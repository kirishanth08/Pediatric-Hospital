const fs = require('fs');
const path = require('path');

// Ensure output directory exists
const audioDir = path.join(__dirname, 'assets', 'audio');
if (!fs.existsSync(audioDir)) {
  fs.mkdirSync(audioDir, { recursive: true });
}

const sampleRate = 44100;
const duration = 10.0; // 10 seconds to cover walking video
const numSamples = Math.floor(sampleRate * duration);
const numChannels = 2;

// Buffer for 16-bit PCM (2 bytes per channel * 2 channels = 4 bytes per sample)
const byteLength = numSamples * numChannels * 2;
const pcmBuffer = Buffer.alloc(byteLength);

// Musical notes frequencies (Hz)
const notes = {
  C3: 130.81, D3: 146.83, E3: 164.81, F3: 174.61, G3: 196.00, A3: 220.00, B3: 246.94,
  C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.00, A4: 440.00, B4: 493.88,
  C5: 523.25, D5: 587.33, E5: 659.25, G5: 783.99, A5: 880.00, C6: 1046.50
};

// Acoustic guitar / warm plucked string note event generator
class PluckNote {
  constructor(freq, startTime, duration, velocity = 0.5, pan = 0.5) {
    this.freq = freq;
    this.startTime = startTime;
    this.duration = duration;
    this.velocity = velocity;
    this.pan = pan; // 0 = left, 1 = right
  }

  sampleAt(t) {
    const elapsed = t - this.startTime;
    if (elapsed < 0 || elapsed > this.duration) return [0, 0];

    // Warm plucked acoustic string with harmonics
    const decay = Math.exp(-elapsed * 3.5);
    const fundamental = Math.sin(2 * Math.PI * this.freq * elapsed);
    const h2 = 0.5 * Math.sin(4 * Math.PI * this.freq * elapsed) * Math.exp(-elapsed * 4.5);
    const h3 = 0.25 * Math.sin(6 * Math.PI * this.freq * elapsed) * Math.exp(-elapsed * 6.0);
    const h4 = 0.12 * Math.sin(8 * Math.PI * this.freq * elapsed) * Math.exp(-elapsed * 8.0);

    const wave = (fundamental + h2 + h3 + h4) * decay * this.velocity;
    const left = wave * (1 - this.pan * 0.5);
    const right = wave * (0.5 + this.pan * 0.5);
    return [left, right];
  }
}

// Gentle music box chime
class ChimeNote {
  constructor(freq, startTime, duration, velocity = 0.3, pan = 0.5) {
    this.freq = freq;
    this.startTime = startTime;
    this.duration = duration;
    this.velocity = velocity;
    this.pan = pan;
  }

  sampleAt(t) {
    const elapsed = t - this.startTime;
    if (elapsed < 0 || elapsed > this.duration) return [0, 0];

    const decay = Math.exp(-elapsed * 2.2);
    const bell = (Math.sin(2 * Math.PI * this.freq * elapsed) +
                  0.3 * Math.sin(2 * Math.PI * this.freq * 2.756 * elapsed) * Math.exp(-elapsed * 3.5) +
                  0.15 * Math.sin(2 * Math.PI * this.freq * 5.404 * elapsed) * Math.exp(-elapsed * 5.0)) * decay * this.velocity;

    return [bell * (1 - this.pan * 0.5), bell * (0.5 + this.pan * 0.5)];
  }
}

// Bird chirp generator for sunny hospital garden atmosphere
class BirdChirp {
  constructor(startTime, baseFreq = 2800) {
    this.startTime = startTime;
    this.baseFreq = baseFreq;
    this.duration = 0.28;
  }

  sampleAt(t) {
    const elapsed = t - this.startTime;
    if (elapsed < 0 || elapsed > this.duration) return [0, 0];

    const freq = this.baseFreq + 1200 * Math.sin(Math.PI * elapsed / this.duration);
    const env = Math.sin(Math.PI * elapsed / this.duration) * 0.08;
    const s = Math.sin(2 * Math.PI * freq * elapsed) * env;
    return [s * 0.8, s * 0.4];
  }
}

const events = [];

// Cheerful chord progression in C Major:
// Bar 1 (0 - 2.5s): Cmaj9 (C3, G3, E4, B4, D5)
// Bar 2 (2.5 - 5.0s): G (G3, D4, G4, B4, D5)
// Bar 3 (5.0 - 7.5s): Am7 (A3, E4, G4, C5, E5)
// Bar 4 (7.5 - 10.0s): Fadd9 (F3, C4, G4, A4, C5)

function addArpeggio(root, third, fifth, seventh, top, startT, pan) {
  events.push(new PluckNote(root, startT + 0.00, 2.2, 0.45, pan));
  events.push(new PluckNote(fifth, startT + 0.28, 2.0, 0.35, pan + 0.1));
  events.push(new PluckNote(third, startT + 0.56, 1.8, 0.35, pan - 0.1));
  events.push(new PluckNote(seventh, startT + 0.84, 1.6, 0.32, pan + 0.2));
  events.push(new PluckNote(top, startT + 1.12, 1.8, 0.38, pan));
  events.push(new PluckNote(seventh, startT + 1.40, 1.4, 0.30, pan - 0.1));
  events.push(new PluckNote(third, startT + 1.68, 1.4, 0.32, pan + 0.1));
  events.push(new PluckNote(fifth, startT + 1.96, 1.4, 0.30, pan));
}

// Bar 1: Cmaj
addArpeggio(notes.C3, notes.E4, notes.G3, notes.B4, notes.D5, 0.0, 0.35);
events.push(new ChimeNote(notes.G5, 0.28, 2.0, 0.22, 0.7));
events.push(new ChimeNote(notes.E5, 1.12, 2.0, 0.25, 0.3));

// Bar 2: G major
addArpeggio(notes.G3, notes.B3 || 246.94, notes.D4, notes.G4, notes.B4, 2.4, 0.45);
events.push(new ChimeNote(notes.D5, 2.68, 2.0, 0.22, 0.4));
events.push(new ChimeNote(notes.G5, 3.52, 2.0, 0.26, 0.65));

// Bar 3: Am7
addArpeggio(notes.A3, notes.C4, notes.E4, notes.G4, notes.C5, 4.8, 0.35);
events.push(new ChimeNote(notes.A5, 5.08, 2.0, 0.25, 0.3));
events.push(new ChimeNote(notes.E5, 5.92, 2.0, 0.25, 0.7));

// Bar 4: Fadd9 & resolving chord
addArpeggio(notes.F3, notes.A3, notes.C4, notes.G4, notes.C5, 7.2, 0.45);
events.push(new ChimeNote(notes.G5, 7.48, 2.0, 0.24, 0.4));
events.push(new ChimeNote(notes.C6, 8.32, 2.2, 0.28, 0.5));
events.push(new PluckNote(notes.C4, 8.6, 2.0, 0.4, 0.5));
events.push(new PluckNote(notes.G4, 8.6, 2.0, 0.35, 0.6));
events.push(new PluckNote(notes.C5, 8.6, 2.0, 0.35, 0.4));

// Ambient garden bird chirps
events.push(new BirdChirp(0.6, 3100));
events.push(new BirdChirp(0.9, 3400));
events.push(new BirdChirp(3.8, 2900));
events.push(new BirdChirp(4.1, 3200));
events.push(new BirdChirp(7.1, 3000));
events.push(new BirdChirp(7.4, 3350));

console.log(`Synthesizing ${duration}s audio (${numSamples} samples)...`);

let offset = 0;
for (let i = 0; i < numSamples; i++) {
  const t = i / sampleRate;

  // Fade in first 0.3s and fade out last 0.5s for seamless loop
  let masterEnv = 1.0;
  if (t < 0.3) masterEnv = t / 0.3;
  else if (t > duration - 0.5) masterEnv = (duration - t) / 0.5;

  let leftSum = 0;
  let rightSum = 0;

  for (let j = 0; j < events.length; j++) {
    const [l, r] = events[j].sampleAt(t);
    leftSum += l;
    rightSum += r;
  }

  // Gentle soft warmth saturation
  const outL = Math.tanh(leftSum * 1.2) * masterEnv * 0.75;
  const outR = Math.tanh(rightSum * 1.2) * masterEnv * 0.75;

  // Convert to 16-bit integer
  const intL = Math.max(-32768, Math.min(32767, Math.floor(outL * 32767)));
  const intR = Math.max(-32768, Math.min(32767, Math.floor(outR * 32767)));

  pcmBuffer.writeInt16LE(intL, offset);
  pcmBuffer.writeInt16LE(intR, offset + 2);
  offset += 4;
}

// Build WAV header (44 bytes RIFF)
const wavHeader = Buffer.alloc(44);
const dataSize = pcmBuffer.length;
const fileSize = 36 + dataSize;

wavHeader.write('RIFF', 0);
wavHeader.writeUInt32LE(fileSize, 4);
wavHeader.write('WAVE', 8);
wavHeader.write('fmt ', 12);
wavHeader.writeUInt32LE(16, 16); // Subchunk1Size (16 for PCM)
wavHeader.writeUInt16LE(1, 20);  // AudioFormat (1 = PCM)
wavHeader.writeUInt16LE(numChannels, 22);
wavHeader.writeUInt32LE(sampleRate, 24);
wavHeader.writeUInt32LE(sampleRate * numChannels * 2, 28); // ByteRate
wavHeader.writeUInt16LE(numChannels * 2, 32);              // BlockAlign
wavHeader.writeUInt16LE(16, 34);                          // BitsPerSample
wavHeader.write('data', 36);
wavHeader.writeUInt32LE(dataSize, 40);

const fullWav = Buffer.concat([wavHeader, pcmBuffer]);
const outPath = path.join(audioDir, 'walking_joy.wav');
fs.writeFileSync(outPath, fullWav);
console.log(`Saved audio WAV to ${outPath} (${fullWav.length} bytes)`);
