
class GameScreen{

    constructor(mode, endOfGame){
        this.startBoard = [[1,3,1,3,1,3,1,3],
                           [3,1,3,1,3,1,3,1],
                           [1,3,1,3,1,3,1,3],
                           [3,0,3,0,3,0,3,0],
                           [0,3,0,3,0,3,0,3],
                           [3,2,3,2,3,2,3,2],
                           [2,3,2,3,2,3,2,3],
                           [3,2,3,2,3,2,3,2]] ;

        this.startBoardxx = [[0,3,1,3,0,3,1,3],
                           [3,0,3,0,3,0,3,0],
                           [1,3,0,3,0,3,0,3],
                           [3,1,3,1,3,1,3,0],
                           [0,3,0,3,0,3,0,3],
                           [3,0,3,2,3,2,3,1],
                           [0,3,2,3,2,3,0,3],
                           [3,0,3,0,3,0,3,0]] ;


        this.whichClick = 0 ; 
        this.memRow = -1 ;
        this.memColumn = -1 ;
        this.firstTimeRun = true ;
        this.game = new Mechanic(this.startBoard, 1, -1, -1);
        this.mode = mode;
        this.endOfGame = endOfGame;
        this.cpu = new Cpu(this.game) ;
    }



    // ekran gry //
    createBoard(){
        var div = document.querySelector("#divBoard") ;
        var table = document.createElement("table") ;
        table.id = "tableBoard" ;
        div.appendChild(table) ;
        var n = 1
        for(var i = 1; i <= 8; i++){
            var row = document.createElement("tr") ;
            table.appendChild(row) ;

            for(var j = 1; j <= 8; j++){
                var column = document.createElement("td") ;
                row.appendChild(column) ;

                var cell = document.createElement("div") ;
                column.appendChild(cell) ;

                cell.classList.add("cellMain") ;
                cell.id = "cell" + n.toString() ;
                cell.setAttribute("row", i.toString()) ;
                cell.setAttribute("column", j.toString()) ; 

                this.colorCells(i, j, cell) ;
                this.cellAddEventListener(cell) ;
            }
        }
    }


    colorCells(i, j, cell){
        if(i%2==0){
            if(j%2==0){
                cell.classList.add("cellWhite") ;
                this.createPawns(cell) ;
            }
        }
        else{
            if(j%2==1){
                cell.classList.add("cellWhite") ;
                this.createPawns(cell) ;
            }
        }
    }


    createPawns(cell){
        var blackPawn = document.createElement("img") ;
        var whitePawn = document.createElement("img") ;
        var blackQueen = document.createElement("img") ;
        var whiteQueen = document.createElement("img") ;
        
        blackPawn.setAttribute("src", "images/pawnBlack.png") ;
        whitePawn.setAttribute("src", "images/pawnWhite.png") ;
        blackQueen.setAttribute("src", "images/queenBlack.png") ;
        whiteQueen.setAttribute("src", "images/queenWhite.png") ;
        
        blackPawn.classList.add("blackPawn") ;
        whitePawn.classList.add("whitePawn") ;
        blackQueen.classList.add("blackQueen") ;
        whiteQueen.classList.add("whiteQueen") ;
        
        blackPawn.classList.add("noShowPawn") ;
        whitePawn.classList.add("noShowPawn") ;
        blackQueen.classList.add("noShowPawn") ;
        whiteQueen.classList.add("noShowPawn") ;
        
        cell.appendChild(blackPawn) ;
        cell.appendChild(whitePawn) ;
        cell.appendChild(blackQueen) ;
        cell.appendChild(whiteQueen) ;
    }


    cellAddEventListener(cell){
        if (cell.classList.contains("cellWhite") == true){
            var self = this ;
            cell.addEventListener("click", function(){
                self.cellClick(cell) ;
            }) ;
        }
    }






