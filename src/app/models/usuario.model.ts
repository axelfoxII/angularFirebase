export class UsuarioModel{
    id?: string;
    nombre?: string;
    email?:string;
    estado:boolean;

    constructor(){
        this.estado=true;
    }
}