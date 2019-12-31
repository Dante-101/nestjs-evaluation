import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common'
import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator'

@Injectable()
export class MyValidationPipe implements PipeTransform {
    constructor() {
        console.log('MyValidationPipe Initialized')
    }

    async transform(value: any, { type, metatype, data }: ArgumentMetadata) {
        if (!metatype || !this.toValidate(metatype)) {
            return value
        }
        const object = plainToClass(metatype, value)
        const errors = await validate(object)
        if (errors.length > 0) {
            throw new BadRequestException(errors.map(e => Object.values(e.constraints).join(', ')).join(', '))
        }
        return value
    }

    private toValidate(metatype: Function): boolean {
        const types = [String, Boolean, Number, Array, Object] as Array<Function>
        return !types.includes(metatype);
    }
}