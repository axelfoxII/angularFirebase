import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  usuario= new UsuarioModel();
  id:any;

  constructor(private usuarioSvc: UsuarioService, private route: ActivatedRoute) { }

  ngOnInit(){
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id !== 'nuevo') {
      this.usuarioSvc.getUsuario(this.id).subscribe((res:any)=>{
        this.usuario = res;
        this.usuario.id = this.id;
      })
    }
  }

  guardar(forma:NgForm){

    Swal.fire({
      icon:'info',
      title:'ESPERE',
      text:'Guardando informacion',
      allowOutsideClick:true
    })

    Swal.showLoading();


    if (this.usuario.id) {

      this.usuarioSvc.actualizarUsuario(this.usuario).subscribe(res=>{
        Swal.fire({
          icon:'success',
          title:this.usuario.nombre,
          text:'El usuario se actualizo correctamente..'

        })
      })
      
    }else{
      this.usuarioSvc.crearUsuario(this.usuario).subscribe(res=>{
        Swal.fire({
          icon:'success',
          title:'EXITO',
          text:'El usuario se creo correctamente..'

        })
      })

    }


  }

}
