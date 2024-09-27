import { HttpContextToken } from '@angular/common/http';

export const SKIP_AUTH_VALIDATION = new HttpContextToken<boolean>(() => false);