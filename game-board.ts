import * as $ from "jquery";
import { Tile, TileState } from "./tile";
import { Player } from './player';

export class GameBoard {
    readonly x = 10;
    readonly y = 10;

    board: Tile[][];
    playerOne = new Player('Player one' , 1);
    playerTwo = new Player('Player two' , 2);

    currentPlayer: Player;
    winner: Player;

    constructor(public tableElement: JQuery) {
        this.startGame();
    }

    initializeBoard(tableElement: JQuery, board: Tile[][]) {
        tableElement.children().remove();
        let tBody = $("<tbody></tbody>");
        tableElement.append(tBody);
        console.log(tableElement.children());
        for (let i = 0; i < this.y; i++) {
            var rowTiles: Tile[] = [];
            let row = $("<tr></tr>");
            tBody.append(row);
            for (let j = 0; j < this.x; j++) {
                let column = $("<td></td>");
                row.append(column);
                rowTiles.push(new Tile(column));
            }
            this.board.push(rowTiles);
        }
    }

    loadState() {
        return false;
    }

    saveState() { }

    startGame() {
        if (!this.loadState()) {
            this.initializeBoard(this.tableElement, this.board = []);
            this.currentPlayer = this.winner === this.playerOne ? this.playerTwo : this.playerOne;
        }
    }
}