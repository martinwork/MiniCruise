enum Patrol{
    //% block="□□"
    white_white = 1,
    //% block="□■"
    white_black = 2,
    //% block="■□"
    black_white = 3,
    //% block="■■"
    black_black = 4
}
enum PingUnit {
    //% block="cm"
    Centimeters,
    //% block="μs"
    MicroSeconds
}
enum IRList {
    //% block="FRONT"
    front = 1,
    //% block="LEFT"
    right = 2,
    //% block="RIGHT"
    left = 3
}
enum BeatList {
    //% block="1"
    whole_beat = 10,
    //% block="1/2"
    half_beat = 11,
    //% block="1/4"
    quarter_beat = 12,
    //% block="1/8"
    eighth_beat = 13,
    //% block="2"
    double_beat = 14,
    //% block="4"
    breve_beat = 15
}
enum ToneHzTable {
    do = 262,
    re = 294,
    mi = 330,
    fa = 349,
    sol = 392,
    la = 440,
    si = 494
}
enum ColorList {
    //% block="ORANGE"
    orange = 2,
    //% block="YELLOW"
    yellow = 3,
    //% block="GREEN"
    green = 4,
    //% block="BLUE"
    blue = 5,
    //% block="INDIGO"
    indigo = 6,
    //% block="VIOLET"
    violet = 7,
    //% block="PURPLE"
    purple = 8,
    //% block="WHITE"
    white = 9,
    //% block="BLOCK"
    black = 1
}

//% weight=100 color=#1B80C4 icon=""
namespace MiniCruise {
	//% blockId="mini_cruise_motor" block="Set DC Motor Left Speed%leftSpeed| Right Speed%rightSpeed| for%time"
    //% leftSpeed.min=-1023 leftSpeed.max=1023
    //% rightSpeed.min=-1023 rightSpeed.max=1023
    //% weight=100
    export function motorRun(leftSpeed: number, rightSpeed: number, time: number): void {
        let leftRotation = 1;
        if(leftSpeed < 0){
            leftRotation = 0;
        }
        let rightRotation = 1;
        if(rightSpeed < 0){
            rightRotation = 0;
        }
       //左电机 M1
        pins.analogWritePin(AnalogPin.P14, Math.abs(leftSpeed));
        pins.digitalWritePin(DigitalPin.P13, leftRotation);
        //右电机 M2
        pins.analogWritePin(AnalogPin.P16, Math.abs(rightSpeed));
        pins.digitalWritePin(DigitalPin.P15, rightRotation);
        //添加时间控制
        if(time < 0){
            time = 0;
        }
        let time_num = time*1000000;
        control.waitMicros(time_num);
        //左电机 M1
        pins.analogWritePin(AnalogPin.P14, 0);
        pins.digitalWritePin(DigitalPin.P13, 0);
        //右电机 M2
        pins.analogWritePin(AnalogPin.P16, 0);
        pins.digitalWritePin(DigitalPin.P15, 0);
    }
}
