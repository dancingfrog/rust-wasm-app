pub struct Door {
    is_open: bool,
    inside: Option<i32>
}

impl Door {
    pub fn new(is_open: bool, inside: i32) -> Door {
        Door { is_open: is_open || false, inside: Some(inside) }
    }
}

pub trait CanOpen {
    fn open(&mut self);
    fn close(&mut self);
}

impl CanOpen for Door {
    fn open(&mut self) {
        self.is_open = true;
    }
    fn close(&mut self) {
        self.is_open = false;
    }
}

pub trait CanSeeInside {
    fn look_inside(&mut self) -> Option<i32>;
}

impl CanSeeInside for Door {
    fn look_inside(&mut self) -> Option<i32> {
        if self.is_open == true {
            self.inside
        } else {
            println!("The door is closed.");
            None
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    
    #[test]
    fn init_door() {
        let closed_door = Door::new(false, 1);
        // Check initial open state of door
        assert!(!closed_door.is_open);
        
        let open_door = Door::new(true, 1);
        // Check initial open state of door
        assert!(open_door.is_open);
        
        // Check inside door
        assert_eq!(closed_door.inside, Some(1));
        assert_eq!(open_door.inside, Some(1));
    }
    
    #[test]
    fn open_door() {
        let mut closed_door = Door::new(false, 1);
        // Open a closed door
        closed_door.open();
        assert!(closed_door.is_open);
    }
    
    #[test]
    fn close_door() {
        let mut open_door = Door::new(true, 1);
        // Open a closed door
        open_door.close();
        assert!(!open_door.is_open);
    }
}
