use std::cmp::Ordering;

pub(crate) fn game(secret: &i32, first_guess: &i32) {
    let mut guess_on_first_try: bool = false;

    match first_guess.cmp(&secret) {
        Ordering::Equal => {
            println!("You guessed it on the first try!");
            guess_on_first_try = true;
        },
        Ordering::Less => {
            println!("Nope, too small. Guess again!");
            // guessing_game(&secret);
        },
        Ordering::Greater => {
            println!("Nope, too big. Guess again!");
            // guessing_game(&secret);
        }
    }
    
    if !guess_on_first_try {
        loop {
            let mut guess = String::new();

            let written = std::io::stdin().read_line(&mut guess);

            written.expect("Failed to read line");

            println!("You guessed: {}", guess);

            let guess: i32 = match guess.trim().parse() {
                Ok(number) => number,
                Err(_) => {
                    println!("Your guess must be a number");
                    continue
                }
            };
            // .expect("Your guess must be a number");

            match guess.cmp(&secret) {
                Ordering::Equal => {
                    println!("You guessed it!");
                    break;
                },
                Ordering::Less => {
                    println!("Nope, too small. Guess again!");
                    // guessing_game(&secret);
                },
                Ordering::Greater => {
                    println!("Nope, too big. Guess again!");
                    // guessing_game(&secret);
                }
            }
        }
    }
}
