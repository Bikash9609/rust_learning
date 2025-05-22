use std::fmt;
use std::io;

enum Status {
    Completed,
    InProgress,
}

impl fmt::Display for Status {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        match self {
            Status::Completed => {
                write!(f, "Completed")
            }
            Status::InProgress => {
                write!(f, "In-Progress")
            }
        }
    }
}

enum Action {
    List,
    Add { description: String },
    Remove { index: usize },
    Update { index: usize, status: Status },
}

struct Task {
    id: usize,
    description: String,
    status: Status,
}

struct Todo {
    list: Vec<Task>,
    task_index: usize,
}

impl Todo {
    fn new() -> Self {
        Todo {
            list: Vec::new(),
            task_index: 1,
        }
    }

    fn increment_id(&mut self) {
        self.task_index += 1
    }

    fn add(&mut self, description: String) -> &Task {
        let new_task = Task {
            id: self.task_index,
            description,
            status: Status::InProgress,
        };
        self.list.push(new_task);
        self.increment_id();
        self.list
            .last()
            .expect("Task was just pushed but not able to return it!")
    }

    fn remove(&mut self, id: usize) -> Result<(), String> {
        if self.list.len() < 1 || self.list.len() - 1 < id || id == 0 {
            return Err(format!(
                "Invalid task number. Please enter between 1 and {}",
                self.list.len()
            ));
        }
        self.list.remove(id - 1);
        println!("Task removed!");
        Ok(())
    }

    fn update(&mut self, id: usize, update_type: Status) -> &Task {
        let item_to_update = self
            .list
            .iter_mut()
            .find(|task| task.id == id)
            .expect("No such id found");
        item_to_update.status = update_type;
        item_to_update
    }

    fn list(&mut self) -> &Vec<Task> {
        &self.list
    }
}

pub fn init_todo() {
    let mut todo = Todo::new();
    print_welcome();
    loop {
        let mut input = String::new();
        io::stdin()
            .read_line(&mut input)
            .expect("Error parsing command!");

        parse_execute_command(&input, &mut todo);
    }
}

fn print_welcome() {
    print!("\x1Bc");
    println!("Welconme to the TODO app!");
    println!(
        "Commands: add <description>, list, remove <id>, update <id> <new status(d|ip)>, exit"
    );
}

fn print_todo(todo_list: &Todo) {
    print_welcome();
    for task in todo_list.list.iter() {
        println!(
            "Task {} - {} - status is {}",
            task.id, task.description, task.status
        )
    }
}

fn parse_execute_command(input: &str, todo_list: &mut Todo) {
    let inputs: Vec<&str> = input.trim().splitn(2, ' ').collect();

    if inputs.is_empty() {
        panic!("Provided inputs are not valid!")
    }

    match inputs[0].to_lowercase().as_str() {
        "add" => {
            if inputs.len() < 2 {
                panic!("Please pass the task to add <task>");
            }
            todo_list.add(inputs[1].to_string());
            print_todo(todo_list);
        }
        "remove" => {
            if inputs.len() < 2 {
                println!("Usage: remove <id>");
                return;
            }

            match inputs[1].trim().parse::<usize>() {
                Ok(id) => {
                    todo_list.remove(id);
                }
                Err(_) => {
                    println!("Invalid ID. Please enter a number.");
                }
            }

            print_todo(todo_list);
        }
        "update" => {
            if inputs.len() < 2 {
                println!("Usage: update <id> <new status>");
                return;
            }

            let updated_inputs: Vec<&str> = inputs[1].splitn(2, " ").collect();
            if updated_inputs.len() < 2 {
                println!("Usage: update 3 ip");
                return;
            }

            let id = updated_inputs[0].trim().parse::<usize>().unwrap();
            let status = match updated_inputs[1] {
                "d" => Status::Completed,
                "ip" => Status::InProgress,
                _ => Status::InProgress,
            };
            todo_list.update(id, status);
            print_todo(todo_list);
        }
        "list" => print_todo(todo_list),
        "exit" => {
            std::process::exit(0);
        }
        _ => {
            println!("Unkown command abborting!");
        }
    }
}
