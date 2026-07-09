/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ComponentItem {
  id: string;
  name: string;
  description: string;
  specifications: Record<string, string>;
  weightKg: number;
  imageUrl?: string;
  category: 'cuerpo' | 'accesorios';
}

export interface QuoteCartItem {
  component: ComponentItem;
  quantity: number;
}

export type Modalidad = 'alquiler' | 'venta';

export interface CalculatorResult {
  cuerpos: number;
  tijeras: number;
  tablones: number;
  niveladores: number;
  totalEstimatedWeight: number;
}
