import { GameBoard } from './game-board';
import * as $ from 'jquery';

var board: GameBoard;
$(() => {
    board = new GameBoard($(".game-board-table"));
    $(".won-rounds").val("0 rounds won");
    $(".step-number").val(0);
    $("player-name:eq(0)").val(board.playerOne.name);
    $("player-name:eq(1)").val(board.playerTwo.name);
});