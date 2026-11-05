import assert from 'node:assert/strict';
import express from 'express';
import { once } from 'node:events';
import { chromium } from '@playwright/test';

const app = express();
app.use(express.static('dist'));
app.get('/{*path}', (request, response) => response.sendFile('index.html', { root: 'dist' }));
const server = app.listen(0);
await once(server, 'listening');
const base = `http://localhost:${server.address().port}`;
const browser = await chromium.launch({ headless: true });

const intersects = (a, b) =>
  a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;

try {
  for (const width of [320, 375, 390, 430]) {
    const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(base);

    const layout = await page.evaluate(() => {
      const rect = element => {
        const box = element.getBoundingClientRect();
        return { top: box.top, right: box.right, bottom: box.bottom, left: box.left, width: box.width, height: box.height };
      };
      return {
        header: rect(document.querySelector('.site-header')),
        title: rect(document.querySelector('.cb-giant-title')),
        roles: [...document.querySelectorAll('.cb-role-tag')].map(element => ({
          label: element.textContent.trim(),
          display: getComputedStyle(element).display,
          box: rect(element)
        })),
        avatars: [...document.querySelectorAll('.cb-banner-wrapper .cb-letter-avatar')].map(rect),
        scrollWidth: document.documentElement.scrollWidth,
        viewportWidth: innerWidth
      };
    });

    assert.equal(layout.header.top, 6, `${width}px header top spacing`);
    assert.equal(layout.header.height, 60, `${width}px header height changed`);
    assert.ok(layout.title.top > layout.header.bottom, `${width}px heading overlaps navigation`);
    assert.equal(layout.roles.length, 6, `${width}px missing role labels`);
    assert.equal(layout.avatars.length, 6, `${width}px missing floating avatars`);

    for (const role of layout.roles) {
      assert.notEqual(role.display, 'none', `${width}px ${role.label} hidden`);
      assert.ok(role.box.top > layout.header.bottom, `${width}px ${role.label} overlaps navigation`);
      assert.ok(role.box.left >= 0 && role.box.right <= width, `${width}px ${role.label} outside viewport`);
    }
    for (const avatar of layout.avatars) {
      assert.ok(avatar.top > layout.header.bottom, `${width}px avatar overlaps navigation`);
      assert.ok(avatar.left >= 0 && avatar.right <= width, `${width}px avatar outside viewport`);
    }
    for (let index = 0; index < layout.roles.length; index += 1) {
      for (let other = index + 1; other < layout.roles.length; other += 1) {
        assert.ok(
          !intersects(layout.roles[index].box, layout.roles[other].box),
          `${width}px labels overlap: ${layout.roles[index].label} and ${layout.roles[other].label}`
        );
      }
    }
    assert.ok(layout.scrollWidth <= layout.viewportWidth, `${width}px horizontal overflow`);
    assert.deepEqual(errors, []);
    await page.screenshot({ path: `test-results/home-hero-${width}.png`, animations: 'disabled' });
    await page.close();
    console.log(`PASS ${width}px: navigation, heading, 6 avatars, 6 labels and overflow`);
  }

  const tablet = await browser.newPage({ viewport: { width: 768, height: 900 }, reducedMotion: 'reduce' });
  await tablet.goto(base);
  assert.equal(await tablet.locator('.site-header').evaluate(element => element.getBoundingClientRect().top), 12);
  assert.equal(await tablet.locator('.cb-hero-section').evaluate(element => getComputedStyle(element).paddingTop), '90px');
  await tablet.close();
  console.log('PASS tablet breakpoint unchanged');
} finally {
  await browser.close();
  await new Promise(resolve => server.close(resolve));
}
