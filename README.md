
# Cute:bot Car Package

![](/image.png/)

This library is designed to drive Cruise, You can get Cruise here.

http://www.alsrobot.cn/goods-883.html
## Code Example
```JavaScript

basic.showLeds(`
    # . . . #
    # . . # #
    # # . # #
    # . # . #
    # . # . #
    `)
let strip = neopixel.create(DigitalPin.P15, 24, NeoPixelMode.RGB)
strip.showRainbow(1, 360)
basic.showIcon(IconNames.Heart)
basic.forever(function () {
    MiniCruise.motorRun(500, 500, 2)
    basic.pause(2000)
    MiniCruise.motorRun(500, 500, 2)
    basic.pause(2000)
})
basic.forever(function () {
    strip.shift(1)
    basic.pause(100)
    strip.show()
})

```
## Supported targets
for PXT/microbit

## License
MIT
