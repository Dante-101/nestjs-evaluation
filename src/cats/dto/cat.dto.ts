import { IsInt, IsString, IsOptional } from 'class-validator'

export class CreateCatDto {
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