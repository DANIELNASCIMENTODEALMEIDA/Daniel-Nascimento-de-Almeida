import { VehicleData } from './types';

export const VEHICLES_MOCK: VehicleData[] = [
  {
    plate: 'QJP7G53',
    model: 'Volkswagen Gol 1.0 MPI Total Flex',
    engine: '1.0 MPI, 3 cilindros, 12V (EA211)',
    year: '2022',
    origin: 'Santa Catarina (SC)',
    specs: {
      powerEthanol: 84,
      powerGasoline: 75,
      torqueEthanol: 10.4,
      torqueGasoline: 9.7,
      accelerationEthanol: 13.1,
      topSpeedEthanol: 167,
      topSpeedGasoline: 162,
      consumptionUrbanoEthanol: 9.1,
      consumptionUrbanoGasoline: 13.3,
      consumptionRodoviarioEthanol: 10.1,
      consumptionRodoviarioGasoline: 14.4,
      weight: 994,
      trunk: 285,
      tank: 55,
      length: 3892,
      wheelbase: 2467,
    }
  }
];
