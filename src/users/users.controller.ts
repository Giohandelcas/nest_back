import { Controller, Get, NotFoundException, Param, Post, Body, Delete, Put, ForbiddenException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './user.dto';

interface User {
  id: string;
  name: string;
  email: string;
}

@Controller('users')
export class UsersController {
  private users: User[] = [
    { id: '1', name: 'John Doe', email: 'john.doe@example.com' },
    { id: '2', name: 'Jane Doe', email: 'jane.doe@example.com' },
  ];

  // Endpoint to get all users
  @Get()
  getUsers(): User[] {
    return this.users;
  }

  // Endpoint to get a user by ID
  @Get(':id')
  getUserById(@Param('id') id: string) {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (user.id === '1') {
      throw new ForbiddenException('You are not allowed to access this user');
    }
    return user;
  }

  // Endpoint to create a new user
  @Post()
  createUser(@Body() body: CreateUserDto) {
    const newUser = {
      ...body,
      id: `${this.users.length + 1}`, // Generando un ID automatico
    };
    this.users.push(newUser);
    return newUser;
  }

  // Endpoint to delete a user by ID
  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      throw new NotFoundException('User not found');
    }
    const deletedUser = this.users.splice(userIndex, 1);
    return deletedUser[0];
  }

  // Endpoint to update a user by ID
  @Put(':id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      throw new NotFoundException('User not found');
    }
    const updatedUser = { ...this.users[userIndex], ...body };
    this.users[userIndex] = updatedUser;
    return updatedUser;
  }
}
