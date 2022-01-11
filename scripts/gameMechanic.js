
class Mechanic{

    constructor(board, move, memRow, memColumn){
        this.board = board ;
        this.move = move ;
        this.memRow = memRow ;
        this.memColumn = memColumn ;
    }

    returnBoard(){
        return this.board ;
    }

    returnMove(){
        return this.move ;
    }

    isPlayerChange(){
        if(this.memRow  == -1) return true ;
        return false ;
    }

    copyMechanic(){
        var copyBoard = this.cloneBoard() ;
        return new Mechanic(copyBoard, this.move, this.memRow, this.memColumn) ;
    }

    cloneBoard(){
        var copyBoard = [this.board[0].slice(), this.board[1].slice(), this.board[2].slice(), 
                        this.board[3].slice(), this.board[4].slice(), this.board[5].slice(), 
                        this.board[6].slice(), this.board[7].slice() ] ;
        return copyBoard ;
    }



    //Zwraca tablice pól dostępnych wokół pionka , nie zablokowanych przez inne pionki
    pawnBlock(row, column){
        var allowedMoves = [] ;
        if(this.move%2 == 0){
            if(row+1 <= 7 && column+1 <=7)  
                if(this.opponentPlayerOrEmptyField(row+1, column+1) == "empty") allowedMoves.push([row+1,column+1]) ;
            if(row+1 <= 7 && column-1 >=0)
                if(this.opponentPlayerOrEmptyField(row+1, column-1) == "empty") allowedMoves.push([row+1,column-1]);
        }
        if(this.move%2 == 1){
            if(row-1 >= 0 && column+1 <=7)
                if(this.opponentPlayerOrEmptyField(row-1, column+1) == "empty") allowedMoves.push([row-1,column+1]) ;
            if(row-1 >= 0 && column-1 >= 0) 
                if(this.opponentPlayerOrEmptyField(row-1, column-1) == "empty") allowedMoves.push([row-1,column-1]);
        }
        return allowedMoves ;
    }


    //Zwraca tablice pól dostępnych przez bicie pionka wroga przez inny pionek
    pawnAtack(row, column){
        var allowedMoves = [] ;

        if(row+2 <= 7 && column+2 <=7)  
            if(this.opponentPlayerOrEmptyField(row+1,column+1) == "opponent" && this.opponentPlayerOrEmptyField(row+2,column+2) == "empty")
                allowedMoves.push([row+2,column+2]) ;

        if(row+2 <= 7 && column-2 >= 0)
            if(this.opponentPlayerOrEmptyField(row+1,column-1) == "opponent" && this.opponentPlayerOrEmptyField(row+2,column-2) == "empty") 
                allowedMoves.push([row+2,column-2]) ;

        if(row-2 >= 0 && column+2 <=7)
            if(this.opponentPlayerOrEmptyField(row-1,column+1) == "opponent" && this.opponentPlayerOrEmptyField(row-2,column+2) == "empty") 
                allowedMoves.push([row-2,column+2]) ;

        if(row-2 >= 0 && column-2 >= 0) 
            if(this.opponentPlayerOrEmptyField(row-1,column-1) == "opponent" && this.opponentPlayerOrEmptyField(row-2,column-2) == "empty") 
                allowedMoves.push([row-2,column-2]) ;

        return  allowedMoves ;
    }


    //Zwraca tablice pól dostępnych wokół królowej , nie zablokowanych przez inne pionki
    queenBlock(row, column){
        var allowedMoves = [] ;

        for(var i=1;(row+i<=7 && column+i<=7) && this.opponentPlayerOrEmptyField(row+i, column+i) == "empty"; i++){
            allowedMoves.push([row+i, column+i]) ;
        }
        for(var i=1;(row-i>=0 && column+i<=7) && this.opponentPlayerOrEmptyField(row-i, column+i) == "empty"; i++){
            allowedMoves.push([row-i, column+i]) ;
        }
        for(var i=1;(row+i<=7 && column-i>=0) && this.opponentPlayerOrEmptyField(row+i, column-i) == "empty"; i++){
            allowedMoves.push([row+i, column-i]) ;
        }
        for(var i=1;(row-i>=0 && column-i>=0) && this.opponentPlayerOrEmptyField(row-i, column-i) == "empty"; i++){
            allowedMoves.push([row-i, column-i]) ;
        }

        return allowedMoves ;
    }


