import { Buffer } from 'buffer';

if (typeof (Buffer as any).SlowBuffer === 'undefined') {
  (Buffer as any).SlowBuffer = Buffer;
}
