enum ToneHzTable {
    do = 262,
    re = 294,
    mi = 330,
    fa = 349,
    sol = 392,
    la = 440,
    si = 494
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
enum Patrol {
    //% block="□□"
    white_white = 1,
    //% block="□■"
    white_black = 2,
    //% block="■□"
    black_white = 3,
    //% block="■■"
    black_black = 4
}

//% weight=100 color=#1B80C4 icon="\uf0e7"
namespace CruiseE {
    export enum PingUnit {
        //% block="cm"
        Centimeters,
        //% block="μs"
        MicroSeconds
    }
    export enum IRList {
        //% block="FRONT"
        front = 2
    }
	export enum PinList {
        //% block="UP"
        up_pull = 1,
        //% block="DOWN"
        down_pull = 2,
        //% block="NONE"
        no_pull = 3
    }
    export enum RgbList {
        //% block="ALL"
        rgb = 9,
        //% block="LED1"
        rgb1 = 0,
        //% block="LED2"
        rgb2 = 1,
        //% block="LED3"
        rgb3 = 2,
        //% block="LED4"
        rgb4 = 3
    }
    export enum ColorList {
        //% block="RED"
        red = -1,
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
    export enum MotorList {
        //% block="ALL"
        all = 1,
        //% block="LEFT"
        left = 2,
        //% block="RIGHT"
        right = 3
    }
    export enum MotorDirection {
        //% block="FORWARD"
        forward = 1,
        //% block="BACKWARD"
        backward = 2
    }
    let neoStrip = neopixel.create(DigitalPin.P5, 4, NeoPixelMode.RGB);

