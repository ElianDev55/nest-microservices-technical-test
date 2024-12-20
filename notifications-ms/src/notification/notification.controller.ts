import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { NotificationService } from './notification.service';

@Controller()
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @MessagePattern({ cmd: 'create-notification' })
  create(@Payload() createNotificationDto: CreateNotificationDto) {
    return this.notificationService.create(createNotificationDto);
  }

  // @MessagePattern({ cmd: 'create-order' }))
  // findAll() {
  //   return this.notificationService.findAll();
  // }

  // @MessagePattern({ cmd: 'create-order' }))
  // findOne(@Payload() id: number) {
  //   return this.notificationService.findOne(id);
  // }

  // @MessagePattern({ cmd: 'create-order' })
  // update(@Payload() updateNotificationDto: UpdateNotificationDto) {
  //   return this.notificationService.update(
  //     updateNotificationDto.id,
  //     updateNotificationDto,
  //   );
  // }

  // @MessagePattern({ cmd: 'create-order' })
  // remove(@Payload() id: number) {
  //   return this.notificationService.remove(id);
  // }
}
