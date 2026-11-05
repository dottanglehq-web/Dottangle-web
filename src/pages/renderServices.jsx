import React from 'react';
import { renderToString } from 'react-dom/server';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ServicesPage from '../pages/ServicesPage';
import ServiceCategoryPage from '../pages/ServiceCategoryPage';
export function renderServices(path) {
  return renderToString(<MemoryRouter initialEntries={[path]}><main id="main-content"><Routes>
    <Route path="/services" element={<ServicesPage />} />
    <Route path="/services/:categorySlug" element={<ServiceCategoryPage />} />
    <Route path="/services/:categorySlug/:serviceSlug" element={<ServiceCategoryPage />} />
  </Routes></main></MemoryRouter>);
}
