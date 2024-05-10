#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";


class Student{
    
    id : string;
    name : String;
    fname : string;
    courses : String[];
    balance : number;

    constructor(name : string,fname: string){
        this.id = this.id_generator()
        this.name = name;
        this.fname= fname; 
        this.courses = [];
        this.balance = 0;
    }

    id_generator(){
        return Math.floor((Math.random() * 40000) + 1).toString()
    }
    

    enroll_course(course : string){
        this.courses.push(course);

    }
    view_balance(){
        console.log(chalk.italic.magenta(`\n\tBalance For ${this.name.toUpperCase()} Is: $${this.balance}\n`));
        
    }
    pay_fees(amount : number){
        if(amount > this.balance){
         let change = amount - this.balance
         let paid = amount - change 
         console.log(chalk.italic.green(`\n\t\tYour Paid Amount  Is : $${paid}\n`));
         console.log(chalk.italic.rgb(78,90,654)(`\n\t\tYou Have Paid Extra Amount Please Take Your Change $${change}\n`));
        this.balance -= paid
        }else{
        this.balance -=  amount

        console.log(chalk.italic.cyan(`\n\t\t$${amount} Fees Paid Successfully of  ${this.name.toUpperCase()}\n`));
        console.log(chalk.italic.green(`\n\t\tYour Remaining Balance Is : $${this.balance}\n`));
        }

        
        
    }
    show_status(){
        console.log(chalk.bold.rgb(222, 173, 237)(`ID: ${this.id}`));
        console.log(chalk.bold.rgb(222, 173, 237)(`NAME: ${this.name.toUpperCase()}`));
        console.log(chalk.bold.rgb(222, 173, 237)(`FATHER NAME : ${this.fname.toUpperCase()}`));
        console.log(chalk.bold.rgb(222, 173, 237)(`COURSES: ${this.courses}`));
        console.log(chalk.bold.rgb(222, 173, 237)(`BALANCE: $${this.balance} `));
        
    }
};
class Student_manager{
    students: Student[]

    constructor(){
        this.students = [];
    }
    add_student(name : string,f_name:string){
        let student_name = new Student(name ,f_name);
        this.students.push(student_name);
        console.log(chalk.italic.rgb(456,98,345)(`\n\tStudent ID  is ${student_name.id} . \n\tStudent ${name.toUpperCase()} Added Successfully\n`));
    }
   
    enroll_student(std_id : string, course : string){
        let add_std = this.find_student(std_id)
        if(add_std){
            add_std.enroll_course(course)
            console.log(chalk.italic.rgb(95,876,100)(`\n\t${add_std.name.toUpperCase()} Enrolled In ${course} Successfully\n`)); 
            if(course){
               add_std.balance += 100
            }

        }else{
            console.log("\n\tStudent Not Found .Please Enter A Correct Student ID\n");
            
        }
    }

    view_std_balance(std_id : string){
        let std_balance = this.find_student(std_id)
        if(std_balance){
            std_balance.view_balance();
        }
        else{
            console.log(chalk.bold.italic.red("\n\t\tStudent Not Found......Please Enter A Correct Student ID\n"));
            
        }

    }

    pay_std_fees(std_id : string, amount : number){
        let std_fees = this.find_student(std_id)
        if(std_fees){
            std_fees.pay_fees(amount);
        }
        else{
            console.log(chalk.bold.italic.red("\n\t\tStudent Not Found......Please Enter A Correct Student ID\n"));
        }
    }

    show_std_status(std_id : string){
        let std_status = this.find_student(std_id)
        if(std_status){
            std_status.show_status();
        }else{
            console.log(chalk.bold.italic.red("\n\t\tStudent Not Found......Please Enter A Correct Student ID\n"));
        }
    }

    find_student(std_id : string){
        return this.students.find(std => std.id === std_id )
    }

}

