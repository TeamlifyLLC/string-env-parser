import process from 'node:process';
import core from '@actions/core';
import dotenv from 'dotenv';

export async function action() {
    const envString = core.getInput('envString', { required: true, trimWhitespace: true });

    try {
        const envConfig = dotenv.parse(envString);

        for (const key of Object.getOwnPropertyNames(envConfig)) {
            process.env[key] = envConfig[key];
        }
    } catch {
        core.error(`${envFile} does not exist`);
    }

    try {
        // Get env vars passed into this action and add them to the repo env,
        // so they are available for the next steps
        for (const [key, value] of Object.entries(process.env)) {
            core.exportVariable(`${key}`, `${value}`);
        }
    } catch (error) {
        core.error(`Error ${error}`);
    }
}
