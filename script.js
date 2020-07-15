const playerFactory = ( symbol ) => {
      let wins = 0;

      const win = () => { wins++; }
      return { wins, symbol }
}


const ticTacToe = (() => {

      var cells = document.getElementsByTagName('td');

      var players = {
            'x': playerFactory('x'),
            'o': playerFactory('o')
      }

      var board = [ '', '', '', '', '', '', '', '', ''];

      var turn = 0;

      const move = ( e ) => {
            /**
             * Updates the DOM if the player makes a legal move.
             */
            let currentPlayer = whoseTurnIsItAnyways();

            if( ! gameOver() ){
                  e.target.innerText = currentPlayer.symbol
                  turn++;
                  updateTurnCounter()
            }

      }

      const updateTurnCounter = () => {
            document.getElementById('turn-counter').innerHTML = turn;
      }

      const whoseTurnIsItAnyways = () => {
            return ( turn % 2 === 0 ) ? players['x'] : players['o'];
      }

      const isVerticalWin = () => {
            return false;
      }

      const isHorizontalWin = () => {
            return false;
      }

      const isDiagonalWin = () => {
            return false;
      }

      const isDraw = () => {
            /**
             * Check for whether or not the game has exceeded the maximum number of legal turns in a game of Tic-Tac-Toe
             */
            return ( turn > 9 )
      }

      const gameOver = () => {
            /**
             * Checks if the game is over by running down a list of winning strategies.
             */

             // ways to win
            let winTypes = [
                  isVerticalWin,
                  isHorizontalWin,
                  isDiagonalWin,
                  isDraw
            ];

            // Run each function and break if any are true.
            for( let checkForWin of winTypes ){
                  if( checkForWin() ){ return true; }
            }

            // if we make it here - the game is still going
            return false;
            
      }
      
      // listeners
      for( let cell of cells  ){
            cell.addEventListener('click', move)
      }


})();
  