    /**
     * Stop all motor
     */
    //% weight=98
    //% blockId="mini_cruise_motor_stop" block="Stop all motor"
    export function stopAllMotor() {
        //左电机 M1
        pins.analogWritePin(AnalogPin.P14, 0);
        pins.digitalWritePin(DigitalPin.P13, 0);
        //右电机 M2
        pins.analogWritePin(AnalogPin.P16, 0);
        pins.digitalWritePin(DigitalPin.P15, 0);
    }
    /**
     *Control motor complex
     */
    //% blockId="mini_cruise_motor_complex" block="Motor %targetMotor| direction%currentDirection| for%targetSpeed"
    //% leftSpeed.min=0 leftSpeed.max=1023
    //% weight=99
    export function motorRunComplex(targetMotor: MotorList, currentDirection: MotorDirection, targetSpeed: number): void {
        if(targetMotor==MotorList.all){
            if(currentDirection==MotorDirection.forward){
                let leftRotation = 1;
                let curLeftSpeed = 1023 - targetSpeed;
                let rightRotation = 1;
                let curRightSpeed = 1023 - targetSpeed;
                //左电机 M1
                pins.analogWritePin(AnalogPin.P14, Math.abs(curLeftSpeed));
                pins.digitalWritePin(DigitalPin.P13, leftRotation);
                //右电机 M2
                pins.analogWritePin(AnalogPin.P16, Math.abs(curRightSpeed));
                pins.digitalWritePin(DigitalPin.P15, rightRotation);
            }else{
                let leftRotation = 0;
                let curLeftSpeed = -(1023-targetSpeed);
                let rightRotation = 0;
                let curRightSpeed = -(1023-targetSpeed);
                pins.analogWritePin(AnalogPin.P14, Math.abs(curLeftSpeed));
                pins.digitalWritePin(DigitalPin.P13, leftRotation);
                pins.analogWritePin(AnalogPin.P16, Math.abs(curRightSpeed));
                pins.digitalWritePin(DigitalPin.P15, rightRotation);
            }
        }else if(targetMotor==MotorList.left){
            if(currentDirection==MotorDirection.forward){
                let leftRotation = 1;
                let curLeftSpeed = 1023 - targetSpeed;
                pins.analogWritePin(AnalogPin.P14, Math.abs(curLeftSpeed));
                pins.digitalWritePin(DigitalPin.P13, leftRotation);
            }else{
                let leftRotation = 0;
                let curLeftSpeed = -(1023-targetSpeed);
                pins.analogWritePin(AnalogPin.P14, Math.abs(curLeftSpeed));
                pins.digitalWritePin(DigitalPin.P13, leftRotation);
            }
        }else if(targetMotor==MotorList.right){
            if(currentDirection==MotorDirection.forward){
                let rightRotation = 1;
                let curRightSpeed = 1023 - targetSpeed;
                pins.analogWritePin(AnalogPin.P16, Math.abs(curRightSpeed));
                pins.digitalWritePin(DigitalPin.P15, rightRotation);
            }else{
                let rightRotation = 0;
                let curRightSpeed = -(1023-targetSpeed);
                pins.analogWritePin(AnalogPin.P16, Math.abs(curRightSpeed));
                pins.digitalWritePin(DigitalPin.P15, rightRotation);
            }
        }
    }
	/**
	*Control motor
	*/
    //% blockId="mini_cruise_motor" block="Set DC Motor Left Speed%leftSpeed| Right Speed%rightSpeed| for%time"
    //% leftSpeed.min=-1023 leftSpeed.max=1023
    //% rightSpeed.min=-1023 rightSpeed.max=1023
    //% weight=100
    export function motorRun(leftSpeed: number, rightSpeed: number, time: number): void {
        let leftRotation = 1;
		let curLeftSpeed = 1023 - leftSpeed;
        if (curLeftSpeed > 1023) {
            curLeftSpeed = -(1023 + leftSpeed);
			if(curLeftSpeed<-1023){
				curLeftSpeed = -1023;
			}
        }
		if (curLeftSpeed < 0) {
            leftRotation = 0;
        }
        let rightRotation = 1;
		let curRightSpeed = 1023 - rightSpeed;
        if (curRightSpeed > 1023) {
            curRightSpeed = -(1023 + rightSpeed);
			if(curRightSpeed<-1023){
				curRightSpeed = -1023;
			}
        }
		if (curRightSpeed < 0) {
            rightRotation = 0;
        }
        //左电机 M1
        pins.analogWritePin(AnalogPin.P14, Math.abs(curLeftSpeed));
        pins.digitalWritePin(DigitalPin.P13, leftRotation);
        //右电机 M2
        pins.analogWritePin(AnalogPin.P16, Math.abs(curRightSpeed));
        pins.digitalWritePin(DigitalPin.P15, rightRotation);
        //添加时间控制
        if (time < 0) {
            time = 0;
        }
        let time_num = time * 1000000;
        control.waitMicros(time_num);
        //左电机 M1
        pins.analogWritePin(AnalogPin.P14, 0);
        pins.digitalWritePin(DigitalPin.P13, 0);
        //右电机 M2
        pins.analogWritePin(AnalogPin.P16, 0);
        pins.digitalWritePin(DigitalPin.P15, 0);
    }
	/**
     * Control buzzer
     */
    //% weight=89
    //% blockId="mini_cruise_tone" block="Play Tone %tone| for %beatInfo"
    export function myPlayTone(tone: ToneHzTable, beatInfo: BeatList): void {
        if (beatInfo == BeatList.whole_beat) {
            music.playTone(tone, music.beat(BeatFraction.Whole));
        }
        if (beatInfo == BeatList.half_beat) {
            music.playTone(tone, music.beat(BeatFraction.Half));
        }
        if (beatInfo == BeatList.quarter_beat) {
            music.playTone(tone, music.beat(BeatFraction.Quarter));
        }
        if (beatInfo == BeatList.double_beat) {
            music.playTone(tone, music.beat(BeatFraction.Double));
        }
        if (beatInfo == BeatList.eighth_beat) {
            music.playTone(tone, music.beat(BeatFraction.Eighth));
        }
        if (beatInfo == BeatList.breve_beat) {
            music.playTone(tone, music.beat(BeatFraction.Breve));
        }
    }
	/**
	*Line Inspection Module
	*/
    //% weight=79
    //% blockId="mini_cruise_patrol" block="Line Tracer Detects %patrol"
    export function readPatrol(patrol: Patrol): boolean {
        if (patrol == Patrol.white_white) {
            if (pins.digitalReadPin(DigitalPin.P12) == 1 && pins.digitalReadPin(DigitalPin.P11) == 1) {
                return true;
            } else {
                return false;
            }
        } else if (patrol == Patrol.white_black) {
            if (pins.digitalReadPin(DigitalPin.P12) == 1 && pins.digitalReadPin(DigitalPin.P11) == 0) {
                return true;
            } else {
                return false;
            }
        } else if (patrol == Patrol.black_white) {
            if (pins.digitalReadPin(DigitalPin.P12) == 0 && pins.digitalReadPin(DigitalPin.P11) == 1) {
                return true;
            } else {
                return false;
            }
        } else if (patrol == Patrol.black_black) {
            if (pins.digitalReadPin(DigitalPin.P12) == 0 && pins.digitalReadPin(DigitalPin.P11) == 0) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
	/**
	*Obstacle distance obtained by infrared
	*/
    //% blockId="mini_cruise_sensor" block="Ultrasonic Distance %unit"
    //% weight=69
    export function sensorDistance(unit: PingUnit, maxCmDistance = 500): number {
        pins.setPull(DigitalPin.P2, PinPullMode.PullNone);
        pins.digitalWritePin(DigitalPin.P2, 0);
        control.waitMicros(2);
        pins.digitalWritePin(DigitalPin.P2, 1);
        control.waitMicros(10);
        pins.digitalWritePin(DigitalPin.P2, 0);
        // read pulse
        const d = pins.pulseIn(DigitalPin.P1, PulseValue.High, maxCmDistance * 58);
        switch (unit) {
            case PingUnit.Centimeters: return Math.idiv(d, 58);
            default: return d;
        }
    }
	/**
      * Determine if there are obstacles
      */
    //% blockId="mini_cruise_IR" block="%IRDire| Obstacle"
    //% weight=68
    export function cruiseIR(IRDire: IRList): boolean {
		if (pins.digitalReadPin(DigitalPin.P8) == 0) {
			pins.digitalWritePin(DigitalPin.P8, 1);
			return true;
		} else {
			return false;
		}
    }
	/**
	*Controlling onboard LED lights
	*/
    //% blockId="mini_cruise_rgb" block="Set LED %RgbValue| Colour %ColorValue"
    //% weight=59
    export function setRGB(RgbValue: RgbList, ColorValue:ColorList): void {
        if(ColorValue == ColorList.red){
            if(RgbValue == RgbList.rgb){
                neoStrip.showColor(neopixel.colors(NeoPixelColors.Red));
            }else{
                neoStrip.setPixelColor(RgbValue, neopixel.colors(NeoPixelColors.Red));
            }

        }
        if(ColorValue == ColorList.orange){
            if(RgbValue == RgbList.rgb){
                neoStrip.showColor(neopixel.colors(NeoPixelColors.Orange));
            }else{
                neoStrip.setPixelColor(RgbValue, neopixel.colors(NeoPixelColors.Orange));
            }
        }
        if(ColorValue == ColorList.yellow){
            if(RgbValue == RgbList.rgb){
                neoStrip.showColor(neopixel.colors(NeoPixelColors.Yellow));
            }else{
                neoStrip.setPixelColor(RgbValue, neopixel.colors(NeoPixelColors.Yellow));
            }
        }
        if(ColorValue == ColorList.green){
            if(RgbValue == RgbList.rgb){
                neoStrip.showColor(neopixel.colors(NeoPixelColors.Green));
            }else{
                neoStrip.setPixelColor(RgbValue, neopixel.colors(NeoPixelColors.Green));
            }
        }
        if(ColorValue == ColorList.blue){
            if(RgbValue == RgbList.rgb){
                neoStrip.showColor(neopixel.colors(NeoPixelColors.Blue));
            }else{
                neoStrip.setPixelColor(RgbValue, neopixel.colors(NeoPixelColors.Blue));
            }
        }
        if(ColorValue == ColorList.indigo){
            if(RgbValue == RgbList.rgb){
                neoStrip.showColor(neopixel.colors(NeoPixelColors.Indigo));
            }else{
                neoStrip.setPixelColor(RgbValue, neopixel.colors(NeoPixelColors.Indigo));
            }
        }
        if(ColorValue == ColorList.violet){
            if(RgbValue == RgbList.rgb){
                neoStrip.showColor(neopixel.colors(NeoPixelColors.Violet));
            }else{
                neoStrip.setPixelColor(RgbValue, neopixel.colors(NeoPixelColors.Violet));
            }
        }
        if(ColorValue == ColorList.purple){
            if(RgbValue == RgbList.rgb){
                neoStrip.showColor(neopixel.colors(NeoPixelColors.Purple));
            }else{
                neoStrip.setPixelColor(RgbValue, neopixel.colors(NeoPixelColors.Purple));
            }
        }
        if(ColorValue == ColorList.white){
            if(RgbValue == RgbList.rgb){
                neoStrip.showColor(neopixel.colors(NeoPixelColors.White));
            }else{
                neoStrip.setPixelColor(RgbValue, neopixel.colors(NeoPixelColors.White));
            }
        }
        if(ColorValue == ColorList.black){
            if(RgbValue == RgbList.rgb){
                neoStrip.showColor(neopixel.colors(NeoPixelColors.Black));
            }else{
                neoStrip.setPixelColor(RgbValue, neopixel.colors(NeoPixelColors.Black));
            }
        }
        neoStrip.show();
    }
    /**
     *Set pull pin
     */
	//% blockId=tape_rgb block="Set Pull Pin %pin| to %way"
    //% weight=49
    export function setTapeLights(pin: DigitalPin, way: PinList): void {

        if(way = PinList.up_pull){
            pins.setPull(pin, PinPullMode.PullUp);
        }else if(way = PinList.down_pull){
            pins.setPull(pin, PinPullMode.PullDown);
        }else{
            pins.setPull(pin, PinPullMode.PullNone);
        }
    }
}
