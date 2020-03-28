"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var $ = require("jquery");
var tile_1 = require("./tile");
var player_1 = require("./player");
var GameBoard = (function () {
    function GameBoard(tableElement) {
        this.tableElement = tableElement;
        this.x = 10;
        this.y = 10;
        this.steps = 0;
        this.playerOne = new player_1.Player('Player one', 1);
        this.playerTwo = new player_1.Player('Player two', 2);
        this.startGame();
    }
    GameBoard.prototype.initializeBoard = function (tableElement, board) {
        tableElement.children().remove();
        var tBody = $("<tbody></tbody>");
        tableElement.append(tBody);
        console.log(tableElement.children());
        for (var i = 0; i < this.y; i++) {
            var rowTiles = [];
            var row = $("<tr></tr>");
            tBody.append(row);
            for (var j = 0; j < this.x; j++) {
                var column = $("<td></td>");
                row.append(column);
                rowTiles.push(new tile_1.Tile(column));
            }
            this.board.push(rowTiles);
        }
    };
    GameBoard.prototype.loadState = function () {
        var data = JSON.parse(localStorage.getItem("amoeba-table"));
        if (!data)
            return false;
        if (this.x !== data.x || this.y !== data.y) {
            localStorage.removeItem("amoeba-table");
            return false;
        }
        this.initializeBoard(this.tableElement, this.board = []);
        for (var i = 0; i < data.x; i++) {
            for (var j = 0; j < data.y; j++) {
                this.board[i][j].setState(data.tileStates[i][j]);
            }
        }
        this.playerOne = data.playerOne;
        this.playerTwo = data.playerTwo;
        this.currentPlayer = (data.current === 'player-one') ? this.playerOne : this.playerTwo;
        return true;
    };
    GameBoard.prototype.saveState = function () {
        localStorage.setItem("amoeba-table", JSON.stringify({
            playerOne: this.playerOne,
            playerTwo: this.playerTwo,
            x: this.x,
            y: this.y,
            tileStates: this.board.map(function (row) { return row.map(function (tile) { return tile.state; }); })
        }));
    };
    GameBoard.prototype.startGame = function () {
        if (!this.loadState()) {
            this.steps = 0;
            this.initializeBoard(this.tableElement, this.board = []);
            this.currentPlayer = this.winner === this.playerOne ? this.playerTwo : this.playerOne;
        }
        this.registerHandlers(this.board);
    };
    GameBoard.prototype.onTileClicked = function (tile) {
        if (tile.state === tile_1.TileState.Empty && this.winner === undefined) {
            if (this.currentPlayer === this.playerOne) {
                tile.setState(tile_1.TileState.X);
                this.currentPlayer = this.playerTwo;
            }
            else if (this.currentPlayer === this.playerTwo) {
                tile.setState(tile_1.TileState.O);
                this.currentPlayer = this.playerOne;
            }
            this.steps++;
            $(".step-number").val(this.steps);
            this.checkWinner();
            this.saveState();
        }
    };
    GameBoard.prototype.onRestartButtonClicked = function () {
        localStorage.removeItem("amoeba-table");
        this.startGame();
    };
    GameBoard.prototype.onClearButtonClicked = function () {
        this.playerOne.gamesWon = 0;
        this.playerTwo.gamesWon = 0;
        this.onRestartButtonClicked();
    };
    GameBoard.prototype.onChangeNameButtonClicked = function (evt) {
        var id = $(evt.target).attr("id");
        var player = (id[7] === "1") ? this.playerOne : this.playerTwo;
        var input = $("#player-" + id[7] + "-name-input");
        player.name = input.val();
        input.replaceWith(function () { return "<b class=\"player-name\">" + player.name + "</b>"; });
        $("#player-" + id[7] + "-name-button").remove();
        this.saveState();
    };
    GameBoard.prototype.onPlayerNameDblClicked = function (evt) {
        var _this = this;
        var playerName = $(evt.target).html();
        var player = (playerName === this.playerOne.name) ? this.playerOne : this.playerTwo;
        $(evt.target).replaceWith(function () { return "<input type=\"text\" id=\"player-" + player.id + "-name-input\" value=\"" + player.name + "\" /> \
                                         <button class=\"change-name\" id=\"player-" + player.id + "-name-button\">Ok</button>"; });
        $(".change-name").click(function (evt) { return _this.onChangeNameButtonClicked(evt); });
    };
    GameBoard.prototype.checkWinner = function () {
        var _this = this;
        var points = 0;
        for (var _i = 0, _a = [
            function (i, j) { return _this.board[i][j]; },
            function (i, j) { return _this.board[j][i]; }
        ]; _i < _a.length; _i++) {
            var fun = _a[_i];
            for (var i = 0; i < this.x; i++) {
                var state = tile_1.TileState.Empty;
                points = 1;
                for (var j = 0; j < this.y; j++) {
                    var tile = fun(i, j);
                    console.log(i + ", " + j + ", " + tile.state + ", " + state + ", " + points);
                    if (tile.state !== tile_1.TileState.Empty && tile.state == state) {
                        if (++points >= 5) {
                            this.won(tile.state === tile_1.TileState.X ? this.playerOne : this.playerTwo);
                        }
                    }
                    else {
                        points = 1;
                    }
                    state = tile.state;
                }
            }
        }
    };
    GameBoard.prototype.won = function (player) {
        var _this = this;
        alert("Player " + player.id + " won! Congrats, " + player.name + "!");
        player.gamesWon++;
        if (player.id === 1)
            $(".won-rounds:eq(0)").text(player.gamesWon + " rounds won");
        else
            $(".won-rounds:eq(1)").text(player.gamesWon + " rounds won");
        var continueButton = $(".continue-game");
        continueButton.removeAttr("disabled").click(function () {
            continueButton.attr("disabled", "disabled");
            localStorage.removeItem("amoeba-table");
            _this.winner = undefined;
            _this.startGame();
        });
        this.winner = player;
    };
    GameBoard.prototype.registerHandlers = function (board) {
        var _this = this;
        for (var i = 0; i < board.length; i++) {
            var _loop_1 = function (j) {
                var tile = board[i][j];
                tile.element.click(function () { return _this.onTileClicked(tile); });
            };
            for (var j = 0; j < board[i].length; j++) {
                _loop_1(j);
            }
        }
        var restartButton = $(".restart-current-game");
        restartButton.click(function () { return _this.onRestartButtonClicked(); });
        var clearButton = $(".clear-results");
        clearButton.click(function () { return _this.onClearButtonClicked(); });
        $(".player-name").dblclick(function (evt) { return _this.onPlayerNameDblClicked(evt); });
    };
    return GameBoard;
}());
exports.GameBoard = GameBoard;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZS1ib2FyZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdhbWUtYm9hcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwwQkFBNEI7QUFDNUIsK0JBQXlDO0FBQ3pDLG1DQUFrQztBQUdsQztJQVlJLG1CQUFtQixZQUFvQjtRQUFwQixpQkFBWSxHQUFaLFlBQVksQ0FBUTtRQVg5QixNQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ1AsTUFBQyxHQUFHLEVBQUUsQ0FBQztRQUNoQixVQUFLLEdBQVcsQ0FBQyxDQUFDO1FBR2xCLGNBQVMsR0FBRyxJQUFJLGVBQU0sQ0FBQyxZQUFZLEVBQUcsQ0FBQyxDQUFDLENBQUM7UUFDekMsY0FBUyxHQUFHLElBQUksZUFBTSxDQUFDLFlBQVksRUFBRyxDQUFDLENBQUMsQ0FBQztRQU1yQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUVELG1DQUFlLEdBQWYsVUFBZ0IsWUFBb0IsRUFBRSxLQUFlO1FBQ2pELFlBQVksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNqQyxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUNqQyxZQUFZLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzNCLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFDckMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDOUIsSUFBSSxRQUFRLEdBQVcsRUFBRSxDQUFDO1lBQzFCLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUN6QixLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2xCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxH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