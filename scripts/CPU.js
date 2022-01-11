
class Cpu {

    constructor(gameMechanic){
        this.gameMechanic = gameMechanic ;
    }

    cpuMove(){
        var moves = this.gameMechanic.allPosibleMoves() ;
        this.gameMechanic.changeBoard(moves[this.cpuTheBestMove()]) ;
    }


    rateBoard(depth, mechanic){
        if(depth<=0) return mechanic.rateBoardCpu();
        else if(mechanic.rateBoardCpu() == 100  || mechanic.rateBoardCpu() == 0) return mechanic.rateBoardCpu() ;
        else{
            var moves = mechanic.allPosibleMoves() ;

            var newMechanic = mechanic.copyMechanic() ;
            newMechanic.changeBoard(moves[0]) ;
            var rate ;
            if(moves.length > 1) rate = this.rateBoard(depth-1, newMechanic) ;
            else rate = this.rateBoard(depth, newMechanic) ;

            for(var i=1; i<moves.length; i++){
                
                var newMechanic = mechanic.copyMechanic() ;
                newMechanic.changeBoard(moves[i]) ;
                var nextRate ;

                if(moves.length > 1) nextRate = this.rateBoard(depth-1, newMechanic) ;
                else nextRate = this.rateBoard(depth, newMechanic) ;

                }

                if(mechanic.returnMove()%2 == 0){                   
                    if(nextRate > rate) rate = nextRate ;
                }
                else{
                     if(nextRate < rate) rate = nextRate ;
                }
            }
        return rate ;
    }
    



    cpuTheBestMove(){
        var moves = this.gameMechanic.allPosibleMoves() ;
        var move = 0 ;

        var newMechanic = this.gameMechanic.copyMechanic() ;
        newMechanic.changeBoard(moves[0]) ;
        var rate = this.rateBoard(6, newMechanic);
        console.log(rate) ;

        for(var i=1; i<moves.length; i++){
            var newMechanic = this.gameMechanic.copyMechanic() ;
            newMechanic.changeBoard(moves[i]) ;
            var newRate = this.rateBoard(6, newMechanic) ;
            console.log(newRate) ;
            if(newRate > rate){
                rate = newRate ;
                move = i ;
            }
        }
        console.log("BBBBBBBBBBB")
        return move ;
    }





}