use std::io;

pub fn hello_name_args() {
    let args: Vec<String> = std::env::args().collect();
    println!("All args {:?}", args)
}

pub fn hello_name_input() {
    let mut name = String::new();
    println!("Please input your name: ");
    io::stdin()
        .read_line(&mut name)
        .expect("Please provide a valid name!");
    println!("Hi {}, How are you there! (used {{}})", name.trim());
    println!("Hi {:?}, How are you there! (used :?)", name.trim());
}

pub fn num_input() {
    let mut input = String::new();
    println!("Write a number input: ");
    io::stdin()
        .read_line(&mut input)
        .expect("Please input a number");
    let number: i32 = input.trim().parse().expect("Error parsing input number!");
    println!("Input number is {}", number)
}