    //Zmiany ekranu
    cellClick(cell){

        var row = parseInt(cell.getAttribute("row"))-1 ;
        var column = parseInt(cell.getAttribute("column"))-1 ;

        if(this.mode == "multi"  ||  (this.mode == "single" && this.game.returnMove() % 2 == 1)){
            //Kliknięcie na to samo pole przy wielokrotnym biciu
            if(row==this.memRow && column==this.memColumn){
                this.memRow = -1 ;
                this.memColumn = -1 ;
                this.colorCell(row, column, "cellWhite") ;
                this.colorPossibleCells(row, column, "cellWhite") ;
                this.whichClick -- ;
            }

            //Kliknięcie na pionek
            else if(this.possibleMovesFrom(row, column).length != 0 && this.whichClick==0){
                this.colorCell(row, column, "cellPink") ;
                this.colorPossibleCells(row, column, "cellGreen") ;
                this.memRow = row ;
                this.memColumn = column ;
                this.whichClick ++ ;
            }
            //Kliknięcie na pole
            else if((this.memRow != -1  &&  this.memColumn != -1) && this.isPossibleMoveFromTo(this.memRow, this.memColumn, row, column) && this.whichClick==1){
                var tab = [[this.memRow, this.memColumn],[row, column]] ;
                this.whichClick = 0 ;
                this.colorCell(this.memRow, this.memColumn, "cellWhite") ;
                this.colorPossibleCells(this.memRow, this.memColumn, "cellWhite") ;
                this.game.changeBoard(tab) ;
                this.restartBoard() ;
                this.updateBoard();

                this.memRow = -1 ;
                this.memColumn = -1 ;

                //Przypadek podwójnego bicia
                if(!this.game.isPlayerChange()){
                    this.whichClick = 1 ;
                    this.colorCell(row, column, "cellPink") ;
                    this.colorPossibleCells(row, column, "cellGreen") ;
                    this.memRow = row ;
                    this.memColumn = column ;
                }
            }
        }
        //Ruch CPU
        if(this.mode == "single" && this.game.returnMove() % 2 == 0 && this.game.winer() == "no one"){

            var self = this ;
            window.setTimeout(function()
            {            
                while(self.game.returnMove() % 2 == 0){
                    self.cpu.cpuMove() ;
                self.restartBoard() ;
                self.updateBoard() ;
                }
            }, 1000);
        }
        this.isEndOfGame() ;
    }










    
    isEndOfGame(){
        var winer = this.game.winer() ;
        if(winer != "no one"){
            var self = this ;
            window.setTimeout(function(){
                if(winer == "white") alert("The winner is white player") ;
                else alert("The winner is black player") ;
                self.endOfGame();
            }, 1);
            var div = document.querySelector("#divBoard") ;
            var table = document.querySelector("#tableBoard") ;
            div.removeChild(table) ;
        }
    }

    possibleMovesFrom(row, column){
        var allPossibleMoves = this.game.allPosibleMoves() ;
        var possibleMoves = [] ;
        for(var i=0; i<allPossibleMoves.length; i++){
            if(allPossibleMoves[i][0][0] == row  &&  allPossibleMoves[i][0][1] == column){
                possibleMoves.push(allPossibleMoves[i][1]) ;
            }
        }
        return possibleMoves ;
    }

    isPossibleMoveFromTo(row1, col1, row2, col2){
        var allPossibleMoves = this.game.allPosibleMoves() ;
        for(var i=0; i<allPossibleMoves.length; i++){
            if(allPossibleMoves[i][0][0] == row1  &&  allPossibleMoves[i][0][1] == col1
            && allPossibleMoves[i][1][0] == row2  && allPossibleMoves[i][1][1] == col2) return true ;
        }
        return false ;
    }

    colorPossibleCells(row, column, color){
        var tab = this.possibleMovesFrom(row, column) ;
        var len = tab.length ;
        for(var i=0; i<len; i++){
            this.colorCell(tab[i][0], tab[i][1], color) ;
        }
    }


    colorCell(row, column, color){
        var cell = document.querySelector("#tableBoard div[row='"+ (row+1) +"'][column='"+ (column+1) +"']");

        if(cell.classList.contains("cellWhite")){
            cell.classList.remove("cellWhite") ;
        }
        if(cell.classList.contains("cellPink")){
            cell.classList.remove("cellPink") ;
        }
        if(cell.classList.contains("cellGreen")){
            cell.classList.remove("cellGreen") ;
        }
        cell.classList.add(color) ;
    }



    updateBoard(){
        var board = this.game.returnBoard() ;
        for(var i=0; i<8; i++){
            for(var j=0; j<8; j++){

                var div = document.querySelector("#tableBoard div[row='"+(i+1).toString()+
                "'][column='"+(j+1).toString()+"']");

                if(board[i][j]==1){

                    var img = div.querySelector(".blackPawn") ;
                    img.classList.remove("noShowPawn") ;
                }
                else if(board[i][j]==2){

                    var img = div.querySelector(".whitePawn") ;
                    img.classList.remove("noShowPawn") ;
                }
                else if(board[i][j]==4){
                    var img = div.querySelector(".whiteQueen") ;
                    img.classList.remove("noShowPawn") ;
                }
                else if(board[i][j]==5){
                    var img = div.querySelector(".blackQueen") ;
                    img.classList.remove("noShowPawn") ;
                }
            }
        }
    }

    restartBoard(){
        var board = this.game.returnBoard() ;
        for(var i=0; i<8; i++){
            for(var j=0; j<8; j++){

                var div = document.querySelector("#tableBoard div[row='"+(i+1).toString()+
                "'][column='"+(j+1).toString()+"']");

                if(board[i][j]!=3){
        
                    var blackPawn = div.querySelector(".blackPawn") ;
                    if(blackPawn.classList.contains("noShowPawn")==false){
                        blackPawn.classList.add("noShowPawn") ;
                    }

                    var whitePawn = div.querySelector(".whitePawn") ;
                    if(whitePawn.classList.contains("noShowPawn")==false){
                        whitePawn.classList.add("noShowPawn") ;
                    }

                    var blackQueen = div.querySelector(".blackQueen") ;
                    if(blackQueen.classList.contains("noShowPawn")==false){
                        blackQueen.classList.add("noShowPawn") ;
                    }

                    var whiteQueen = div.querySelector(".whiteQueen") ;
                    if(whiteQueen.classList.contains("noShowPawn")==false){
                        whiteQueen.classList.add("noShowPawn") ;
                    }   
                }
            }
        }
    }
}

