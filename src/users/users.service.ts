import { Inject, Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@Inject('SUPABASE_CLIENT') private readonly supabase: SupabaseClient) {}

  async findAll() {
    const { data, error } = await this.supabase.from('users').select('*');
    if (error) throw error;
    return data;
  }

  async findOne(id: string) {
    const { data, error } = await this.supabase.from('users').select('*').eq('id', id).single();
    if (error) throw error;
    return data;
  }

  async findByEmail(email: string) {
    const { data, error } = await this.supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .maybeSingle();
    if (error) throw error;
    return data;
  }

  async create(createUserDto: CreateUserDto) {
    const { data, error } = await this.supabase
      .from('users')
      .insert([createUserDto])
      .select() // ← این خط رو اضافه کن
      .single();
  
    if (error) throw error;
    if (!data) throw new Error('Insert succeeded but no data returned');
  
    return data;
  }
  

  async update(id: string, updateUserDto: UpdateUserDto) {
    const { data, error } = await this.supabase.from('users').update(updateUserDto).eq('id', id).single();
    if (error) throw error;
    return data;
  }

  async remove(id: string) {
    const { data, error } = await this.supabase.from('users').delete().eq('id', id);
    if (error) throw error;
    return { deleted: true };
  }
}
