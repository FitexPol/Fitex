// import { html } from '@elysiajs/html';
// import { afterAll, beforeAll, describe, expect, it } from 'bun:test';
// import { Elysia } from 'elysia';
// import { JSDOM } from 'jsdom';
// import mongoose from 'mongoose';

// import { signIn } from '@auth/api/signIn';
// import { User } from '@auth/models/user';
// import { mongoUri } from '@vars';

// import { authPage } from './auth';

// const testApp = new Elysia()
//   .use(html())
//   .group('/api/auth', (app) => app.use(signIn))
//   .use(authPage);

// describe('Home page', () => {
//   let authToken: string;

//   beforeAll(async () => {
//     try {
//       await mongoose.connect(mongoUri);
//     } catch (e) {
//       console.log(e);
//       return;
//     }

    // const username = 'Test';
    // const password = 'TestPassword';

//     let userDoc = await User.findOne({ username });

    // if (!userDoc) {
    //   const hash = await Bun.password.hash(password);

    //   const user = new User({
    //     username,
    //     password: hash,
    //     roles: [Role.Admin],
    //   });

    //   userDoc = await user.save();
    // }

//     const formData = new FormData();
//     formData.append('username', username);
//     formData.append('password', password);

//     const response = await testApp.handle(
//       new Request('http://localhost/api/auth/sign-in', { method: 'POST', body: formData }),
//     );

//     const authCookie = response.headers.get('set-cookie');

//     if (!authCookie) {
//       console.log(response);
//       throw new Error('No auth cookie');
//     }

//     authToken = authCookie.split('=')[1].split(';')[0];
//   });

//   it('has h2 tags containing appropriate text', async () => {
//     const response = await testApp.handle(
//       new Request('http://localhost/', { headers: { cookie: `auth=${authToken}` } }),
//     );

//     const blob = await response.blob();
//     const homePageRaw = await blob.text();
//     const { document } = new JSDOM(homePageRaw).window;
//     const titles = document.querySelectorAll('h2');

//     expect(titles.length).toBe(2);
//     expect(titles[0].textContent).toBe('Twoje ulubione listy zakupów');
//     expect(titles[1].textContent).toBe('Twoje ulubione posiłki');
//   });

//   afterAll(async () => {
//     mongoose.disconnect();
//   });
// });
