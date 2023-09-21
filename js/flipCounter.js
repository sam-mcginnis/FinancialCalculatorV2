var element = document.querySelector('#tick1');
var tick = Tick.DOM.create(element, {
    value: {
        month: "Month",
        year: "Year"
    },
    didInit: function(tick) {
    }
});