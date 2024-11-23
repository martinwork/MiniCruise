//% color=#1B80C4 weight=99
//% icon="\uf1eb"
namespace CruiseE_IR {

    /**
     * button pushed.
     */
    //% blockId=mini_ir_received_left_event
    //% block="on |%btn| button pressed" shim=Mbit_IR::onPressEvent
    export function onPressEvent(btn: RemoteButton, body: () => void): void {
        return;
    }

    /**
     * initialises local variablesssss
     */
    //% blockId=mini_ir_init
    //% block="connect ir receiver to %pin" shim=Mbit_IR::init
    export function init(pin: Pins): void {
        return
    }
}

