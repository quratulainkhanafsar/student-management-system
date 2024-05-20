#! /usr/bin/env node

import inquirer from "inquirer";

class student{
    static counter = 10000
    idcard: number;
    name: string;
    courses: string[];
    balance: number;

constructor(name: string){
    this.idcard = student.counter++;
    this.name = name;
    this.courses = []; // initialize an empty array for courses.
    this.balance = 100;

}
// method to enroll a student in a course.
enroll_course(course: string){
    this.courses.push(course);
}

// method to view a student balance.
view_balance(){
    console.log(`Balance for ${this.name} : ${this.balance}`);
}

// method to pay student fees.
pay_fees(amount: number){
    this.balance -= amount;
    console.log(` ${amount} fees paid successfully for ${this.name}`);
}

// method to display student status.
show_status(){
  console.log(`ID: ${this.idcard}`);
  console.log(`Name: ${this.name}`);
  console.log(`Courses: ${this.courses}`);
  console.log(`Balance: ${this.balance}`);

}
}

// defining a student manager class to manage students.
class student_managers{
    student: student[]

    constructor(){
        this.student = [];
    }

// method to add a student in a course.
add_student(name: string ){
   let students = new student(name);
   this.student.push(students);
   console.log(`Student: ${name} added successfully. Student ID: ${students.idcard}`);
}

// method to enroll a student in a course.
enroll_student(student_id: number, course: string){
    let student = this.student.find(std => std.idcard === student_id);
    if (student){
        student.enroll_course(course);
        console.log(`${student.name} enrolled in ${course} successfully.`);
    }
}

// method to view a student balance.
view_student_balance(student_id: number){
    let student = this.find_student(student_id);
    if(student){
        student.view_balance();
    }
    else{
       console.log("student not found! please enter a correct student ID.");
        
    }
}

// method to pay student fees.
pay_fees(student_id:number,amount:number){
    let student = this.find_student(student_id);
    if(student){
        student.pay_fees(amount);
    }
    else{
        console.log("student not found. please enter a correct student ID.");
        
    }
}

// method to display student status.
show_student_status(student_id: number){
    let student = this.find_student(student_id);
    if(student){
        student.show_status();
    }
}

// method to find a student by student id.
find_student(student_id: number){
    return this.student.find(std => std.idcard === student_id);

}
}

// main function to run the program.
async function main(){
    console.log("Welcome to student management system");
    console.log(",".repeat(50));

   let student_manager = new student_managers();
    
   // while loop to keep program running.
   while (true) {
    let choices = await inquirer.prompt([
        {
            name: "choices",
            type: "list",
            message: "select an option",
            choices:[
                "Add Student",
                "Enroll Student",
                "View Student Balance",
                "Pay Fees",
                "Show Student",
                "Exit"
                
        ]
    }
]);

// using switch case to handle user choice.
switch (choices.choices) {
    case "Add Student":
        let name_input = await inquirer.prompt([
            {
                name: "name",
                type: "input",
                message: "Enter a student name",

        }
    ]);
    student_manager.add_student(name_input.name)
        break;

        case "Enroll Student":
            let course_input = await inquirer.prompt([
                {
                    name: "student_id",
                    type: "number",
                    message: "Enter a student ID",
            },
            {
                name: "course",
                type: "input",
                message: "Enter a course name",
                

            }
        ]);

student_manager.enroll_student(course_input.student_id, course_input.course);
break;

case"View Student Balance":
let balance_input = await inquirer.prompt([
    { 
        name: "student_id",
        type: "number",
        message: "Enter a student ID",
    }
]);

student_manager.view_student_balance(balance_input.student_id);
break;

case "Pay Fees":
let fees_input = await inquirer.prompt([
    {
        name: "student_id",
        type: "number",
        message: "Enter a student ID",
    },
    
    {
        name: "amount",
        type: "number",
        message: "Enter the amount to pay",
        
    }
]);
student_manager.pay_fees(fees_input.student_id, fees_input.amount);
break;

case "Show Student":
let status_input = await inquirer.prompt([
    {
        name: "student_id",
        type: "number",
        message: "Enter a student ID",
    }
]);
student_manager.show_student_status(status_input.student_id);
break;

case "Exit":
    console.log("Exiting...");
    process.exit();
}
    }
}

// calling a main function
main();





