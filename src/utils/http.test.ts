import sinon from 'sinon';
import { expect } from 'chai';
import HTTPTransport from './http';

describe('HTTPTransport', () => {
  const XHR = sinon.useFakeXMLHttpRequest();

  const requests: sinon.SinonFakeXMLHttpRequest[] = [];

  XHR.onCreate = (xhr) => {
    requests.push(xhr);
  };

  // @ts-ignore
  global.XMLHttpRequest = XHR;

  afterEach(() => {
    requests.length = 0;
  });

  it('should request GET with get method', () => {
    const transport = new HTTPTransport('/path');

    transport.get('/path');

    expect(requests[0].method).to.equal('GET');
  });

  it('should request POST with post method', () => {
    const transport = new HTTPTransport('/path');

    transport.post('/url', { data: { test: 'test' } });

    expect(requests[0].method).to.equal('POST');
  });

  it('should request DELETE with post method', () => {
    const transport = new HTTPTransport('/path');

    transport.delete('/url', { data: { test: 'test' } });

    expect(requests[0].method).to.equal('DELETE');
  });

  it('should request PUT with post method', () => {
    const transport = new HTTPTransport('/path');

    transport.put('/url', { data: { test: 'test' } });

    expect(requests[0].method).to.equal('PUT');
  });
});
