[
    'forecast',
    'geocode'
].forEach(submodule => {
    module.exports[submodule] = require(`./${submodule}`);
});
