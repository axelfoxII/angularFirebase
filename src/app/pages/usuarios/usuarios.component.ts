import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  usuarios:UsuarioModel[]=[];

  constructor(private usuarioSvc:UsuarioService) { }

  ngOnInit(){
    this.usuarioSvc.getUsuarios().subscribe((res:any)=>{
      this.usuarios = res;
      
    })
  }

  borrarUsuario(usuario:UsuarioModel, i:number){

    Swal.fire({
      icon:'question',
      title:'Esta seguro?',
      text:`Esta seguro de eliminar a ${usuario.nombre}`,
      showConfirmButton:true,
      showCancelButton:true

    }).then((res)=>{

      if (res.value) {

        this.usuarios.splice(i, 1);
        this.usuarioSvc.borrarUsuario(usuario.id).subscribe();
        
      }

    })



  }

}
