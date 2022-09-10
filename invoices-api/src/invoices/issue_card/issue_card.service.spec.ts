import { Test, TestingModule } from '@nestjs/testing'
import { IssueCardService } from './issue_card.service'

describe('IssueCardService', () => {
  let service: IssueCardService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IssueCardService]
    }).compile()

    service = module.get<IssueCardService>(IssueCardService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
