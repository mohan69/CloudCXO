const { chromium } = require('playwright');
const fetch = require('node-fetch');

(async () => {
  const baseUrl = process.env.BASE_URL || 'http://localhost:5173';
  const apiUrl = process.env.API_URL || 'http://localhost:4000';

  console.log('Base URL:', baseUrl);
  console.log('API URL:', apiUrl);

  // ensure test user exists via API
  const testUser = { username: 'smoke+user@example.com', password: 'smokePass123', role: 'user' };
  try {
    const reg = await fetch(apiUrl + '/api/auth/register', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(testUser)
    });
    if (reg.status === 201) console.log('Test user created');
    else if (reg.status === 409) console.log('Test user already exists');
    else console.log('Register status:', reg.status);
  } catch (e) {
    console.error('Failed to create test user', e);
    process.exit(2);
  }

  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    // Visit registration page and submit a CXO registration
    await page.goto(baseUrl + '/register');
    await page.waitForSelector('#fullName');
    await page.fill('#fullName', 'Smoke Test User');
    await page.fill('#email', 'smoke+registration@example.com');
    await page.fill('#phone', '+1234567890');
    await page.fill('#linkedinProfile', 'https://linkedin.com/in/smoke');

    // professional section fields
    await page.fill('#role', 'CFO').catch(()=>{});
    await page.fill('#experience', '5-10 years').catch(()=>{});
    await page.fill('#bio', 'This is a smoke test.').catch(()=>{});

    await page.click('button:has-text("Submit Registration")');
    // wait for success card
    await page.waitForSelector('text=Registration Submitted!', { timeout: 5000 });
    console.log('Registration flow OK');

    // Now login
    await page.goto(baseUrl + '/login');
    await page.fill('#username', testUser.username);
    await page.fill('#password', testUser.password);
    await page.click('button:has-text("Login")');

    // wait for navigation to admin
    await page.waitForURL('**/admin', { timeout: 5000 });

    // check localStorage token
    const token = await page.evaluate(() => localStorage.getItem('authToken'));
    if (!token) {
      console.error('No auth token found in localStorage');
      process.exit(3);
    }

    console.log('SMOKE TEST PASS. token:', token);
    await browser.close();
    process.exit(0);
  } catch (err) {
    console.error('SMOKE TEST FAIL', err);
    await browser.close();
    process.exit(4);
  }
})();
