import { Body, Controller, Get, Post } from '@nestjs/common'

import { DogsService } from '../services/dogs.service'
import { CreateDogDto } from '../dto/dogs.dto'

@Controller('dogs')
export class DogsController {
    constructor(private readonly dogsService: DogsService) {
        console.log('DogsController Initialized')
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
