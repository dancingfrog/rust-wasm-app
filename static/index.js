(function () {
    if (window.Worker) {

        const processor = new Worker('game-service.js');

        processor.postMessage({
            "action": "test",
            "payload": [
                "Test game service worker"
            ]
        });

        processor.onmessage = function (evt) {
            console.log("Worker callback: ", evt);
        }
    }
})();