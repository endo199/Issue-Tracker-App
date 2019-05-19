import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseService } from './database.service';
import { Issue } from './issue/model/issue';

describe('DatabaseService', () => {
  let service: DatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DatabaseService],
    }).compile();

    service = module.get<DatabaseService>(DatabaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Issue', () => {
    it('create new issue', done => {
      const issue = new Issue('Test 1', 'Deskripsi dari test 1');
      issue.author = 'User1';

      service.addIssue(issue).subscribe(unid => {
        expect(typeof(unid)).toEqual('number');
        done();
      });
    });
  });
});
