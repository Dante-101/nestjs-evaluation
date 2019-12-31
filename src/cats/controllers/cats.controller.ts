import { Body, Controller, Get, Post } from '@nestjs/common'

import { Cat } from '../interfaces/cats.interface'
import { CatsService } from '../services/cats.service'
import { CreateCatDto } from '../dto/cat.dto'

@Controller('cats')
export class CatsController {
    constructor(private readonly catsService: CatsService) {
        console.log('CatsController Initialized')
    }

    @Post()
    async create(@Body() createCatDto: CreateCatDto) {
        this.catsService.create(createCatDto)
    }

    @Get()
    async findAll(): Promise<Cat[]> {
        return this.catsService.findAll()
    }
}
