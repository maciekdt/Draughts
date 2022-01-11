
class MenuScreen{

    constructor(){
    } ;

    changeScreen(nextScreen){
        nextScreen = document.querySelector(nextScreen) ;
        var screens = document.querySelectorAll(".screen") ;
        for(var i = 0; i < screens.length; i++){
            if (screens[i].classList.contains("showScreen") == true){
                screens[i].classList.remove("showScreen")
            }
        }
        nextScreen.classList.add("showScreen") ;
    }
        
    
    setButtons(){
        var singlePlayerButton = document.querySelector("#singlePlayerButton") ;
        var multiPlayerButton = document.querySelector("#multiPlayerButton") ;
        var self = this;

        singlePlayerButton.addEventListener("click", 
            function() 
            { 
                self.startGame("single");
            } 
        ) ;

        multiPlayerButton.addEventListener("click", 
            function() 
            { 
                self.startGame("multi");
            } 
        ) ;
    }
    
    
    startGame(mode){
        var self = this;
        var gameScreen = new GameScreen(mode,
            function(){ 
                self.changeScreen("#menuScreen"); 
            }) ;
        this.changeScreen("#gameScreen") ;
        gameScreen.createBoard() ;
        gameScreen.restartBoard() ;
        gameScreen.updateBoard() ;
    }
}



var menuScreen = new MenuScreen() ;
menuScreen.setButtons() ;