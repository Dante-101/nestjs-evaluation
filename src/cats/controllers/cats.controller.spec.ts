import { Test } from '@nestjs/testing'

import { Cat } from '../interfaces/cats.interface'
import { CatsService } from '../services/cats.service'
import { CatsController } from './cats.controller'

describe('CatsController', () => {
  let catsController: CatsController
  let catsService: CatsService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [CatsController],
      providers: [CatsService],
    }).compile()

    catsService = module.get<CatsService>(CatsService)
    catsController = module.get<CatsController>(CatsController)
  })

  describe('findAll', () => {
    it('should return an array of cats', async () => {
      const result: Cat[] = [{ id: 1, name: 'Alex' }]
      jest.spyOn(catsService, 'findAll').mockImplementation(() => result)

      expect(await catsController.findAll()).toBe(result)
    })
  })
})