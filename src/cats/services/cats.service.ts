import { Injectable } from '@nestjs/common'

import { Cat } from '../interfaces/cats.interface'

@Injectable()
export class CatsService {
    private readonly cats: Cat[] = []

    constructor() {
        console.log('CatsService Initialized')
    }

    create(cat: Cat) {
        this.cats.push(cat)
    }

    findAll(): Cat[] {
        return this.cats
    }

    findOne(id: number): Cat | undefined {
        return this.cats.find(c => c.id === id)
    }
}
