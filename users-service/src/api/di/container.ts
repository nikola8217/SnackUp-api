import 'reflect-metadata';
import { container } from 'tsyringe';
import { Mediator } from 'mediatr-ts';

import { UserRepository } from '../../infrastructure/repositories/UserRepository';
import { PasswordHasher } from '../../infrastructure/adapters/PasswordHasher';
import { TokenGenerator } from '../../infrastructure/adapters/TokenGenerator';

import '../../business/commands/RegisterUser/RegisterUserHandler';
import '../../business/commands/LoginUser/LoginUserHandler';

container.register('IUserRepository', { useClass: UserRepository });
container.register('IPasswordHasher', { useClass: PasswordHasher });
container.register('ITokenGenerator', { useClass: TokenGenerator });

export const mediator = new Mediator({
    resolver: {
        resolve<T>(constructor: new (...args: any[]) => T): T {
            return container.resolve(constructor);
        },
        add() {}
    }
});