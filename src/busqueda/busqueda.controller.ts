import { Controller, Get, Query } from "@nestjs/common";
import { BusquedaService } from "./busqueda.service";

@Controller("busqueda")
export class BusquedaController {
    constructor(private readonly busquedaService: BusquedaService) {}

    @Get()
    async buscar(@Query("termino") termino: string) {
        return this.busquedaService.buscar(termino);
    }
}
