"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core = require("@actions/core");
const client_cloudformation_1 = require("@aws-sdk/client-cloudformation");
const format_1 = require("./format");
const fs_1 = require("fs");
const snake_case_1 = require("snake-case");
async function run() {
    const region = process.env.AWS_DEFAULT_REGION;
    var cloudformation = new client_cloudformation_1.CloudFormation({ region });
    try {
        const stackNamesInput = core.getInput('stack-names', { required: true });
        const tagFiltersInput = core.getInput('tag-filters', { required: true });
        const format = core.getInput('format', { required: true });
        const output = core.getInput('output', { required: true });
        const prefix = core.getInput('prefix');
        const allOutputs = [];
        let nextToken;
        let stackNames = stackNamesInput.split(',');
        let tagFilters = tagFiltersInput.split(',');
        try {
            do {
                const result = await cloudformation
                    .describeStacks({
                    NextToken: nextToken
                });
                let outputs = result.Stacks
                    .filter(stack => stackNames.length == 0 || stackNames.includes(stack.StackName))
                    .filter(stack => {
                    if (tagFilters.length == 0)
                        return true;
                    const stackTags = (stack.Tags || []).map(tag => `${tag.Key}:${tag.Value}`);
                    return tagFilters.every((filterValue) => stackTags.includes(filterValue));
                })
                    .flatMap(stack => stack.Outputs);
                nextToken = result.NextToken;
                allOutputs.push(...outputs);
            } while (nextToken);
            const envs = allOutputs
                .map(output => ({
                OutputValue: output.OutputValue,
                OutputKey: snake_case_1.snakeCase(output.OutputKey).toUpperCase(),
            }))
                .map(format_1.formatter(format)(prefix));
            if (envs.length > 0) {
                envs.push('\n');
            }
            if (fs_1.existsSync(output)) {
                console.log(`append to ${output} file`);
                fs_1.appendFileSync(output, '\n' + envs.join('\n'));
            }
            else {
                console.log(`create ${output} file`);
                fs_1.writeFileSync(output, envs.join('\n'));
            }
        }
        catch (e) {
            core.error(e);
            core.setFailed(e.message);
        }
    }
    catch (e) {
        core.setFailed(e.message);
    }
}
run();
