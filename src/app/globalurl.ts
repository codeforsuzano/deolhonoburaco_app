import { Injectable } from '@angular/core';

@Injectable()
export class GlobalUrl{
    readonly baseAPIUrl: string = 'https://localhost:8000/api';
}