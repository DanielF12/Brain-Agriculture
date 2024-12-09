import validator from 'validator';
import { Farm } from '../types';

export const validateDocument = (document: string): boolean => {
  const cleanDoc = document.replace(/[^\d]/g, '');
  return cleanDoc.length === 11
    ? validator.isTaxID(cleanDoc, 'pt-BR')
    : validator.isEAN(cleanDoc);
};

export const validateAreas = (farm: Pick<Farm, 'totalArea' | 'arableLand' | 'vegetationArea'>): boolean => {
  return farm.arableLand + farm.vegetationArea <= farm.totalArea;
};