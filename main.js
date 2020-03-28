"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var game_board_1 = require("./game-board");
var $ = require("jquery");
var board;
$(function () {
    board = new game_board_1.GameBoard($(".game-board-table"));
    $(".won-rounds").val("0 rounds won");
    $(".step-number").val(0);
    $("player-name:eq(0)").val(board.playerOne.name);
    $("player-name:eq(1)").val(board.playerTwo.name);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwyQ0FBeUM7QUFDekMsMEJBQTRCO0FBRTVCLElBQUksS0FBZ0IsQ0FBQztBQUNyQixDQUFDLENBQUM7SUFDRSxLQUFLLEdBQUcsSUFBSSxzQkFBUyxDQUFDLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUM7SUFDOUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUNyQyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3pCLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2pELENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3JELENBQUMsQ0FBQyxDQUFDIn0=