import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.model';
import { CreateUserDto, UpdateUserDto } from './user.dto';

@Injectable()
export class UsersService {
  private users: User[] = [
    { id: '1', name: 'John Doe', email: 'john.doe@example.com' },
    { id: '2', name: 'Jane Doe', email: 'jane.doe@example.com' },
  ];

  findAll() {
    return this.users;
  }

  getUserById(id: string) {
    const position = this.findOne(id);
    return this.users[position];
  }

  create(body: CreateUserDto) {
    const newUser = {
      ...body,
      id: `${this.users.length + 1}`, // Generando un ID automatico
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: string, body: UpdateUserDto) {
    const position = this.findOne(id);
    const updatedUser = { ...this.users[position], ...body };
    this.users[position] = updatedUser;
    return updatedUser;
  }

  delete(id: string) {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      throw new NotFoundException('User not found');
    }
    const deletedUser = this.users.splice(userIndex, 1);
    return deletedUser[0];
  }

  private findOne(id: string) {
    const position = this.users.findIndex((user) => user.id === id);
    if (position === -1) {
      throw new NotFoundException('User not found');
    }
    return position;
  }
}
