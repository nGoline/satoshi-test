// import { Test, TestingModule } from '@nestjs/testing';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';

// describe('AppController', () => {
//   let appController: AppController;

//   // Mock implementation of AppService
//   const mockAppService = {
//     getHello: () => ({ message: 'Hello World!' }),
//   };

//   beforeEach(async () => {
//     const app: TestingModule = await Test.createTestingModule({
//       controllers: [AppController],
//       providers: [
//         {
//           provide: AppService,
//           useValue: mockAppService,
//         },
//       ],
//     }).compile();

//     appController = app.get<AppController>(AppController);
//   });

//   describe('root', () => {
//     it('should return { message: "Hello World!" }', () => {
//       expect(appController.getHello()).toEqual({ message: 'Hello World!' });
//     });
//   });
// });
