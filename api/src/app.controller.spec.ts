import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';

const authServiceMock = {
  register: jest.fn(async (dto: any) => ({ ok: true, user: { id: 'u1', email: dto.email } })),
  login: jest.fn(async (_dto: any) => ({ accessToken: 'token-123' })),
};

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  afterEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('POST /auth/register -> returns ok + user', async () => {
    const dto = { email: 'a@a.com', password: '123456' };
    const res = await controller.register(dto as any);
    expect(authServiceMock.register).toHaveBeenCalledWith(dto);
    expect(res).toEqual({ ok: true, user: { id: 'u1', email: 'a@a.com' } });
  });

  it('POST /auth/login -> returns accessToken', async () => {
    const dto = { email: 'a@a.com', password: '123456' };
    const res = await controller.login(dto as any);
    expect(authServiceMock.login).toHaveBeenCalledWith(dto);
    expect(res).toEqual({ accessToken: 'token-123' });
  });
});