    //Zwraca tablice pól dostepnych przez bicie pionka przez królową
    queenAtack(row, column){
        var allowedMoves = [] ;

        var atack = false ;
        for(var i=1;(row+i<=7 && column+i<=7); i++){
            if(this.opponentPlayerOrEmptyField(row+i, column+i) == "player"){
                break ;
            }
            if(!atack && this.opponentPlayerOrEmptyField(row+i, column+i) == "opponent"){
                atack = true ;
            }
            else if(atack && this.opponentPlayerOrEmptyField(row+i, column+i) == "empty"){
                allowedMoves.push([row+i, column+i]) ;
            }
            else if(atack && this.opponentPlayerOrEmptyField(row+i, column+i) == "opponent"){
                break ;
            }
        }

        atack = false ;
        for(var i=1;(row-i>=0 && column+i<=7); i++){
            if(this.opponentPlayerOrEmptyField(row-i, column+i) == "player"){
                break ;
            }
            if(!atack && this.opponentPlayerOrEmptyField(row-i, column+i) == "opponent"){
                atack = true ;
            }
            else if(atack && this.opponentPlayerOrEmptyField(row-i, column+i) == "empty"){
                allowedMoves.push([row-i, column+i]) ;
            }
            else if(atack && this.opponentPlayerOrEmptyField(row-i, column+i) == "opponent"){
                break ;
            }
        }

        atack = false ;
        for(var i=1;(row+i<=7 && column-i>=0); i++){
            if(this.opponentPlayerOrEmptyField(row+i, column-i) == "player"){
                break ;
            }
            if(!atack && this.opponentPlayerOrEmptyField(row+i, column-i) == "opponent"){
                atack = true ;
            }
            else if(atack && this.opponentPlayerOrEmptyField(row+i, column-i) == "empty"){
                allowedMoves.push([row+i, column-i]) ;
            }
            else if(atack && this.opponentPlayerOrEmptyField(row+i, column-i) == "opponent"){
                break ;
            }
        }

        atack = false ;
        for(var i=1;(row-i>=0 && column-i>=0); i++){
            if(this.opponentPlayerOrEmptyField(row-i, column-i) == "player"){
                break ;
            }
            if(!atack && this.opponentPlayerOrEmptyField(row-i, column-i) == "opponent"){
                atack = true ;
            }
            else if(atack && this.opponentPlayerOrEmptyField(row-i, column-i) == "empty"){
                allowedMoves.push([row-i, column-i]) ;
            }
            else if(atack && this.opponentPlayerOrEmptyField(row-i, column-i) == "opponent"){
                break ;
            }
        }
        return allowedMoves ;
    }




    isAnyPawnAbleToAtack(){
        for(var i=0; i<=7; i++){
            for(var j=0; j<=7; j++){
                if(this.opponentPlayerOrEmptyField(i, j) == "player"){
                    if(this.pawnOrQueen(i,j) == "pawn" && this.pawnAtack(i, j).length != 0) return true ; 
                    if(this.pawnOrQueen(i,j) == "queen" && this.queenAtack(i,j).length != 0) return true ;
                }
            }
        }
        return false ;
    }

    isAnyPawnAbleToMove(){
        for(var i=0; i<=7; i++){
            for(var j=0; j<=7; j++){
                if(this.opponentPlayerOrEmptyField(i, j) == "player"){
                    if(this.pawnOrQueen(i,j) == "pawn" && (this.pawnAtack(i, j).length != 0  ||  this.pawnBlock(i, j).length != 0)) return true ; 
                    if(this.pawnOrQueen(i,j) == "queen" && (this.queenAtack(i,j).length != 0  ||  this.queenBlock(i,j).length != 0)) return true ;
                }
            }
        }
        return false ;
    }


    isPossibleToAtackAgain(row1, column1, row2, column2){
        if(this.pawnOrQueen(row2,column2) == "pawn"){
            if(this.pawnAtack(row2, column2).length == 0  ||  Math.abs(row1-row2) == 1) return false ;
            else return true ;
        }

        else if (this.pawnOrQueen(row2,column2) == "queen"){
            if(this.queenAtack(row2, column2).length != 0){
                return true ;
            }
            else{
                return false ;
            }
        }
    }

    changeBoard(positions){
        //Sprawdza czy nie zostało wykonane bicie
        if(this.isAnyPawnAbleToAtack()){

            var pawn = this.board[positions[0][0]][positions[0][1]] ;
            this.board[positions[1][0]][positions[1][1]] = pawn ;
            this.board[positions[0][0]][positions[0][1]] = 0 ;

            this.board[this.positionOfOppenent(positions)[0]][this.positionOfOppenent(positions)[1]] = 0 ;

            if(this.isPossibleToAtackAgain(positions[0][0], positions[0][1], positions[1][0],positions[1][1])){
                this.memRow = positions[1][0] ;
                this.memColumn = positions[1][1] ;
            }
            else
            {
                this.change_to_queen() ;
                this.move++ ;
                this.memRow = -1 ;
                this.memColumn = -1 ;                  
            }
        }

        else{
            var pawn = this.board[positions[0][0]][positions[0][1]] ;
            this.board[positions[1][0]][positions[1][1]] = pawn ;
            this.board[positions[0][0]][positions[0][1]] = 0 ;

            this.change_to_queen() ;
            this.move++ ;
            this.memRow = -1 ;
            this.memColumn = -1 ;            
        }
    }

    change_to_queen(){
        for(var i=0; i<8; i++){
            if(this.board[0][i]==2) this.board[0][i] = 4;
            if(this.board[7][i]==1) this.board[7][i] = 5;
        }
    }


