export type Culture = 'Soja' | 'Milho' | 'Algodão' | 'Café' | 'Cana de Açucar';

export interface Farm {
  id: string;
  document: string;
  producerName: string;
  farmName: string;
  city: string;
  state: string;
  totalArea: number;
  arableLand: number;
  vegetationArea: number;
  cultures: Culture[];
}

export interface DashboardData {
  totalFarms: number;
  totalArea: number;
  stateDistribution: { name: string; value: number }[];
  cultureDistribution: { name: string; value: number }[];
  landUseDistribution: { name: string; value: number }[];
}