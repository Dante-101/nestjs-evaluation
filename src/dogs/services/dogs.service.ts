import { Injectable } from '@nestjs/common'
import { Dog } from '../interfaces/dogs.interface'

@Injectable()
export class DogsService {
    private readonly dogs: Dog[] = []

    constructor() {
        console.log('DogsService Initialized')
    }

    create(dog: Dog) {
        this.dogs.push(dog)
    }

    findAll(): Dog[] {
        return this.dogs
    }
}
