#[derive(Debug, Copy, Clone, PartialEq)]
pub enum PieceColor {
    White,
    Black
}

#[derive(Debug, Copy, Clone, PartialEq)]
pub struct GamePiece {
    pub color: PieceColor,
    pub crowned: bool
}

impl GamePiece {
    pub fn new(color: PieceColor) -> GamePiece {
        GamePiece {
            color,
            crowned: false
        }
    }

    pub fn crowned(p: GamePiece) -> GamePiece {
        GamePiece {
            color: p.color,
            crowned: true
        }
    }
}

#[derive(Debug, Copy, Clone, PartialEq)]
pub struct Coordinate(pub usize, pub usize);

impl Coordinate {
    pub fn on_board(self) -> bool {
        let Coordinate(x, y) = self;
        x <= 7 && y <= 7
    }
}

#[derive(Debug, Copy, Clone, PartialEq)]
pub struct Move {
    pub from: Coordinate,
    pub to: Coordinate
}

impl Move {
    pub fn new(from: (usize, usize), to: (usize, usize)) -> Move {
        Move {
            from: Coordinate(from.0, from.1),
            to: Coordinate(to.0, to.1)
        }
    }
}
