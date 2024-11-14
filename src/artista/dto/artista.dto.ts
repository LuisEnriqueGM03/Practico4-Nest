import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Genero } from "../../genero/genero.model";

export class ArtistaDto {
    @IsNotEmpty()
    @IsString()
    readonly nombre: string;

    @IsNotEmpty()
    @IsNumber()
    readonly idGenero: Genero;
}
