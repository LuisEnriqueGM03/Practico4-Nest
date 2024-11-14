import { Test, TestingModule } from "@nestjs/testing";
import { BusquedaService } from "./busqueda.service";

describe("BusquedaService", () => {
    let service: BusquedaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [BusquedaService],
        }).compile();

        service = module.get<BusquedaService>(BusquedaService);
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });
});
