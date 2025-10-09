import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';

jest.mock('bcrypt', () => ({
  hash: jest.fn(async (plain: string) => `hashed:${plain}`),
  compare: jest.fn(async (plain: string, hashed: string) => hashed === `hashed:${plain}`),
}));

class PrismaMock {
  user = {
    findUnique: jest.fn(),
    create: jest.fn(),
  };
}

describe('AuthService', () => {
  let service: AuthService;
  let prisma: PrismaMock;
  let jwt: JwtService;

  beforeEach(async () => {
    prisma = new PrismaMock();
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: 'PrismaService', useValue: prisma },
        { provide: JwtService, useValue: { signAsync: jest.fn(async () => 'token-123') } },
      ],
    })
      .useMocker((token) => {
        if (token && typeof token === 'function' && token.name === 'PrismaService') return prisma;
        return undefined;
      })
      .compile();

    service = module.get(AuthService);
    jwt = module.get(JwtService);
  });

  it('register: creates user when email not taken', async () => {
    prisma.user.findUnique.mockResolvedValue(null);
    prisma.user.create.mockResolvedValue({ id: 'u1', email: 'a@a.com' });

    const res = await service.register({ email: 'a@a.com', password: '123456' });

    expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { email: 'a@a.com' } });
    expect(prisma.user.create).toHaveBeenCalledWith({
      data: { email: 'a@a.com', passwordHash: 'hashed:123456' },
      select: { id: true, email: true },
    });
    expect(res).toEqual({ ok: true, user: { id: 'u1', email: 'a@a.com' } });
  });

  it('register: throws when email already registered', async () => {
    prisma.user.findUnique.mockResolvedValue({ id: 'u1', email: 'a@a.com' });

    await expect(service.register({ email: 'a@a.com', password: 'x' }))
      .rejects.toThrow(new BadRequestException('Email already registered'));
  });

  it('login: throws on unknown email', async () => {
    prisma.user.findUnique.mockResolvedValue(null);
    await expect(service.login({ email: 'a@a.com', password: 'x' }))
      .rejects.toThrow(new UnauthorizedException('Invalid credentials'));
  });

  it('login: throws on wrong password', async () => {
    prisma.user.findUnique.mockResolvedValue({ id: 'u1', email: 'a@a.com', passwordHash: 'hashed:different' });
    await expect(service.login({ email: 'a@a.com', password: 'x' }))
      .rejects.toThrow(new UnauthorizedException('Invalid credentials'));
  });

  it('login: returns accessToken on success', async () => {
    prisma.user.findUnique.mockResolvedValue({ id: 'u1', email: 'a@a.com', passwordHash: 'hashed:123456' });
    const res = await service.login({ email: 'a@a.com', password: '123456' });
    expect(jwt.signAsync).toHaveBeenCalledWith({ sub: 'u1', email: 'a@a.com' });
    expect(res).toEqual({ accessToken: 'token-123' });
  });
});
