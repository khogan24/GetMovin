/**
 * Kevin Hogan, November 2021
 * 
 */

// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

/*maybe make this non-const and allow user to customize colors*/
const decorationType = vscode.window.createTextEditorDecorationType({
	backgroundColor: 'green',
	border: '2px solid white',
  });

  const MIN_IN_MILIS:number = 60000;



// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

export function activate(context: vscode.ExtensionContext) {
	
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "movin" is now active!');
	
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('movin.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from GetMovin!');
	});

	context.subscriptions.push(disposable);

	/* auto start? or make user start it themselves?*/
	/*append new command to command list
	 called it freakout because i wanted to stick it in a while loop to induce an epileptic seizure */
	context.subscriptions.push(
		vscode.commands.registerCommand('movin.freakout',async () => {
			// The code you place here will be executed every time your command is executed
			// Display a message box to the user
			let flag = true;
			let decorationsArray: vscode.DecorationOptions[] = []

			await vscode.window.showInformationMessage(' In 30 mins, get up and strecth','Ok');
			// both of these give analogous results,active gives the one the user is in, visible are all rendered on screen
			// const editor = vscode.window.activeTextEditor; 
			const openEditor = vscode.window.visibleTextEditors[0]

			if(!openEditor)
			{
				return
			}

			// check if there is no selection
			if (openEditor.selection.isEmpty) {
				
				let rng = openEditor.visibleRanges // list of ranges (line,col) currently displayed, scrolling up or down shifts this range
				for(let i = 0; i < rng.length; i++)
				{
					let range = rng[i]
					let decoration = { range } 
					//  ^^^ this var type has a field calld 'range' renaming range here breaks code, using d = {range:x} can work for var x
					decorationsArray.push(decoration)
				}
			}
			// js and ts have no way of knowing if a promise has been fulfilled or not so :
			setTimeout(async () => {//30 mins start here
				openEditor.setDecorations(decorationType,decorationsArray)
				await vscode.window.showInformationMessage('TIME TO MOVE','yes','no');// blocking, so text wont revert untill response
				
				setTimeout(() => {// revert color scheme, does not need to be a timeout here as above line is blocking
					openEditor.setDecorations(decorationType,[])
				}, 200);
			}, 30*MIN_IN_MILIS);

			console.log("done")// this logs once per 'freakout' call
		})
	);
}

// this method is called when your extension is deactivated
export function deactivate() {;}

class foo{
	public readonly bar : vscode.ColorTheme;
	constructor(c: vscode.ColorTheme)
	{
		this.bar = c;
	}
}


/*
	TODO: in no particular order
		1 add color customizations
		2 add 'quiet mode' that just does a popup, no highlighting
		3 add 'snooze'
		4 repeat timer for every 30
		5 add a 'off' setting to prevent further alerts, after 4
		6 add other reminders, ie water, stretches, and eye rest
 */

