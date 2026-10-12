// Shared application server; desktop workspace is the default on port 4173.
process.env.LANDING_PORT=process.env.PORT||'4173';
process.env.INVOIGO_DEFAULT_APP='true';
require('./landing/serve');
