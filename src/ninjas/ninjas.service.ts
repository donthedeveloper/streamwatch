import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';

@Injectable()
export class NinjasService {
    private ninjas = [
        {
            id: 0,
            name: 'Don',
            weapon: 'sword'
        },
        {
            id: 1,
            name: 'Jeff',
            weapon: 'gun'
        }
    ];

    getNinjas(weapon?: 'stars' | 'nunchucks') {
        if (weapon) {
            return this.ninjas.filter(ninja => ninja.weapon === weapon);
        }

        return this.ninjas;
    }

    getNinja(id: number) {
        const ninja = this.ninjas.find(ninja => ninja.id === id);
        console.log(ninja);

        if (!ninja) {
            // throw new Error('No ninjas exist with this id.');
            throw new NotFoundException();
        }

        return ninja;
    }

    createNinja(createNinjaDto: CreateNinjaDto) {
        this.ninjas.push(createNinjaDto);
        return createNinjaDto;
    }
}
