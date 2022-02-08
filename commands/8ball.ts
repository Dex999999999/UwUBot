import { ICommand } from "wokcommands";

const answers = [
	'Maybe.',
	'Certainly not.',
	'I hope so.',
	'Not in your wildest dreams.',
	'There is a good chance.',
	'Quite likely.',
	'I think so.',
	'I hope not.',
	'I hope so.',
	'Never!',
	'Fuhgeddaboudit.',
	'Ahaha! Really?!?',
	'Pfft.',
	'Sorry, bucko.',
	'Hell, yes.',
	'Hell to the no.',
	'The future is bleak.',
	'The future is uncertain.',
	'I would rather not say.',
	'Who cares?',
	'Possibly.',
	'Never, ever, ever.',
	'There is a small chance.',
	'Yes!'
];

export default {
    category: 'Random',
    description: 'Determines the answer 🔮',

    slash: 'both',
    testOnly: false,
    
    expectedArgs: '<question>',
    

    callback: ({message, args}) => {
        if(args.length > 0) return `🎱 ${answers[Math.floor(Math.random() * answers.length)]}` 
        else return 'you need to ask a question'
    }, 
} as ICommand