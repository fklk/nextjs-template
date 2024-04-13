await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
    webpack: cfg => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
        cfg.externals.push("@node-rs/argon2", "@node-rs/bcrypt");
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return cfg;
    },
};

export default config;
