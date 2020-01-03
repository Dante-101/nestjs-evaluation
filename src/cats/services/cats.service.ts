import { Injectable } from '@nestjs/common'

import { Cat } from '../interfaces/cats.interface'

@Injectable()
export class CatsService {
    private readonly cats: Map<number, Cat> = new Map()

    constructor() {
        console.log('CatsService Initialized')
    }

    create(cat: Cat) {
        this.cats.set(cat.id, cat)
    }

    findAll(): Cat[] {
        return Array.from(this.cats.values())
    }

    findOne(id: number): Cat | undefined {
        return this.cats.get(id)
    }
}
