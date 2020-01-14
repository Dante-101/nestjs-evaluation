import { CatsService } from '../services/cats.service'
import { CatsController } from './cats.controller'
import { Cat } from '../interfaces/cats.interface'

describe('CatsController Unit Test', () => {
    let catsController: CatsController
    let catsService: CatsService

    beforeEach(() => {
        catsService = new CatsService()
        catsController = new CatsController(catsService)
    })

    describe('findAll', () => {
        it('should return an array of cats', async () => {
            const result: Cat[] = [{ id: 1, name: 'Alex' }]
            jest.spyOn(catsService, 'findAll').mockImplementation(() => result)
            expect(await catsController.findAll()).toBe(result)
        })
    })
})