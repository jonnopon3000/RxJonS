/**
 * Collect and re-export all Operators for namespace convenience
 */

import { delay } from './delay';
import { log } from './log';
import { map } from './map';
import { mapTo } from './mapTo';
import { take } from './take';
import { tap } from './tap';

import { of } from './static/of';
import { interval } from './static/interval';

export {
    delay,
    log,
    map,
    mapTo,
    take,
    tap,

    of,
    interval
};