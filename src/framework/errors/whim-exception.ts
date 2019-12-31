import { HttpException, HttpStatus } from '@nestjs/common'

export class WhimException extends HttpException {
    constructor() {
        super('You have been for-ever-bidden on whim!', HttpStatus.FORBIDDEN);
    }
}