// Versão em português (pt-PT) da extensão ring:bit car da ELECFREAKS
// (github.com/tinkertanker/pxt-ringbitcar), só com os blocos principais.
// Os nomes no código (RingbitCar, forward, brake...) e os blockId são os do
// original, por isso programas feitos com a extensão em inglês continuam a
// funcionar com esta.

//% weight=0 color=#0fbc11 icon="" block="Carro ring:bit"
namespace RingbitCar {

    export enum Direction_turn {
        //% block="direita" enumval=0
        right,
        //% block="esquerda" enumval=1
        left
    }
    export enum Direction_run {
        //% block="a frente" enumval=0
        forward,
        //% block="trás" enumval=1
        backward
    }

    let pin_left_wheel = AnalogPin.P1
    let pin_right_wheel = AnalogPin.P2

    /**
    * Diz em que pinos estão ligadas as rodas do carro.
    * @param left pino da roda esquerda, eg: AnalogPin.P1
    * @param right pino da roda direita, eg: AnalogPin.P2
    */
    //% weight=99
    //% blockId=ringbitcar_init block="definir roda esquerda no pino %left|roda direita no pino %right"
    export function init_wheel(left: AnalogPin, right: AnalogPin): void {
        pin_left_wheel = left
        pin_right_wheel = right
    }

    /**
    * Roda o carro sobre si próprio. O ângulo real pode variar um pouco.
    * @param direction para que lado rodar
    * @param angle quantos graus rodar, eg: 90
    */
    //% weight=25
    //% blockId=steering angle block="rodar para a %direction %angle graus"
    export function steering_angle(direction: Direction_turn, angle: number): void {
        let timeWait = (angle * 1000000) / 135;
        if (direction == 1) {
            pins.servoWritePin(pin_left_wheel, 50);
            pins.servoWritePin(pin_right_wheel, 50);
            control.waitMicros(timeWait);
            brake();
        }
        else {
            pins.servoWritePin(pin_left_wheel, 130);
            pins.servoWritePin(pin_right_wheel, 130);
            control.waitMicros(timeWait);
            brake();
        }
    }

    /**
    * Anda mais ou menos esta distância. A distância real pode variar um pouco.
    * @param direction para onde andar
    * @param distance distância em centímetros, eg: 10
    */
    //% weight=29
    //% blockId=distance_run block="andar para %direction %distance cm"
    export function running_distance(direction: Direction_run, distance: number): void {
        let timeWait = (distance * 1000000) / 100;
        if (direction == 0) {
            forward();
            control.waitMicros(timeWait);
            brake();
        }
        else {
            back();
            control.waitMicros(timeWait);
            brake();
        }
    }

    /**
    * Anda durante este tempo e depois trava.
    * @param direction para onde andar
    * @param time tempo em segundos, eg: 1
    */
    //% weight=30
    //% blockId=time_run block="andar para %direction durante %time segundos"
    export function running_time(direction: Direction_run, time: number): void {
        if (direction == 0) {
            forward();
            basic.pause(time * 1000)
            brake();
        }
        else {
            back();
            basic.pause(time * 1000)
            brake();
        }
    }

    /**
    * Anda em frente à velocidade máxima. Pode desviar-se um pouco.
    */
    //% weight=9
    //% blockId=ringbitcar_forward block="andar em frente à velocidade máxima"
    export function forward(): void {
        pins.servoSetPulse(pin_left_wheel, 2400)
        pins.servoSetPulse(pin_right_wheel, 600)
    }

    /**
    * Anda para trás à velocidade máxima. Pode desviar-se um pouco.
    */
    //% weight=8
    //% blockId=ringbitcar_back block="andar para trás à velocidade máxima"
    export function back(): void {
        pins.servoSetPulse(pin_left_wheel, 600)
        pins.servoSetPulse(pin_right_wheel, 2400)
    }

    /**
    * Vira à esquerda à velocidade máxima.
    */
    //% weight=7
    //% blockId=ringbitcar_left block="virar à esquerda à velocidade máxima"
    export function turnleft(): void {
        pins.servoSetPulse(pin_left_wheel, 600)
        pins.servoSetPulse(pin_right_wheel, 600)
    }

    /**
    * Vira à direita à velocidade máxima.
    */
    //% weight=6
    //% blockId=ringbitcar_right block="virar à direita à velocidade máxima"
    export function turnright(): void {
        pins.servoSetPulse(pin_left_wheel, 2400)
        pins.servoSetPulse(pin_right_wheel, 2400)
    }

    /**
    * Para as duas rodas.
    */
    //% weight=5
    //% blockId=ringbitcar_brake block="travar"
    export function brake(): void {
        pins.digitalWritePin(<number>pin_left_wheel, 0)
        pins.digitalWritePin(<number>pin_right_wheel, 0)
    }

    /**
    * Escolhe a velocidade de cada roda, de -100 (para trás) a 100 (para a frente).
    * @param m velocidade da roda esquerda, de -100 a 100, eg: 0
    * @param n velocidade da roda direita, de -100 a 100, eg: 0
    */
    //% weight=4
    //% blockId=ringbitcar_freestyle block="velocidade da roda esquerda %m|roda direita %n"
    //% m.min=-100 m.max=100
    //% n.min=-100 n.max=100
    export function freestyle(m: number, n: number): void {
        if (m > 0) {
            pins.servoSetPulse(pin_left_wheel, 1600 + m * 8)
        } else if (m < 0) {
            pins.servoSetPulse(pin_left_wheel, 1400 + m * 8)
        } else pins.servoSetPulse(pin_left_wheel, 1500)

        if (n > 0) {
            pins.servoSetPulse(pin_right_wheel, 1400 - n * 8)
        } else if (n < 0) {
            pins.servoSetPulse(pin_right_wheel, 1600 - n * 8)
        } else pins.servoSetPulse(pin_right_wheel, 1500)
    }
}
