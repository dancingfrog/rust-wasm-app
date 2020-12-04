import { Request } from 'node-fetch';
import { fromPromise } from "rxjs/internal-compatibility";
import { mergeMap, map, switchMap } from "rxjs/operators";

var fetched = false;

function get(url) {
    return fromPromise(fetch(new Request(url)))
    .pipe(map(res =>{
        if ((`${res.status}`).match(/^(?:[4|5])/) !== null) {
            throw res; // abort
        }
        return res;
    }))
    .pipe(switchMap(response => {
        if (typeof response['json'] === 'function') {
            const res = response;
            return fromPromise(res.json());
        } else {
            return response;
        }
    }));
}

// Main
export let onmessage = function(evt) {
    const position_events = [];
    const problem_events = [];

    console.log(evt.data);

    if (!fetched && "action" in evt.data) {
        console.log("Worker is handling action...");
        console.log(evt.data["action"]);
        console.log(evt.data["payload"]);

        get("./primaryResource.json").pipe(
            map(response => {
                return response;
            }),
            mergeMap(primaryResponse => {
                console.log(primaryResponse);
                return get("./secondaryResource.json");
            })
        )
        .subscribe({
            next(secondaryResponse) {
                console.log(secondaryResponse);
            },
            error(err) { console.error(err); },
            complete() { console.log("Worker has completed primary and secondary fetch"); }
        });
    }
};

export let onmessageerror = null;

export let onerror = null;
