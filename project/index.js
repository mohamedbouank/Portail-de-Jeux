document.addEventListener('DOMContentLoaded', function() {
    const loginPage = document.getElementById('loginPage');
    const signupPage = document.getElementById('signupPage');
    const gamesPage = document.getElementById('gamesPage');
    const ticTacToePage = document.getElementById('ticTacToePage');
    const snakePage = document.getElementById('snakePage');
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
    
    document.getElementById('snakeCard').addEventListener('click', function() {
        gamesPage.classList.add('hide');
        snakePage.classList.remove('hide');
        initSnake();
    });
    
    document.getElementById('rpsCard').addEventListener('click', function() {
        gamesPage.classList.add('hide');
        rpsPage.classList.remove('hide');
    });
    
    document.getElementById('ticTacToeBack').addEventListener('click', function() {
        ticTacToePage.classList.add('hide');
        gamesPage.classList.remove('hide');
    });
    
    document.getElementById('snakeBack').addEventListener('click', function() {
        snakePage.classList.add('hide');
        gamesPage.classList.remove('hide');
        stopSnake();
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
    
    let snakeInterval;
    
    function initSnake() {
        const canvas = document.getElementById('snake-canvas');
        const ctx = canvas.getContext('2d');
        const startButton = document.getElementById('snakeStart');
        const scoreDisplay = document.getElementById('snakeScore');
        
        let snake = [{x: 10, y: 10}];
        let food = {x: 15, y: 15};
        let direction = 'right';
        let score = 0;
        let gameRunning = false;
        
        function drawSnake() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#d76d77';
            ctx.beginPath();
            ctx.arc(food.x * 10 + 5, food.y * 10 + 5, 5, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.fillStyle = '#3a1c71';
            snake.forEach(segment => {
                ctx.fillRect(segment.x * 10, segment.y * 10, 10, 10);
            });
        }
        
        function updateSnake() {
            const head = {...snake[0]};
            
            switch (direction) {
                case 'up': head.y--; break;
                case 'down': head.y++; break;
                case 'left': head.x--; break;
                case 'right': head.x++; break;
            }
            
            if (head.x < 0 || head.x >= 30 || head.y < 0 || head.y >= 30) {
                gameOver();
                return;
            }
            
            if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
                gameOver();
                return;
            }
            
            snake.unshift(head);
            
            if (head.x === food.x && head.y === food.y) {
                score++;
                scoreDisplay.textContent = score;
                
                food = {
                    x: Math.floor(Math.random() * 30),
                    y: Math.floor(Math.random() * 30)
                };
            } else {
                snake.pop();
            }
            
            drawSnake();
        }
        
        function gameOver() {
            clearInterval(snakeInterval);
            gameRunning = false;
            alert(`Game Over! Score: ${score}`);
            startButton.textContent = 'Recommencer';
        }
        
        function startGame() {
            if (gameRunning) return;
            
            snake = [{x: 10, y: 10}];
            food = {x: 15, y: 15};
            direction = 'right';
            score = 0;
            scoreDisplay.textContent = score;
            gameRunning = true;
            
            clearInterval(snakeInterval);
            snakeInterval = setInterval(updateSnake, 100);
            drawSnake();
        }
        
        startButton.addEventListener('click', startGame);
        
        document.addEventListener('keydown', function(event) {
            if (!gameRunning) return;
            
            switch (event.key) {
                case 'ArrowUp':
                    if (direction !== 'down') direction = 'up';
                    break;
                case 'ArrowDown':
                    if (direction !== 'up') direction = 'down';
                    break;
                case 'ArrowLeft':
                    if (direction !== 'right') direction = 'left';
                    break;
                case 'ArrowRight':
                    if (direction !== 'left') direction = 'right';
                    break;
            }
        });
        
        drawSnake();
    }
    
    function stopSnake() {
        clearInterval(snakeInterval);
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