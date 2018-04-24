

AFRAME.registerComponent('my-test-component', {
    tick: function () {
      var text = this.text;
      text.setAttribute("survey", {value: Survey});
    }
  });