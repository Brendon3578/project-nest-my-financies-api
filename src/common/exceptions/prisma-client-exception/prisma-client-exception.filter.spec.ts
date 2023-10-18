import { PrismaExceptionFilter } from './prisma-client-exception.filter';

describe('PrismaExceptionFilter', () => {
  it('should be defined', () => {
    expect(new PrismaExceptionFilter()).toBeDefined();
  });
});
