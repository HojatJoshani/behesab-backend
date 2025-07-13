import { Inject, Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { User } from './user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@Inject('SUPABASE_CLIENT') private readonly supabase: SupabaseClient) {}

  async findAll(): Promise<User[]> {
    const { data, error } = await this.supabase.from<User>('users').select('*');
    if (error) throw error;
    return data || [];
  }

  async findOne(id: string): Promise<User> {
    const { data, error } = await this.supabase.from<User>('users').select('*').eq('id', id).single();
    if (error) throw error;
    return data;
  }

  async findByEmail(email: string): Promise<User | null> {
    const { data, error } = await this.supabase.from<User>('users').select('*').eq('email', email).single();
    if (error) throw error;
    return data || null;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { data, error } = await this.supabase.from<User>('users').insert([createUserDto]).select().single();
    if (error) throw error;
    return data;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const { data, error } = await this.supabase.from<User>('users').update(updateUserDto).eq('id', id).select().single();
    if (error) throw error;
    return data;
  }

  async remove(id: string): Promise<{ deleted: boolean }> {
    const { error } = await this.supabase.from('users').delete().eq('id', id);
    if (error) throw error;
    return { deleted: true };
  }
}
