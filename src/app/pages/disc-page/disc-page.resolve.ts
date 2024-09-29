import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { DiscPageResolveService } from './services/disc-page-resolve.service';
import { Album } from '@spotify/web-api-ts-sdk';
import { BlockUiService } from '../../components/block-ui/block-ui.service';

export const pageResolve: ResolveFn<Album> = (activatedRouteSnapshot: ActivatedRouteSnapshot, routerStateSnapshot: RouterStateSnapshot) => {
    const id = activatedRouteSnapshot.paramMap.get('id')!;
    const blockUiService = inject(BlockUiService);
    const discPageResolveService = inject(DiscPageResolveService);
    blockUiService.block();
    return discPageResolveService.getById(id);
};