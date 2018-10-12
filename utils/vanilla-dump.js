function dump (o) {
    if (arguments.length <= 1) {
        console.log(o);
        return;
    }

    console.log(Array.apply(null, arguments));
}
