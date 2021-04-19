import request from 'supertest';
import { app } from '../../app';

const createTicket = (title: string, price: number) => {
  return request(app).post('/api/tickets').set('Cookie', global.signin()).send({ title, price });
};
it('should be able to fetch a list of tickets', async () => {
  await createTicket('ticket_1', 20);
  await createTicket('ticket_2', 22);
  await createTicket('ticket_3', 2200);

  const res = await request(app).get('/api/tickets').send().expect(200);
  expect(res.body.length).toEqual(3);
});
