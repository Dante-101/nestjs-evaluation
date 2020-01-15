import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Post,
    UseGuards,
    UseInterceptors,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common'

import { Roles } from '../../framework/decorators/roles.decorator'
import { WhimException } from '../../framework/errors/whim-exception'
import { RolesGuard } from '../../framework/guards/roles.guard'
import { LoggingInterceptor } from '../../framework/interceptors/logging.interceptor'
import { TransformInterceptor } from '../../framework/interceptors/transform.interceptor'
import { MyValidationPipe } from '../../framework/pipes/validation.pipe'
import { CreateCatDto } from '../dto/cat.dto'
import { Cat } from '../interfaces/cats.interface'
import { CatsService } from '../services/cats.service'

@Controller('cats')
@UseGuards(RolesGuard)
@UseInterceptors(LoggingInterceptor)
@UseInterceptors(TransformInterceptor)
export class CatsController {
    constructor(private readonly catsService: CatsService) {
        console.log('CatsController Initialized')
        // this.catsService.create({ id: 1, name: 'Alex' })
    }

    @Post()
    @UsePipes(MyValidationPipe)
    @Roles('admin')
    async create(@Body() createCatDto: CreateCatDto) {
        this.catsService.create(createCatDto)
    }

    @Post('new')
    @UsePipes(new ValidationPipe({ transform: true }))
    async createNew(@Body() createCatDto: CreateCatDto) {
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
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return await this.catsService.findOne(id)
    }
}
