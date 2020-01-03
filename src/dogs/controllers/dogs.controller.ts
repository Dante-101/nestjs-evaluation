import { Body, Controller, Get, Inject, Post } from '@nestjs/common'

import { NON_CLASS_TOKEN } from '../../const'
import { CreateDogDto } from '../dto/dogs.dto'
import { DogsService } from '../services/dogs.service'

@Controller('dogs')
export class DogsController {
    constructor(@Inject(NON_CLASS_TOKEN) private readonly value: object, private readonly dogsService: DogsService) {
        console.log('DogsController Initialized')
        console.log(`Received ${NON_CLASS_TOKEN} with value ${JSON.stringify(this.value)}`)
    }

    @Get()
    findAll() {

        return this.dogsService.findAll()
    }

    @Post()
    create(@Body() dog: CreateDogDto) {
        return this.dogsService.create(dog)
    }
}
