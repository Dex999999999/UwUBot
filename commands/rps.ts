import { ICommand } from 'wokcommands'
export default {
  category: 'Testing',
  description: 'Rock Paper Scissors', // Required for slash commands
  
  slash: false, // Create both a slash and legacy command
  testOnly: false, // Only register a slash command for the testing guilds
  
  callback: ({ message, interaction }) => {
        var playerChoice = message.content.slice(5)
        
        var computerChoice = Math.random()
          var computerChoice2 = "N/A"
        if (computerChoice < 0.34) {
            computerChoice2 = "rock"
            var emoji = '🪨'
            //console.log('rock')
        } else if(computerChoice <= 0.67) {
            computerChoice2 = "paper"
            var emoji = '🧻'
            //console.log('paper')
        } else {
            computerChoice2 = "scissors"
            var emoji = '✂️'
            //console.log('scissors')
        }
      //Check for Rock
          if(playerChoice === computerChoice2){
            message.reply({
                  content: emoji + 'We Tied',
            })
        }else{
        if (playerChoice === "rock") {
          if (computerChoice2 === "scissors") {
            //return "Player Wins";
            message.reply({
                  content: emoji + 'You Win',
            })
          } else {
            //return "Computer Wins";
            message.reply({
                  content: emoji + 'I Win',
            })
          }
        } else if (playerChoice === "paper") {
          if (computerChoice2 === "scissors") {
            //return "Computer Wins";
            message.reply({
                  content: emoji + 'I Win',
            })
          } else {
            //return "Player Wins";
            message.reply({
                  content: emoji + 'You Win',
            })
          }
        } else if (playerChoice === "scissors") {
          if (computerChoice2 === "rock") {
            //return "Computer Wins";
            message.reply({
                  content: emoji + 'I Win',
            })
          } else {
              //return "Player Wins";
              message.reply({
                  content: emoji + 'You Win',
            })
          }
        } else {
            message.reply({
                content: 'wtf bro',
            })
        }
        } 
      


  },
} as ICommand