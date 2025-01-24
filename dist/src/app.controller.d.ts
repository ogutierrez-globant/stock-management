import { AppService } from './app.service';
import { ExceptionFilter, ArgumentsHost } from '@nestjs/common';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHealth(): string;
}
export declare class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost): void;
}
