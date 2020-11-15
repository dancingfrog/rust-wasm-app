fetch('./target/wasm32-unknown-unknown/release/wasm_rusty_checkers.wasm')
    .then(response => response.arrayBuffer())
    .then(instantiateWebAssembly)
    .then(demoCheckersFunctions)
    .catch(e => {
        console.error('Fallback to debug wasm module because:\n' + e);
        fetch('./target/wasm32-unknown-unknown/debug/wasm_rusty_checkers.wasm')
            .then(response => response.arrayBuffer())
            .then(instantiateWebAssembly)
            .then(demoCheckersFunctions)
            .catch(console.error);
    });

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

function demoCheckersFunctions (results) {
    const checkersFunctions = results.instance.exports;

    const container = document.querySelector('#container');

    container.appendChild(newTurnElement("At start, current turn is " +
        checkersFunctions.get_current_turn()));

    let piece = checkersFunctions.get_piece(0, 7);
    container.appendChild(newTurnElement("Piece at 0,7 is " + piece));

    let res = checkersFunctions.move_piece(0, 5, 1, 4); // B
    container.appendChild(newTurnElement("First move result: " + res));

    container.appendChild(newTurnElement("Turn after move: " + checkersFunctions.get_current_turn()));

    let bad = checkersFunctions.move_piece(1, 4, 2, 3); // illegal move
    container.appendChild(newTurnElement("Illegal move result: " + bad));
    container.appendChild(newTurnElement("Turn after illegal move: " + checkersFunctions.get_current_turn()));
}

function newTurnElement (turnDescription) {
    const br = document.createElement('br');
    const span = document.createElement('span');
    span.textContent += turnDescription;
    span.appendChild(br);
    return span;
}
