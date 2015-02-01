/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
var Vector2 = require('vector2');
var ajax = require('ajax');
var light_toggle = "";

var main = new UI.Card({
    title: 'Homey',
    icon: 'images/logo.png',
    subtitle: 'Welcome my homey!',
    body: 'Press center button'
});

main.show();

main.on('click', 'select', function(e) {
    var menu = new UI.Menu({
        sections: [{
            items: [{
                title: 'Temperature',
                icon: 'images/temperature_final.png',
                subtitle: ''
            }, {
                title: 'Lights',
                icon: 'images/lightbulb_final.png',
                subtitle: ''
            }, {
                title: 'Sound',
                icon: 'images/sound_final.png',
                subtitle: ''
            }]
        }]
    });
    menu.on('select', function(e) {
        switch (e.itemIndex) {
            case 0:
                ajax({
                        url: 'http://142.1.249.219:8080/api/temperature',
                        type: 'json'
                    },
                    function(data) {
                        var temp = data.temperature;
                        var wind = new UI.Window();
                        var textfield = new UI.Text({
                            position: new Vector2(0, 50),
                            size: new Vector2(144, 30),
                            font: 'gothic-24-bold',
                            text: temp + "\xB0 C",
                            textAlign: 'center'
                        });
                        wind.add(textfield);



                        wind.show();
                    },
                    function(error) {
                        console.log('The ajax request failed: ' + error);
                    });
                break;
            case 1:
                ajax({
                        url: 'http://142.1.249.219:8080/api/light',
                        method: 'get',
                        type: 'json'
                    },
                    function(data) {
                        var light = data.light,
                            wind = new UI.Window();


                        light_toggle = parseInt(light) < 10 ? "0" : "1";
                        var element = new UI.Image({"image": light_toggle == "0" ? "images/lightoff.png" : "images/lighton.png"});
                        wind.on('click', 'select', function(e) {
                            ajax({
                                    url: 'http://142.1.249.219:8080/api/light',
                                    type: 'json',
                                    method: 'post',
                                    data: {"toggle": light_toggle},
                                    crossDomain: true
                                },
                                function(data) {
                                    if (light_toggle == "0") {
                                        light_toggle = "1";
                                        element.image('images/lightoff.png');
                                    }
                                    else {
                                        light_toggle = "0";
                                        element.image('images/lighton.png');
                                    }
                                },
                                function(error) {
                                    console.log('The ajax request failed: ' + error);
                                });
                        });

                        wind.add(element);
                        wind.show();
                    },
                    function(error) {
                        console.log('The ajax request failed: ' + error);
                    });
                break;
            case 2:
                ajax({
                        url: 'http://142.1.249.219:8080/api/sound',
                        type: 'json'
                    },
                    function(data) {
                        var sound = parseInt(data.sound),
                            wind = new UI.Window(),
                            element = new UI.Image({"image":"images/sound1.png"});

                        if (sound < 50) element.image("images/sound0.png");
                        else if (sound < 100) element.image("images/sound1.png");
                        else if (sound < 150) element.image("images/sound2.png");
                        else if (sound < 200) element.image("images/sound3.png");
                        else element.image("images/sound4.png");

                        wind.add(element);
                        wind.show();
                    },
                    function(error) {
                        console.log('The ajax request failed: ' + error);
                    });
                break;
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