    //Jeżeli bicie zostało wykonane, na podstawie ruchów gracza wylicza pozycje zbitego pionka przeciwnika
    positionOfOppenent(positions){
        var row = positions[0][0] ;
        var column = positions[0][1] ;
        var tab = [] ;

        if(this.pawnOrQueen(positions[1][0], positions[1][1]) == "pawn"){
            if(positions[0][0] < positions[1][0]) row = positions[1][0]-1 ;
            else row = positions[1][0]+1 ;

            if(positions[0][1] < positions[1][1]) column = positions[1][1]-1 ;
            else column = positions[1][1]+1 ;
        }



        else if(this.pawnOrQueen(positions[1][0], positions[1][1]) == "queen"){
            var directionX, directionY ;
            if(positions[1][0] - positions[0][0] > 0) directionX = 1;
            else directionX = -1 ;

            if(positions[1][1] - positions[0][1] > 0) directionY = 1;
            else directionY = -1 ;

            while(this.opponentPlayerOrEmptyField(row, column) != "opponent"){
                row += directionX ;
                column += directionY ;
            }
        }

        tab.push(row) ;
        tab.push(column) ;

        return tab ;
    }


    //Sprawdza czy na wskazanym polu znajduje się pionek obecnego gracza, przeciwnika lub nic
    opponentPlayerOrEmptyField(row, column){
        if(this.board[row][column] == 0) return "empty" ;
        if(this.move%2 == 1){
            if(this.board[row][column] == 2  ||  this.board[row][column] == 4) return "player" ;
            if(this.board[row][column] == 1  ||  this.board[row][column] == 5) return "opponent" ;
        }
        else{
            if(this.board[row][column] == 2  ||  this.board[row][column] == 4) return "opponent" ;
            if(this.board[row][column] == 1  ||  this.board[row][column] == 5) return "player" ;
        }
    }


    pawnOrQueen(row, column){
        if(this.board[row][column] == 1  ||  this.board[row][column] == 2) return "pawn" ;
        else if(this.board[row][column] == 4  ||  this.board[row][column] == 5) return "queen" ;
    }

    winer(){
        var white = 0 ;
        var black = 0 ;
        for(var i=0; i<=7; i++){
            for(var j=0; j<=7; j++){
                if(this.board[i][j]==1 || this.board[i][j]==5){
                    black++ ;
                }
                else if(this.board[i][j]==2 || this.board[i][j]==4){
                    white++ ;
                } 
            }
        }
        if(white==0) return "black" ;
        else if(black==0) return "white" ;

        if(!this.isAnyPawnAbleToMove()){
            if(this.move%2 == 1) return "black" ;
            else return "white" ;
        }
        return "no one" ;
    }


    allPosibleMoves(){
        var allMoves = [] ;
        for(var i=0; i<=7; i++){
            for(var j=0; j<=7; j++){

                if(this.opponentPlayerOrEmptyField(i, j) == "player"){
                    //Wielokrotne bicie
                    if(this.isAnyPawnAbleToAtack() && this.memRow == i  &&  this.memColumn == j){
                        var moves ;
                        if(this.pawnOrQueen(i, j) == "pawn"){
                            moves = this.pawnAtack(i, j) ;
                        }
                        else if(this.pawnOrQueen(i, j) == "queen"){
                            moves = this.queenAtack(i, j) ;
                        }
                        allMoves = this.addTab(allMoves, moves, i, j) ;
                    }

                    //Pojedyncze bicie
                    if(this.isAnyPawnAbleToAtack() && this.memRow==-1){
                        if(this.pawnOrQueen(i, j) == "pawn"){
                            allMoves = this.addTab(allMoves, this.pawnAtack(i,j), i, j) ;
                        }
                        else if(this.pawnOrQueen(i, j) == "queen"){
                            allMoves = this.addTab(allMoves, this.queenAtack(i,j), i, j) ;
                        }
                    }

                    //Pojedynczy ruch
                    if(!this.isAnyPawnAbleToAtack()){
                        if(this.pawnOrQueen(i, j) == "pawn"){
                            allMoves = this.addTab(allMoves, this.pawnBlock(i,j), i, j) ;
                        }
                        else if(this.pawnOrQueen(i, j) == "queen"){
                            allMoves = this.addTab(allMoves, this.queenBlock(i,j), i, j) ;
                        }                        
                    }
                }
            }
        }
        return allMoves ;
    }

    addTab(mainTab, tab, x, y){
        var len = tab.length ;
        for(var i=0; i<len; i++){
            var move = [] ;
            move.push([x,y]) ;
            move.push(tab[i]) ;
            mainTab.push(move) ;
        }
        return mainTab ;
    }



    rateBoardCpu(){
        var black = 0 ;
        var white = 0 ;
        for(var i=0; i<=7; i++){
            for(var j=0; j<=7; j++){
                if(this.board[i][j] == 1) black++
                else if(this.board[i][j] == 5) black += 3 ;
                else if(this.board[i][j] == 2) white++ ;
                else if(this.board[i][j] == 4) white += 3 ;
            }
        }
        if(this.winer() == "white") return 0 ;
        if(this.winer() == "black") return 100 ;
        return black/white ;
    }

}