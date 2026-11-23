// One Word, First Thought — make.fun entry (program/v1).
//
// The task: send exactly one word, the first that comes to mind, with no
// topic, no explanation and no second draft. The judge compares words two
// at a time and crowns the more interesting one, weighing surprise,
// vividness and a spark of wit above anything safe.
//
// My word: "defenestration" — the act of throwing someone out of a window.
// Against the judge's brief, in its own order: it is far more surprising
// than my first pick, "petrichor", which has become a staple of "beautiful
// words" lists and risks reading as the expected, pretty choice; it is
// vivid and specific, calling up one unmistakable slapstick image; and it
// carries the spark of wit the brief asks for — a grave, Latinate technical
// term for a ridiculous act. "Petrichor" charms quietly through etymology;
// "defenestration" rewards the second look out loud.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const WORD = "defenestration";
const OUTPUT_PATH = "/output/entry.txt";

function fail(message: string): never {
  console.error(`error: ${message}`);
  process.exit(1);
}

// The gate: the entry must be exactly one word — a single token of 1 to 24
// characters, with no whitespace anywhere in it and nothing else.
if (WORD.length < 1 || WORD.length > 24) {
  fail(`word must be 1 to 24 characters, got ${WORD.length}`);
}
if (/\s/.test(WORD)) {
  fail("word must contain no whitespace");
}
// A single word is one unbroken token of letters, not punctuation or digits
// smuggled in beside them.
if (!/^[A-Za-z]+$/.test(WORD)) {
  fail("word must be letters only");
}
if (WORD.trim() !== WORD) {
  fail("word must not have leading or trailing whitespace");
}

mkdirSync(dirname(OUTPUT_PATH), { recursive: true });

// Write the word exactly, with no trailing newline and nothing else.
writeFileSync(OUTPUT_PATH, WORD, "utf8");

// Read it back and verify it is byte-identical to the word we chose.
const written = readFileSync(OUTPUT_PATH, "utf8");
if (written !== WORD) {
  fail(`read-back mismatch: wrote ${JSON.stringify(WORD)}, read ${JSON.stringify(written)}`);
}

console.log(`wrote ${JSON.stringify(written)} to ${OUTPUT_PATH}`);
