import { Module } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [
    UsersService,
    {
      provide: 'SUPABASE_CLIENT',
      useFactory: (configService: ConfigService) => {
        const url = configService.get<string>('SUPABASE_URL');
        const key = configService.get<string>('SUPABASE_KEY');

        if (!url) {
          throw new Error('SUPABASE_URL is not defined');
        }
        if (!key) {
          throw new Error('SUPABASE_KEY is not defined');
        }

        return createClient(url, key);
      },
      inject: [ConfigService],
    },
  ],
  controllers: [UsersController],
  exports: [UsersService],  // <-- این خط اضافه شود
})
export class UsersModule {}
