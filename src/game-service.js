import { Request } from 'node-fetch';
import { fromPromise } from "rxjs/internal-compatibility";
import { mergeMap, map, switchMap } from "rxjs/operators";
import {Observable} from "rxjs";

function get(url) {
    return fromPromise(fetch(new Request(url)))
        .pipe(map(res =>{
            if ((`${res.status}`).match(/^(?:[4|5])/) !== null) {
                throw res; // abort
            }
            return res;
        }))
        .pipe(switchMap(async response => {
            // console.log(response);
            
            if (typeof response['arrayBuffer'] === 'function') {
                return (await response.arrayBuffer());
                
            } else if (typeof response['blob'] === 'function') {
                return (await response.blob());
                
            } else if (typeof response['json'] === 'function') {
                return (await response.json());
                
            } else {
                return (await response.text());
            }
        }));
}

function instantiateWebAssembly (bytes) {
    // console.log(typeof bytes);

    return WebAssembly.instantiate(bytes, {
        env: {
            notify_piecemoved: (fX, fY, tX, tY) => {
                console.log("A piece moved from (" + fX + "," + fY +
                    ") to (" + tX + "," + tY + ")");

                console.log("     ┌ ── ┐    ┌ ── ┐    ┌ ── ┐    ┌ ── ┐");
                console.log("     │ □□ │    │ □□ │    │ □□ │    │ □□ │");
                console.log("┌ ── ┼ ── ┼ ── ┼ ── ┼ ── ┼ ── ┼ ── ┼ ── ┘");
                console.log("│ □□ │    │ □□ │    │ □□ │    │ □□ │");
                console.log("└ ── ┼ ── ┼ ── ┼ ── ┼ ── ┼ ── ┼ ── ┼ ── ┐");
                console.log("     │ □□ │    │ □□ │    │ □□ │    │ □□ │");
                console.log("┌ ── ┼ ── ┼ ── ┼ ── ┼ ── ┼ ── ┼ ── ┼ ── ┘");
                console.log("│    │    │    │    │    │    │    │");
                console.log("└ ── ┼ ── ┼ ── ┼ ── ┼ ── ┼ ── ┼ ── ┼ ── ┐");
                console.log("     │    │    │    │    │    │    │    │");
                console.log("┌ ── ┼ ── ┼ ── ┼ ── ┼ ── ┼ ── ┼ ── ┼ ── ┘");
                console.log("│ ■■ │    │ ■■ │    │ ■■ │    │ ■■ │");
                console.log("└ ── ┼ ── ┼ ── ┼ ── ┼ ── ┼ ── ┼ ── ┼ ── ┐");
                console.log("     │ ■■ │    │ ■■ │    │ ■■ │    │ ■■ │");
                console.log("┌ ── ┼ ── ┼ ── ┼ ── ┼ ── ┼ ── ┼ ── ┼ ── ┘");
                console.log("│ ■■ │    │ ■■ │    │ ■■ │    │ ■■ │");
                console.log("└ ── ┘    └ ── ┘    └ ── ┘    └ ── ┘");
            },
            notify_piececrowned: (x, y) => {
                console.log("A piece was crowned at (" + x + "," + y + ")");
            }
        },
    });
}

function demoCheckersFunctions (checkersFunctions) {
    console.log("At start, current turn is " + checkersFunctions.get_current_turn());

    let piece = checkersFunctions.get_piece(0, 7);
    console.log("Piece at 0,7 is " + piece);

    let res = checkersFunctions.move_piece(0, 5, 1, 4); // B
    console.log("First move result: " + res);

    console.log("Turn after move: " + checkersFunctions.get_current_turn());

    let bad = checkersFunctions.move_piece(1, 4, 2, 3); // illegal move
    console.log("Illegal move result: " + bad);
    console.log("Turn after illegal move: " + checkersFunctions.get_current_turn());
}

const wasm = get('wasm_rusty_checkers.wasm').pipe(map(instantiateWebAssembly));

// Main
export let onmessage = function(evt) {
    console.log(evt.data);

    if ("action" in evt.data) {
        console.log("Worker is handling action...");
        
        wasm//.subscribe(console.log);
            .subscribe({
                next(wasm_promise) {
                    wasm_promise.then(results => demoCheckersFunctions(results.instance.exports));
                },
                error(err) { console.error(err); },
                complete() {
                    console.log("Worker has completed.");
                }
            });
    }
};

export let onmessageerror = null;

export let onerror = null;
