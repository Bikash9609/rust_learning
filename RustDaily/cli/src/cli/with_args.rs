pub fn add() {
    let mut args = std::env::args();
    // Skip the first item
    args.next();

    if args.len() < 3 {
        panic!("Please pass 2 or more args!");
    }
    let mut sum: f32 = f32::from(0.0);
    for arg in args {
        sum += arg.trim().parse::<f32>().expect("Error parsing arg");
    }
    println!("Sum of the values are: {}", sum)
}
