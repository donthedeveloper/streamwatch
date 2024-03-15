import { Body, Controller, Get, NotFoundException, Param, ParseIntPipe, Post, Put, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';
import { BeltGuard } from './belt/belt.guard';
import { NinjasService } from './ninjas.service';

@Controller('ninjas')
export class NinjasController {
    constructor(private readonly ninjasService: NinjasService) {}

    @Get()
    getNinjas(@Query('weapon') weapon: 'stars' | 'nunchucks') {
        return this.ninjasService.getNinjas(weapon);
    };

    @Get(':id')
    getOneNinja(@Param('id', ParseIntPipe) id: number) {
        // try {
            return this.ninjasService.getNinja(id);
        // } catch(error) {
        //     console.log(error);
        //     return new NotFoundException();
        // }
    };

    @Post()
    @UseGuards(BeltGuard)
    createNinja(@Body(new ValidationPipe()) createNinjaDto: CreateNinjaDto) {
        return this.ninjasService.createNinja(createNinjaDto);
    }

    @Put(':id')
    updateNinja(@Param('id') id: string, @Body() updateNinjaDto: UpdateNinjaDto) {
        return {
            id,
            name: updateNinjaDto.name
        }
    }
}
