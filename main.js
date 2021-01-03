
'use strict'

import minimist from "minimist";
import fs from 'fs';

const args = minimist(process.argv);

// command manual

if (Object.keys(args).length < 2) {
    const commandmanual = fs.readFileSync('commandmanual.txt', 'utf-8');
    console.log(commandmanual);
  };

  // listing tasks -l

if (args.l) {
    const content = fs.readFileSync('todotask.txt', 'utf-8');
    if (content.length === 0) {
        console.log('Nincs mára tennivalód! :)');
    }
    else {   
        const tasktodos = content.split('\n');
        tasktodos.forEach((tasktodo, i) => {
            if (tasktodo[0] === '/') {
            tasktodo = tasktodo.slice(1);
            }
        console.log(`${i + 1} - ${tasktodo}`);
    });
  }
};

// add new task -a 

function addTodo(tasktodo) {
	const content = fs.readFileSync('todotask.txt', 'utf-8');
	if (content.length === 0) {
		fs.appendFileSync('todotask.txt', tasktodo);
	} else {
		fs.appendFileSync('todotask.txt', '\n' + tasktodo);
	}
};

if (args.a) {
    console.log('Nem lehetséges új feladat hozzáadása: nincs megadva a feladat!');
} else if (typeof args.a === 'string') {
    addTodo(args.a);
};

// remove task -r number

function removeTodoTask(index) {
	const content = fs.readFileSync('todotask.txt', 'utf-8');
    const splitContent = content.split('\n');

	splitContent.splice(index - 1, 1);
	const newContent = splitContent.join('\n');
    fs.writeFileSync('todotask.txt', newContent);
    
    if (index > splitContent.length) {
        console.log('Nem lehetséges az eltávolítás: túlindexelési probléma adódott!');
    }
};

if (typeof args.r === 'number') {
    removeTodoTask(args.r);
} else if (typeof args.r === 'string') {
    console.log('Nem lehetséges a feladat végrehajtása: a megadott index nem szám!');
} else if (args.r) {
    console.log('Nem lehetséges az eltávolítás: nem adott meg indexet!');
} 