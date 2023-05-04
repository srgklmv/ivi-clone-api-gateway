import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { RegistrationDto } from './dto/registration.dto';
import { LoginDto } from './dto/login.dto';
import { lastValueFrom } from 'rxjs';
import { Request, Response } from 'express';

@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Post('/registration')
  registration(@Body() registrationDto: RegistrationDto) {
    console.log(
      'API Gateway - Profile Controller - registration at',
      new Date(),
    );
    return this.profileService.registration(registrationDto);
  }

  @Post('/login')
  login(@Body() loginDto: LoginDto) {
    console.log('API Gateway - Profile Controller - login at', new Date());
    return this.profileService.login(loginDto);
  }

  @Delete('/:id')
  deleteProfile(@Param('id') profileId: number) {
    console.log(
      'API Gateway - Profile Controller - deleteProfile at',
      new Date(),
    );
    return this.profileService.deleteProfile(profileId);
  }

  @Put('/:id')
  updateProfile(
    @Param('id') profileId: number,
    @Body() updateProfileDto: RegistrationDto,
  ) {
    console.log(
      'API Gateway - Profile Controller - updateProfile at',
      new Date(),
    );
    return this.profileService.updateProfile(profileId, updateProfileDto);
  }

  @Get()
  getAllProfiles() {
    console.log(
      'API Gateway - Profile Controller - getAllProfiles at',
      new Date(),
    );
    return this.profileService.getAllProfiles();
  }

  @Get('/:id')
  getProfileById(@Param('id') profileId: number) {
    console.log(
      'API Gateway - Profile Controller - getProfileById at',
      new Date(),
    );
    return this.profileService.getProfileById(profileId);
  }

  @Post('/updateAccessToken')
  updateAccessToken(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    console.log(
      'API Gateway - Profile Controller - updateAccessToken at',
      new Date(),
    );
    return this.profileService.updateAccessToken(request, response);
  }

  @Post('/logout')
  logout(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    console.log('API Gateway - Profile Controller - logout at', new Date());
    return this.profileService.logout(request, response);
  }
}
