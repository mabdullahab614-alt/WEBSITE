import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateCartTotals, filterProducts, calculateTiltAngles } from './shopLogic.ts';
import type { Product, CartItem } from '../types.ts';

const mockProductA: Product = {
  id: 'phone-x',
  name: 'Smartphone X',
  price: 699,
  category: 'smartphones',
  iconSymbol: '📱',
  rating: 4.9,
  reviewsCount: 300,
  tagline: 'Flagship OLED',
  specs: ['6.7" OLED'],
  inStock: true
};

const mockProductB: Product = {
  id: 'fast-charger',
  name: 'Fast Charger 65W',
  price: 25,
  category: 'power',
  iconSymbol: '⚡',
  rating: 4.8,
  reviewsCount: 120,
  tagline: 'GaN III',
  specs: ['65W GaN'],
  inStock: true
};

test('calculateCartTotals calculates empty cart correctly', () => {
  const totals = calculateCartTotals([]);
  assert.equal(totals.subtotal, 0);
  assert.equal(totals.totalItems, 0);
  assert.equal(totals.shipping, 0);
  assert.equal(totals.total, 0);
});

test('calculateCartTotals applies shipping under $50 and free over $50', () => {
  const cartUnder50: CartItem[] = [{ product: mockProductB, quantity: 1 }];
  const totalsUnder = calculateCartTotals(cartUnder50);
  assert.equal(totalsUnder.subtotal, 25);
  assert.equal(totalsUnder.shipping, 5.99);
  assert.equal(totalsUnder.totalItems, 1);
  assert.equal(totalsUnder.tax, 2.0);
  assert.equal(totalsUnder.total, 32.99);

  const cartOver50: CartItem[] = [{ product: mockProductA, quantity: 1 }];
  const totalsOver = calculateCartTotals(cartOver50);
  assert.equal(totalsOver.subtotal, 699);
  assert.equal(totalsOver.shipping, 0);
  assert.equal(totalsOver.totalItems, 1);
});

test('filterProducts filters by category and search terms', () => {
  const products = [mockProductA, mockProductB];
  const allResult = filterProducts(products, 'all', '');
  assert.equal(allResult.length, 2);

  const powerResult = filterProducts(products, 'power', '');
  assert.equal(powerResult.length, 1);
  assert.equal(powerResult[0].id, 'fast-charger');

  const searchResult = filterProducts(products, 'all', 'smart');
  assert.equal(searchResult.length, 1);
  assert.equal(searchResult[0].id, 'phone-x');
});

test('calculateTiltAngles produces bounded and correct tilt values', () => {
  const rect = { left: 100, top: 100, width: 200, height: 200 };
  // Center: (200, 200)
  const centerTilt = calculateTiltAngles(200, 200, rect, 15);
  assert.equal(centerTilt.rotateX, 0);
  assert.equal(centerTilt.rotateY, 0);

  // Top-left: (100, 100) -> x=-0.5, y=-0.5 -> rotateY=-15, rotateX=15
  const topLeftTilt = calculateTiltAngles(100, 100, rect, 15);
  assert.equal(topLeftTilt.rotateY, -15);
  assert.equal(topLeftTilt.rotateX, 15);

  // Bottom-right: (300, 300) -> x=0.5, y=0.5 -> rotateY=15, rotateX=-15
  const bottomRightTilt = calculateTiltAngles(300, 300, rect, 15);
  assert.equal(bottomRightTilt.rotateY, 15);
  assert.equal(bottomRightTilt.rotateX, -15);
});
