import {IsEnum, MinLength} from 'class-validator';

export class CreateNinjaDto {
    id: number;
    @MinLength(3)
    name: string;
    @IsEnum(['numchucks', 'stars'], {
        message: 'wrong string'
    })
    weapon: string;
}
