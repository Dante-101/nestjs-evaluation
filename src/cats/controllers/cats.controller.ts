import { Body, Controller, Get, Post, UsePipes, ValidationPipe, Param, ParseIntPipe } from '@nestjs/common'

import { WhimException } from '../../framework/errors/whim-exception'
import { CreateCatDto } from '../dto/cat.dto'
import { Cat } from '../interfaces/cats.interface'
import { CatsService } from '../services/cats.service'
import { MyValidationPipe } from '../../framework/pipes/validation.pipe'

@Controller('cats')
export class CatsController {
    constructor(private readonly catsService: CatsService) {
        console.log('CatsController Initialized')
    }

    @Post()
    @UsePipes(MyValidationPipe)
    async create(@Body() createCatDto: CreateCatDto) {
        this.catsService.create(createCatDto)
    }

    @Get()
    async findAll(): Promise<Cat[]> {
        return this.catsService.findAll()
    }

    @Get('throw')
    async throw() {
        throw new WhimException()
    }

    @Get(':id')
    async findOne(@Param('id', new ParseIntPipe()) id) {
        return await this.catsService.findOne(id)
    }

}
