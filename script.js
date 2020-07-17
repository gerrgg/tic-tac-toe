const playerFactory = ( symbol ) => {
      /**
       * Player Object.
       */
      
      let wins = 0;

      const win = () => { 
            wins++; 
            document.getElementById('player-' + symbol + '-score').innerText = wins
      }

      return { wins, symbol, win }
}

const ticTacToe = (() => {

      // dom elements
      var cells = document.getElementsByTagName('td');
      var restartButton = document.getElementById('restart-button');

      // init variables
      var gameIsOver = false;
      var board = [ '', '', '', '', '', '', '', '', ''];
      var turn = 0;

      //setup players
      
      var players = {
            'x': playerFactory('x'),
            'o': playerFactory('o')
      }
      
      var currentPlayer = players['x']

      /**
       * Runs when a cell is clicked - decides whose turn it is, reflects the event and checks for winner
       * @param {event}
       */
      const move = ( e ) => {

            currentPlayer = whoseTurnIsItAnyways();

            // the cell last clicked
            let index = e.target.id;

            // if the game isnt over and the selected cell not already filled in
            if( ! gameIsOver ){

                  if( board[index] === '' ){

                        // set array value
                        board[index] = currentPlayer.symbol;
      
                        // show the board, update UI
                        updateTheDom()
      
                        // returns if any of the win conditions have been met - otherwise we just keep playing.
                        gameIsOver = checkForWinner();
                  }
                  
            }
      }

      const updateTheDom = () => {
            /**
             * Loop loops through the board and matches it's respective DOM element with whats in the array.
             */
            for( let i = 0; i < cells.length; i++ ){
                  cells[i].innerText = board[i]
            }

            updateTurnCounter()
            
      }

      /**
       * Updates the turn count and reflects that on the DOM
       */
      const updateTurnCounter = () => {
            turn++;
            document.getElementById('turn-counter').innerHTML = turn;
      }

      /**
       * Checks whose turn it is by checking whether the turn count is odd or even
       * @return {playerFactory}
       */
      const whoseTurnIsItAnyways = () => ( turn % 2 === 0 ) ? players['x'] : players['o'];
      

      /**
       * Setup column array - loop and check for win
       * @return {bool}
       */
      const isVerticalWin = () => {
            let columns = [
                  [ board[0], board[3], board[6] ],
                  [ board[1], board[4], board[7] ],
                  [ board[2], board[5], board[8] ]
            ]
            
            return loopNcheck( columns )
      }


      /**
        * Setup rows array - loop and check for win
        * @return {bool} 
        */
      const isHorizontalWin = () => {
            let rows = [
                  [ board[0], board[1], board[2] ],
                  [ board[3], board[4], board[5] ],
                  [ board[6], board[7], board[8] ]
            ]
            
            return loopNcheck( rows )
      }

      /**
       * Setup diagnoals array - loop and check for win
       * @return {bool}
       */
      const isDiagonalWin = () => {
            let diagonals = [
                  [ board[0], board[4], board[8] ],
                  [ board[6], board[4], board[2] ],
            ]
            
            return loopNcheck( diagonals )
      }

      /**
       * Loop through each array and check if columns/rows/diagonals all match each other.
       * @param {array} arrays 
       */
      const loopNcheck = (arrays) => {

            for( let array of arrays ){
                  if( allEqualAndNotBlank( array ) ) {
                        currentPlayer.win()
                        return true; 
                  }
            }

            return false
      }



       /**
       * Checks if the array given is equal to the first element and also not blank.
       * https://stackoverflow.com/a/35568895/3247137
       */
      const allEqualAndNotBlank = arr => arr.every( v => v === arr[0] && arr[0] != '' )

      /**
       * Check for whether or not the game has exceeded the maximum number of legal turns in a game of Tic-Tac-Toe
       */
      const isDraw = () => (turn > 9)

      /**
       * Checks if the game is over by running down a list of winning strategies.
       */
      const checkForWinner = () => {

             // ways to win
            let winTypes = [
                  isVerticalWin,
                  isHorizontalWin,
                  isDiagonalWin,
                  isDraw
            ];

            // Run each function and break if any are true.
            for( let checkForWin of winTypes ){
                  
                  // if there is a winner 
                  if( checkForWin() ) { 
                        // stop game
                        return true;
                  }
            }

            return false;

      }

      /**
       * Pick things up and put them where they belong (restart)
       */
      const restart = () => {
            board = [ '', '', '', '', '', '', '', '', ''];
            turn = 0;
            currentPlayer = players['x'];
            gameIsOver = false;

            updateTheDom()
      }

      // listeners
      for( let cell of cells  ){
            cell.addEventListener( 'click', move )
      }

      restartButton.addEventListener( 'click', restart )


})();
  
