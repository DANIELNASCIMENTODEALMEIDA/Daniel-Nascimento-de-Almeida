export interface VehicleSpecs {
  powerEthanol: number;
  powerGasoline: number;
  torqueEthanol: number;
  torqueGasoline: number;
  accelerationEthanol: number;
  topSpeedEthanol: number;
  topSpeedGasoline: number;
  consumptionUrbanoEthanol: number;
  consumptionUrbanoGasoline: number;
  consumptionRodoviarioEthanol: number;
  consumptionRodoviarioGasoline: number;
  weight: number;
  trunk: number;
  tank: number;
  length: number;
  wheelbase: number;
}

export interface VehicleData {
  plate: string;
  model: string;
  engine: string;
  year: string;
  origin: string;
  specs: VehicleSpecs;
}
