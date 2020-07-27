import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as usuariosActions from '../actions';
import { tap, mergeMap, map, catchError } from 'rxjs/operators';
import { UsuarioService } from 'src/app/services/usuario.service';
import { cargarUsuariosSuccess } from '../actions';
import { of } from 'rxjs';

@Injectable()

export class UsuarioEffects {

    constructor(
        private actions$: Actions,
        private usuariosService: UsuarioService
    ){}

    cargarUsuario$ = createEffect(
        () => this.actions$.pipe(
            ofType( usuariosActions.cargarUsuario ),
            mergeMap(
                ( action ) => this.usuariosService.getUserById( action.id )
                    .pipe(
                       map( user => usuariosActions.cargarUsuarioSuccess({ usuario: user }) ),
                       catchError( err => of(usuariosActions.cargarUsuarioError({ payload: err })) )
                    )
            )
        )
    );

}