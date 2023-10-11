# Obscuro Number Guessing Game dApp

![Obscuro Logo](link-to-your-logo.png)

## Overview

This project showcases an exciting Number Guessing Game built on the Obscuro blockchain network. Obscuro's privacy-focused features empower this game by protecting sensitive information, such as the secret number and user guesses, from public visibility. In a transparent, decentralized ecosystem like Ethereum, such privacy is impossible to achieve.

This README will guide you through the setup, gameplay, and key features of the Obscuro Number Guessing Game dApp. Let's get started!

## Game Description

The Obscuro Number Guessing Game is a simple yet effective way to illustrate the power of privacy in blockchain technology. Here's how the game works:

1. **Objective**: The goal of the game is to correctly guess a secret number.
2. **Entrance Fee**: Each time a player makes a guess, they must pay an entrance fee of 1 unit of the game's token. (Note: 1 unit = 1 x 10^18 tokens)
3. **Winning Prize**: If a player correctly guesses the secret number, the contract will pay out all the accumulated entrance fees to them.
4. **Reset Mechanism**: After a successful guess, the game resets with a new random secret number, providing endless opportunities for players to win.

### Privacy Challenges

In a typical, transparent, and decentralized blockchain ecosystem, creating and maintaining a secret number while keeping it hidden is nearly impossible. Even if you were to hide the secret number within the internal state of the contract, a motivated individual could easily inspect the contract's internal state and reveal the secret number. Moreover, when players make their guesses, their transactions are easily visible on the blockchain, creating an unfair advantage for new players.

### How Obscuro Solves Privacy Challenges

Building the Obscuro Number Guessing Game tackles both of the scenarios mentioned above with the help of Obscuro's unique features:

1. **Secure Secret Number Generation**: The game contract generates a random secret number within a Trusted Execution Environment (TEE). This number is never revealed to anyone, including players and node operators.
2. **Encrypted Transactions**: When players make their guesses, their transactions are encrypted, making them completely obscured in a block explorer. This privacy ensures that no player can gain an unfair advantage by inspecting transactions.

## Getting Started

### Prerequisites

- Git
- Node.js (v14 or higher)
- Metamask or an Ethereum wallet
- Hardhat (installed locally or globally)

### Installation

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/your-repo.git
   cd your-repo
   ```

2. Install project dependencies:

   ```bash
   npm install
   ```

3. Set up a local Ethereum development network (Hardhat):

   ```bash
   npx hardhat node
   ```

4. Deploy the game contract to your local network:

   ```bash
   npx hardhat run scripts/deploy.js --network localhost
   ```

5. Start the React dApp:

   ```bash
   npm start
   ```

### Gameplay

1. Connect your Metamask wallet to the application and import the accounts you intend to use.
2. Make sure you have enough tokens in your wallet for the entrance fee.
3. Open the game interface in your browser.
4. Click "Play Game" to start the game.

### Rules

- To make a guess, enter your chosen number and click the "Guess" button.
- If you guess the secret number correctly, you will receive the accumulated entrance fees as a reward.
- The game will then reset with a new secret number, and you can continue playing.

## Key Features

- **Privacy-First**: Enjoy a fully private gaming experience where neither the secret number nor player guesses are revealed.
- **Fair Competition**: Eliminate the possibility of new players gaining an unfair advantage through blockchain analysis.
- **Secure Random Number Generation**: The game's secret numbers are generated within a Trusted Execution Environment for maximum security.
- **User-Friendly Interface**: The dApp features an intuitive and easy-to-use interface.
- **Rewarding Gameplay**: Win entrance fees as rewards for guessing the secret number correctly.
- **Endless Entertainment**: The game continuously resets with new secret numbers, providing endless opportunities for players.

## Learn More About Obscuro

- [Official Website](https://obscu.ro)
- [Documentation](https://docs.obscu.ro)

## Disclaimer

This example showcases the basic functionality of Obscuro and may not cover all aspects of a production-ready application. The provided code and documentation should be used as a reference and starting point for your own development efforts.

**Happy Gaming with Obscuro!** 🎉

![Obscuro Logo](link-to-your-logo.png)