import { validateDocument } from '../utils/validation';

describe('Document Validator', () => {
  test('should validate correct CPF', () => {
    expect(validateDocument('529.982.247-25')).toBe(true);
  });

  test('should validate correct CNPJ', () => {
    expect(validateDocument('54.550.752/0001-55')).toBe(true);
  });

  test('should reject invalid CPF', () => {
    expect(validateDocument('111.111.111-11')).toBe(false);
  });

  test('should reject invalid CNPJ', () => {
    expect(validateDocument('11.111.111/1111-11')).toBe(false);
  });
});