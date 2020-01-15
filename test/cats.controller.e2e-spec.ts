import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import * as request from 'supertest'

import { CatsModule } from '../src/cats/cats.module'
import { CatsService } from '../src/cats/services/cats.service'

describe('Cats', () => {
    let app: INestApplication
    const catsService = {
        findAll: () => ['test'],
        findOne: () => ['findOne']
    }

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: [CatsModule],
        })
            .overrideProvider(CatsService)
            .useValue(catsService)
            .compile()

        app = module.createNestApplication()
        await app.init()
    })

    afterAll(async () => {
        await app.close()
    })

    it(`/GET cats`, () => {
        return request(app.getHttpServer())
            .get('/cats')
            .expect(200)
            .expect({
                data: catsService.findAll(),
            })
    })

    it(`/GET cats/1`, () => {
        return request(app.getHttpServer())
            .get('/cats/1')
            .expect(200)
            .expect({
                data: catsService.findOne(),
            })
    })

})