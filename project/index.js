document.addEventListener('DOMContentLoaded', function() {
    const loginPage = document.getElementById('loginPage');
    const signupPage = document.getElementById('signupPage');
    const gamesPage = document.getElementById('gamesPage');
    const ticTacToePage = document.getElementById('ticTacToePage');
    const rpsPage = document.getElementById('rpsPage');
    
    document.getElementById('signupLink').addEventListener('click', function() {
        loginPage.classList.add('hide');
        signupPage.classList.remove('hide');
    });
    
    document.getElementById('loginLink').addEventListener('click', function() {
        signupPage.classList.add('hide');
        loginPage.classList.remove('hide');
    });
    document.getElementById('signupButton').addEventListener('click', function() {
        const username = document.getElementById('newUsername').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        if (username && email && password && password === confirmPassword) {
            signupPage.classList.add('hide');
            loginPage.classList.remove('hide');
            alert('Compte créé avec succès! Vous pouvez maintenant vous connecter.');
        } else if (password !== confirmPassword) {
            alert('Les mots de passe ne correspondent pas');
        } else {
            alert('Veuillez remplir tous les champs');
        }
    });
    document.getElementById('loginButton').addEventListener('click', function() {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        if (username && password) {
            loginPage.classList.add('hide');
            gamesPage.classList.remove('hide');
        } else {
            alert('Veuillez remplir tous les champs');
        }
    });
    
    document.getElementById('ticTacToeCard').addEventListener('click', function() {
        gamesPage.classList.add('hide');
        ticTacToePage.classList.remove('hide');
        initTicTacToe();
    });
    
    document.getElementById('rpsCard').addEventListener('click', function() {
        gamesPage.classList.add('hide');
        rpsPage.classList.remove('hide');
    });
    
    document.getElementById('ticTacToeBack').addEventListener('click', function() {
        ticTacToePage.classList.add('hide');
        gamesPage.classList.remove('hide');
    });

    document.getElementById('rpsBack').addEventListener('click', function() {
        rpsPage.classList.add('hide');
        gamesPage.classList.remove('hide');
    });

    function initTicTacToe() {
        const cells = document.querySelectorAll('.tictactoe-cell');
        const resultDisplay = document.getElementById('ticTacToeResult');
        let currentPlayer = 'X';
        let gameBoard = ['', '', '', '', '', '', '', '', ''];
        let gameActive = true;
        cells.forEach(cell => {
            cell.textContent = '';
            cell.addEventListener('click', function() {
                const index = this.getAttribute('data-index');
                
                if (gameBoard[index] === '' && gameActive) {
                    gameBoard[index] = currentPlayer;
                    this.textContent = currentPlayer;
                    this.style.color = currentPlayer === 'X' ? '#3a1c71' : '#d76d77';
                    
                    if (checkWin()) {
                        resultDisplay.textContent = `Joueur ${currentPlayer} a gagné!`;
                        gameActive = false;
                    } else if (gameBoard.every(cell => cell !== '')) {
                        resultDisplay.textContent = 'Match nul!';
                        gameActive = false;
                    } else {
                        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                    }
                }
            });
        });
        
        function checkWin() {
            const winConditions = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8],
                [0, 3, 6], [1, 4, 7], [2, 5, 8],
                [0, 4, 8], [2, 4, 6]
            ];
            
            return winConditions.some(condition => {
                const [a, b, c] = condition;
                return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
            });
        }
    }
    
    document.querySelectorAll('.rps-option').forEach(option => {
        option.addEventListener('click', function() {
            const playerChoice = this.id;
            const choices = ['rock', 'paper', 'scissors'];
            const computerChoice = choices[Math.floor(Math.random() * 3)];
            
            const resultDisplay = document.getElementById('rpsResult');
            const scoreDisplay = document.getElementById('rpsScore');
            
            const scoreText = scoreDisplay.textContent;
            const scores = scoreText.match(/\d+/g).map(Number);
            let playerScore = scores[0];
            let computerScore = scores[1];
            
            let resultText = '';
            
            if (playerChoice === computerChoice) {
                resultText = 'Égalité!';
            } else if (
                (playerChoice === 'rock' && computerChoice === 'scissors') ||
                (playerChoice === 'paper' && computerChoice === 'rock') ||
                (playerChoice === 'scissors' && computerChoice === 'paper')
            ) {
                resultText = 'Vous gagnez!';
                playerScore++;
            } else {
                resultText = 'L\'ordinateur gagne!';
                computerScore++;
            }
            
            resultDisplay.textContent = `Vous: ${getEmoji(playerChoice)} vs Ordinateur: ${getEmoji(computerChoice)} - ${resultText}`;
            scoreDisplay.textContent = `Vous: ${playerScore} | Ordinateur: ${computerScore}`;
        });
    });
    
    function getEmoji(choice) {
        switch (choice) {
            case 'rock': return '👊';
            case 'paper': return '✋';
            case 'scissors': return '✌️';
            default: return '';
        }
    }
});