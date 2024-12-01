//% color=#1B80C4 weight=99
//% icon="\uf1eb"
namespace CruiseE_IR {

    /**
     * button pushed.
     */
    //% blockId=mini_ir_received_left_event
    //% block="on |%btn| button pressed" shim=CruiseE_IR::onPressEvent
    export function onPressEvent(btn: RemoteButton, body: () => void): void {
        basic.pause(0)
    }

    /**
     * initialises local variables
     */
    //% blockId=mini_ir_init
    //% block="connect ir receiver to %pin" shim=CruiseE_IR::init
    export function init(pin: Pins): void {
        basic.pause(0)
    }
}
