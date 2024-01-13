function counter(n) {
    console.log(n);
    setTimeout(() => {
        counter(n + 1);
    }, 0);
}
counter(0);

setTimeout(() => {
    console.log("Stop!");
    process.exit();
}, 1000);