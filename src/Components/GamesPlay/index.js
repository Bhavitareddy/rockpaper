import {Component} from "react"
import Popup from "reactjs-popup"
import {RiCloseLine} from "react-icons/ri"

import {
    GamePlayMainContainer,
    GameRulesView,
    PopUpView,
    PopUpImage,
} from "./styledComponents"

import GameScore from "./GameScore"
import GameResults from "./GameResults"

const choicesList=[
    {
        id:"ROCK",
        imageUrl:
          "https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rock-image.png",
    },
    {
        id:"SCISSORS",
        imageUrl:
          "https://assets.ccbp.in/frontend/react-js/rock-paper-scissors/scissors-image.png",
    },
    {
        id:"PAPER",
        imageUrl:
          "https://assets.ccbp.in/frontend/react-js/rock-paper-scissors/paper-image.png",
    },
]

class GamePlay extends Component{
    state={
        isShow:true,
        text:"YOU WON",
        score:0,
        newArray:[choicesList[0],choicesList[1]],
    }
    updateResult=(you,opponent)=>{
        if(you.id==="ROCK"){
            switch(opponent.id){
                case "PAPER":
                    return "YOU LOOSE"
                case "SCISSORS":
                    return "YOU WON"
                default:
                    return "IT IS DRAW"        
            }
        } else if (you.id==="PAPER"){
            switch(opponent.id){
                case "ROCK":
                    return "YOU WON"
                case "SCISSORS":
                    return "YOU LOOSE"
                default:
                    return "IT IS DRAW"    

            }
        } else{
             switch(opponent.id){
                case "ROCK":
                    return "YOU LOOSE"
                case "PAPER":
                    return "YOU WON"
                default:
                    return "IT IS DRAW"    

            }

        }
        

    }
    restartGame=()=>this.setState({isShow:true})

    opponentRandomChoice=id=>{
        const {score}=this.state
        const opponent=choicesList[Math.random()*choicesList.length)]
        const you=choicesList.filter(eachItem=>eachItem.id===id)
        const result=this.updateResult(you[0],opponent)
        let newScore=score
        if(result==="YOU WON"){
            newScore=score+1
        } else if(result==="YOU LOOSE"){
            newScore=score-1
        }else{
            newScore=score
        }
        this.setState({
            score:newScore,
            isSHow:false,
            newArray:[you[0],opponent],
        })
    }
    render(){
        const {isShow,text,score,newArray}=this.state
        return (
            <GamePlayMainContainer>
                <GameScore score={score}/>
                <GameResults 
                  choicesList={choicesList}
                  text={text}
                  isShow={isShow}
                  newArray={newArray}
                  opponentRandomChoice={this.opponentRandomChoice}
                  restartGame={this.restartGame}
                />

                <GameRulesView>
                    <Popup
                      modal
                      trigger={
                          <button type="button" className="trigger-button">
                              RULES
                          </button>
                      }
                >
                    {close=>(
                        <PopUpView>
                            <button
                               type="button"
                               className="trigger-button-close"
                               onClick={()=>close()}
                            >
                                <RiCloseLine/>
                            </button>
                            <PopUpImage
                              src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissors/rules-image.png"
                              alt="rules"
                            />     
                        </PopUpView>
                    )}
                </Popup>      
                </GameRulesView> 
            </GamePlayMainContainer>
        )
    }
}

export default GamePlay