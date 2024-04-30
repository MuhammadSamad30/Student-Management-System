#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

console.log();
console.log(chalk.yellowBright("                        Welcome To The Student Management System App From Muhammad Samad"));
console.log();

let rollNumber: number = 10000 + Math.floor(Math.random() * 90000);

let answer = await inquirer.prompt(
    [
        {
            name: "student",
            type: "input",
            message: chalk.yellowBright("Enter your name: "),
            validate: function (value) {
                if (value.trim() !== "") {
                    return true;
                } else{
                    return chalk.redBright("Enter a non-empty value!")
                }
                }
        },        
        {
            name: "course",
            type: "list",
            message: chalk.yellowBright("Select your course: "),
            choices: ["Web Development", "App Development", "UI/UX", "Front-end", "Back-end", "Fullstack"]
        }
    ]);

    let courseFees: {[key: string]: number} = {
        "Web Development": 12000,
        "App Development": 18000,
        "UI/UX": 15000,
        "Front-end": 8000,
        "Back-end": 10000,
        "Fullstack": 25000
    };

    console.log(`\nCourse Fees: ${courseFees[answer.course]}/-\n`);
    
    let paymentMethod = await inquirer.prompt(
        [
            {
                name: "payment",
                type: "list",
                message: chalk.yellowBright("Select payment method: "),
                choices: ["EasyPaisa", "JazzCash", "Paytm",]
            },
            {
                name: "amount",
                type: "input",
                message: chalk.yellowBright("Enter amount to Transfer: "),
                validate: function (value) {
                    if(value.trim() !== ""){
                        return true
                    }
                    return chalk.redBright("Enter a non-empty value!")
                },
            }
        ]);

        console.log(`\nYou select method to pay ${paymentMethod.payment}\n`);
        
        let courseFee = courseFees[answer.course];
        let paymentCost = parseFloat(paymentMethod.amount);

        if (courseFee === paymentCost) {
            console.log(`You successfully purchased ${answer.course}\n`);
        } else {
            console.log(chalk.redBright("Payment amount does not match the course fee. Purchase unsuccessful.\n"));
        }

    if (answer.purchase) {
        console.log(`Name: ${answer.student} Roll Number: ${rollNumber} Course: ${answer.course}`);
    };

    let nextStep = await inquirer.prompt(
        [
            {
                name: "next",
                type: "list",
                message: chalk.yellowBright("What would you like to do next? "),
                choices: ["See profile", "Exit"]
            }
        ]
    );

    if(nextStep.next === "See profile"){
        console.log(`\nName: ${answer.student}\nRoll Number: ${rollNumber}\nCourse: ${answer.course}\nPayment method: ${paymentMethod.payment}`);       
    }else{
        console.log(chalk.greenBright("Exiting program...")); 
        console.log(chalk.greenBright("                                  Thanks For Using This App"));
        console.log();    
    }
