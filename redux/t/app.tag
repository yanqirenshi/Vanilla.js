<app>
    <h1 class="title is-1">TEST Simple-Redux</h1>

    <section class="section">
        <div class="container">
            <h2 class="title is-2">Simple Test</h2>
            <p>{this.test1}</p>
            <button onclick={onClickSimpeTest}>test!</button>
        </div>
    </section>

    <script>
     this.test1 = STORE.state().test.simple;

     this.onClickSimpeTest = function () {
         STORE.dispatch(ACTIONS.testSimple('do! simple-test'));
     };

     STORE.subscribe(function (action) {
         console.log(STORE.state().test);
         this.test1 = STORE.state().test.simple;
         this.update();
     }.bind(this));

    </script>
</app>
