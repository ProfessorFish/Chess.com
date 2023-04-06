//Code:
let game = await Standard.Game('74459085433')

let moves = Standard.DecodeMoves(game.game.moveList)
console.log(moves)

//Returns:
[
    { from: 'e2', to: 'e4' }, { from: 'c7', to: 'c5' }, { from: 'g1', to: 'f3' },
    { from: 'b8', to: 'c6' }, { from: 'f1', to: 'b5' }, { from: 'e7', to: 'e5' },
    { from: 'e1', to: 'g1' }, { from: 'f8', to: 'd6' }, { from: 'd2', to: 'd4' },
    { from: 'c6', to: 'd4' }, { from: 'b5', to: 'c4' }, { from: 'd6', to: 'c7' },
    { from: 'f3', to: 'g5' }, { from: 'g8', to: 'h6' }, { from: 'b1', to: 'c3' },
    { from: 'e8', to: 'g8' }, { from: 'h2', to: 'h3' }, { from: 'g8', to: 'h8' },
    { from: 'a2', to: 'a4' }, { from: 'f7', to: 'f6' }, { from: 'g5', to: 'f3' },
    { from: 'h6', to: 'g8' }, { from: 'c3', to: 'd5' }, { from: 'g8', to: 'e7' },
    { from: 'c2', to: 'c3' }, { from: 'd4', to: 'f3' }, { from: 'd1', to: 'f3' },
    { from: 'b7', to: 'b6' }, { from: 'f1', to: 'd1' }, { from: 'c8', to: 'b7' },
    { from: 'c1', to: 'e3' }, { from: 'd7', to: 'd6' }, { from: 'f3', to: 'g4' },
    { from: 'a8', to: 'b8' }, { from: 'b2', to: 'b4' }, { from: 'b7', to: 'c8' },
    { from: 'g4', to: 'e2' }, { from: 'e7', to: 'd5' }, { from: 'c4', to: 'd5' },
    { from: 'd8', to: 'e7' }, { from: 'e2', to: 'c4' }, { from: 'f6', to: 'f5' },
    { from: 'e4', to: 'f5' }, { from: 'c8', to: 'f5' }, { from: 'a1', to: 'a2' },
    { from: 'f5', to: 'c8' }, { from: 'a2', to: 'd2' }, { from: 'a7', to: 'a6' },
    { from: 'c4', to: 'e2' }, { from: 'a6', to: 'a5' }, { from: 'd2', to: 'b2' },
    { from: 'c8', to: 'd7' }, { from: 'd1', to: 'a1' }, { from: 'f8', to: 'c8' },
    { from: 'e2', to: 'd3' }, { from: 'd7', to: 'e8' }, { from: 'd3', to: 'c4' },
    { from: 'b6', to: 'b5' }, { from: 'a4', to: 'b5' }, { from: 'b8', to: 'b5' },
    { from: 'c4', to: 'g4' }, { from: 'c8', to: 'b8' }, { from: 'd5', to: 'c4' },
    { from: 'b5', to: 'b7' }, { from: 'c4', to: 'd5' }, { from: 'b7', to: 'a7' },
    { from: 'g4', to: 'e2' }, { from: 'a5', to: 'a4' }, { from: 'b4', to: 'b5' },
    { from: 'e8', to: 'f7' }, { from: 'e2', to: 'c4' }, { from: 'f7', to: 'd5' },
    { from: 'c4', to: 'd5' }, { from: 'a4', to: 'a3' }, { from: 'b2', to: 'b3' },
    { from: 'e7', to: 'f8' }, { from: 'c3', to: 'c4' }, { from: 'a3', to: 'a2' },
    { from: 'b3', to: 'b2' }, { from: 'f8', to: 'g8' }, { from: 'd5', to: 'g8' },
    { from: 'h8', to: 'g8' }, { from: 'b2', to: 'a2' }, { from: 'a7', to: 'a2' },
    { from: 'a1', to: 'a2' }, { from: 'd6', to: 'd5' }, { from: 'c4', to: 'd5' },
    { from: 'b8', to: 'b5' }, { from: 'a2', to: 'a8' }, { from: 'c7', to: 'b8' },
    { from: 'e3', to: 'c5' }, { from: 'g8', to: 'f7' }, { from: 'c5', to: 'a3' },
    { from: 'e5', to: 'e4' }, { from: 'g2', to: 'g4' }, { from: 'h7', to: 'h5' },
    { from: 'g4', to: 'h5' }, { from: 'b8', to: 'e5' }, { from: 'a8', to: 'f8' }
  ]