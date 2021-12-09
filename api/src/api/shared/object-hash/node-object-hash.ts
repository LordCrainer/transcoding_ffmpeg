const hasher = require('node-object-hash');

const hashSortCoerce = hasher({ sort: true, coerce: true, alg: "sha1" });

export { hashSortCoerce, hasher }