import { IsInt, IsOptional, IsString } from 'class-validator'

export class CreateCatDto {
    constructor() {
        console.log('CreateCatDto Initialized')
    }

    @IsInt()
    id: number

    @IsString()
    readonly name: string

    @IsOptional()
    @IsInt()
    readonly age?: number

    @IsOptional()
    @IsString()
    readonly breed?: string
}