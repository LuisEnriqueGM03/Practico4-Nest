import { IsOptional, IsNumber, IsString } from "class-validator";
import { Genero } from "../../genero/genero.model";

export class ArtistaUpdateDto {
    @IsOptional()
    @IsString()
    readonly nombre?: string;

    @IsOptional()
    @IsNumber()
    readonly idGenero?: Genero;
}
