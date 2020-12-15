import http from 'k6/http';
import { sleep } from 'k6';
import { check } from 'k6';
import { Rate } from 'k6/metrics';

export const errorRate = new Rate('errors');

export let options = {
  stages: [
    { duration: '5s', target: 1 },
    { duration: '10s', target: 100 },
    { duration: '20s', target: 1000 },
    { duration: '20s', target: 1000 },
    { duration: '10s', target: 0 }
  ],
  thresholds: {
    errors: ['rate<0.01'],
    http_req_duration: ['p(99)<50'],
  },
};

export default function () {
  let res = http.get(
    `http://localhost:4000/api/listing/${Math.floor(Math.random() * 10000000) + 1}/neighborhood`,
  );
  let result = check(res, {
    'status is 200': (r) => r.status === 200,
  });
  errorRate.add(!result);
  sleep(1);
}