import { Injectable, OnModuleInit, OnModuleDestroy, OnApplicationBootstrap, OnApplicationShutdown } from '@nestjs/common'
import { Dog } from '../interfaces/dogs.interface'

@Injectable()
export class DogsService implements OnModuleInit, OnModuleDestroy, OnApplicationBootstrap, OnApplicationShutdown {
    private readonly dogs: Dog[] = []

    constructor() {
        console.log('DogsService Initialized')
    }

    onModuleInit() {
        console.log('DogsService - onModuleInit executed')
    }

    onModuleDestroy() {
        console.log('DogsService - onModuleDestroy executed')
    }

    onApplicationBootstrap() {
        console.log('DogsService - onApplicationBootstrap executed')
    }

    onApplicationShutdown(signal?: string) {
        console.log('DogsService - onApplicationShutdown executed' + (signal ? ' with signal ' + signal : ''))
    }

    create(dog: Dog) {
        this.dogs.push(dog)
    }

    findAll(): Dog[] {
        return this.dogs
    }
}