async function main(){
    console.log(chalk.bold.italic.rgb(564,32,908)("\n\t=============================================================\n\t\tWelcome To RIMSHA  Student Management System\n\t=============================================================\n"));

    let std_manager = new Student_manager();

    while(true){
        let answer = await inquirer.prompt([
            {
                name : "Option",
                type : "list",
                message :chalk.bold.rgb(34,57,984)("Select An Option"),
                choices : [
                    "Add Student",
                    "Enroll Student",
                    "View Student Balance",
                    "Pay Fees",
                    "Show Status",
                    "Exit"
                ]
            }
        ]);

        switch(answer.Option){
            case "Add Student" :
                let name_input = await inquirer.prompt([
                   {
                    name : "name",
                    type : "input",
                    message :chalk.bold.rgb(89,42,16)( "Enter A Student Name") ,
                    validate: (input) => /^[A-Za-z\s]+$/.test(input) ? true : '\n\tplease enter only alphabatical charachter\n'
                   },
                   {
                    name : "fname",
                    type : "input",
                    message :chalk.bold.rgb(89,42,16)( "Enter Your Father Name") ,
                    validate: (input) => /^[A-Za-z\s]+$/.test(input) ? true : '\n\tplease enter only alphabatical charachter\n'
                   }
               ]);
               std_manager.add_student(name_input.name,name_input.fname);
               break;

              case "Enroll Student" :
                   let course_input = await inquirer.prompt([

                      {
                        name : "student_ID",
                        type : "input",
                        message :chalk.bold.rgb(86,90,31)( "Enter A Student ID"),
                        validate: (input) => /^\d+$/.test(input) ? true : '\n\tplease enter only numerial didgits\n'
                      
                      },
                      {
                        name : "course",
                        type : "input",
                        message :chalk.bold.rgb(96,32,765)( "Enter Your Course Name"),
                        validate: (input) => /^[A-Za-z\s]+$/.test(input) ? true : '\n\tplease enter only alphabatical charachter\n'

                      }

                   ]);
                   std_manager.enroll_student(course_input.student_ID, course_input.course);
                   break;

                case "View Student Balance" :
                    let balance_input = await inquirer.prompt([

                        {
                               name : "student_ID",
                               type : "input",
                               message :chalk.bold.rgb(86,90,31)( "Enter A Student ID"),
                               validate : (input)=>{
                                if(/^\d+$/.test(input)){
                                    return true
                                }
                                else{
                                   return "\n\tERROR.....Please Enter Numerical Didgits\n"
                                    
                                }
                               }
                        }

                    ]);
                    std_manager.view_std_balance(balance_input.student_ID);
                    break;

                case "Pay Fees" :
                    let fees_input = await inquirer.prompt([

                       {
                            name : "student_ID",
                            type : "input",
                            message :chalk.bold.rgb(86,90,31)( "Enter A Student ID"),
                            validate : (input)=>{
                                if(/^\d+$/.test(input)){
                                    return true
                                }
                                else{
                                    return"\n\tERROR.....Please Enter Numerical Didgits\n";
                                    
                                }
                               }
                       },
                       {
                            name : "amount",
                            type : "input",
                            message :chalk.bold.rgb(132,908,65)( "Enter The Amount To Pay"),
                            validate : (input)=>{
                                if(/^\d+$/.test(input)){
                                    return true
                                }
                                else{
                                    return"\n\tERROR.....Please Enter Numerical Didgits\n"
                                    
                                }
                               } 
                       }

                    ]);
                    std_manager.pay_std_fees(fees_input.student_ID, fees_input.amount);
                    break;

                case "Show Status" :
                    let Status_input = await inquirer.prompt([

                        {
                            name : "student_ID",
                            type : "input",
                             message :chalk.bold.rgb(86,90,31)( "Enter A Student ID"),
                             validate : (input)=>{
                                if(/^\d+$/.test(input)){
                                    return true
                                }
                                else{
                                    return"\n\tERROR.....Please Enter Numerical Didgits\n";
                                    
                                }
                               }
                        }
                     ]);
                     std_manager.show_std_status(Status_input.student_ID);
                     break;
                                
                case "Exit" :
                    console.log(chalk.bold.italic.rgb(900,563,211)("\n\t\tTHANK YOU FOR UTILIZING MY STUDENT MANAGEMENT SYESTEM .... I HOPE YOU LIKE IT..!!!!\n "));
                     process.exit();
        }
    }
        
}

main();