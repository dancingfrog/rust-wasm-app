use edu::greet;
use rand::Rng;
use door::Door;
use door::CanSeeInside;
use door::CanOpen;

mod door;
mod guessing;

fn main() {
    greet("World");
    
    let mut secret_door = Door::new(false, rand::thread_rng().gen_range(1..100));

    println!("Can you guess the secret number inside the door?");
    
    let mut first_guess = String::new();

    match std::io::stdin().read_line(&mut first_guess) {
        Ok(_) => {
            match first_guess.trim().parse() {
                Ok(guess) => {
                    println!("Lets open the door to confirm if your guess is correct...");

                    secret_door.open();

                    match secret_door.look_inside() {
                        Some(result) => {
                            // Play the guessing game
                            guessing::game(&result, &guess);
                            println!("The secret was: {}", result);
                        }
                        _ => {
                            println!("You cannot guess the secret number that is inside.");
                        }
                    }
                }
                Err(_) => {
                    println! ("Your guess must be a number");
                }
            };
        }
        Err(_) => {
            println!("Failed to read line");
        }
    }
    
}
