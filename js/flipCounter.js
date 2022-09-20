var element = document.querySelector('#tick1');
var tick = Tick.DOM.create(element, {
    value: {
        month: "Month",
        year: 2000
    },
    didInit: function(tick) {
        console.log('hello!');
    }
});