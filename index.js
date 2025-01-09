#!/usr/bin/env node

import chalk from 'chalk';
import readline from 'readline';

// Define constants for confetti effect with emojis
const confettiEmojis = ['🎉', '🎊', '🥳', '🎆', '✨', '💥'];
const colors = [
  chalk.red,
  chalk.green,
  chalk.blue,
  chalk.yellow,
  chalk.magenta,
  chalk.cyan,
];
const terminalWidth = process.stdout.columns; // Get the terminal width
const terminalHeight = process.stdout.rows; // Get the terminal height

// Function to generate a random integer between min and max
const getRandomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

// Confetti Effect - this function will simulate the confetti falling
const startConfetti = () => {
  const confettiInterval = setInterval(() => {
    // Generate random emoji and color
    const emoji = confettiEmojis[getRandomInt(0, confettiEmojis.length - 1)];
    const color = colors[getRandomInt(0, colors.length - 1)];

    // Generate random position in the terminal (y and x)
    const xPos = getRandomInt(0, terminalWidth - 1);
    const yPos = getRandomInt(0, terminalHeight - 1);

    // Clear the current line
    readline.cursorTo(process.stdout, xPos, yPos);

    // Print the emoji in a random color
    process.stdout.write(color(emoji));
  }, 100); // Update every 100ms to create the animation effect

  // Stop the animation after 5 seconds
  setTimeout(() => {
    clearInterval(confettiInterval);
    // process.stdout.write('\n'); // Print a newline after stopping the confetti
  }, 5000);
};

// Display Happy New Year message in the center
const displayHappyNewYearMessage = () => {
  const currentYear = new Date().getFullYear();
  const message = `🎉 Happy New Year ${currentYear}! 🎉`;

  // Calculate the position to center the message
  const xPos = Math.floor((terminalWidth - message.length) / 2);

  // Move cursor to the center and display the message
  readline.cursorTo(process.stdout, xPos, Math.floor(terminalHeight / 2));
  console.log(chalk.bold.white.bgGreen(message));

  // Start confetti animation
  startConfetti();
};

// Check if today is January 1st
const isNewYear = () => {
  const today = new Date();
  return (
    today.getMonth() === 0 && today.getDate() >= 1 && today.getDate() <= 15
  );
};

const main = () => {
  if (isNewYear()) {
    displayHappyNewYearMessage();
  } else {
    console.log(
      chalk.bold.white.bgBlue('Welcome to Happy New Year Firecracker CLI! ')
    );
  }
};

// Run the function
main();
