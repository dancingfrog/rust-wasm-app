fetch('wasm_rusty_checkers.wasm')
    .then(response => response.arrayBuffer())
    .then(instantiateWebAssembly)
    .then(demoRustyCheckers)
    .catch(console.error);

function instantiateWebAssembly (bytes) {
    return WebAssembly.instantiate(bytes, {
        env: {
            notify_piecemoved: (fX, fY, tX, tY) => {
                console.log("A piece moved from (" + fX + "," + fY +
                    ") to (" + tX + "," + tY + ")");
            },
            notify_piececrowned: (x, y) => {
                console.log("A piece was crowned at (" + x + "," + y + ")");
            }
        },
    });
}

function callWebAssemblyFunction (results) {
    const instance = results.instance;
    console.log(instance);
}

function demoRustyCheckers (results) {
    const instance = results.instance;

    const container = document.querySelector('#container');

    container.appendChild(newTurnElement("At start, current turn is " +
        instance.exports.get_current_turn()));

    let piece = instance.exports.get_piece(0, 7);
    container.appendChild(newTurnElement("Piece at 0,7 is " + piece));

    let res = instance.exports.move_piece(0, 5, 1, 4); // B
    container.appendChild(newTurnElement("First move result: " + res));

    container.appendChild(newTurnElement("Turn after move: " + instance.exports.get_current_turn()));

    let bad = instance.exports.move_piece(1, 4, 2, 3); // illegal move
    container.appendChild(newTurnElement("Illegal move result: " + bad));
    container.appendChild(newTurnElement("Turn after illegal move: " + instance.exports.get_current_turn()));
}

function newTurnElement (turnDescription) {
    const br = document.createElement('br');
    const span = document.createElement('span');
    span.textContent += turnDescription;
    span.appendChild(br);
    return span;
}
