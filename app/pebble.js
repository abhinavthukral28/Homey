/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
var Vector2 = require('vector2');
var ajax = require('ajax');

var main = new UI.Card({
  title: 'Pebble.js',
  icon: 'images/menu_icon.png',
  subtitle: 'Welcome to Edison Monitor',
  body: 'Press center button'
});

main.show();

main.on('click', 'select', function(e) {
  var menu = new UI.Menu({
    sections: [{
      items: [{
        title: 'Temperature',
        icon: 'images/menu_icon.png',
        subtitle: ''
      }, {
        title: 'Lights',
        subtitle: ''
      }, {
        title: 'Sound',
        subtitle: ''
      }]
    }]
  });
  menu.on('select', function(e) {
    if (e.item.title == 'Temperature') {
      ajax({
          url: 'http://142.1.249.219:8080/api/allSensor',
          type: 'json'
        },
        function(data) {
          var temp = data.sensor[0].temperature;
          var wind = new UI.Window();
          var textfield = new UI.Text({
            position: new Vector2(0, 50),
            size: new Vector2(144, 30),
            font: 'gothic-24-bold',
            text: temp,
            textAlign: 'center'
          });
          wind.add(textfield);
        },
        function(error) {
          console.log('The ajax request failed: ' + error);
        });
    }
  });
  menu.show();
});

main.on('click', 'down', function(e) {
  var card = new UI.Card();
  card.title('A Card');
  card.subtitle('Is a Window');
  card.body('The simplest window type in Pebble.js.');
  card.show();
});