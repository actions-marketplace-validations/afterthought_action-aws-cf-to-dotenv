import * as core from '@actions/core'
import { CloudFormation, DescribeStacksCommandOutput, Output } from '@aws-sdk/client-cloudformation'
import {formatter} from './format'
import {appendFileSync, existsSync, writeFileSync} from 'fs'
import { snakeCase } from 'snake-case';

async function run() {
  const region = process.env.AWS_DEFAULT_REGION

  var cloudformation = new CloudFormation({region});


  try {
    const stackNamesInput = core.getInput('stack-name', {required: true})
    const format = core.getInput('format', {required: true})
    const output = core.getInput('output', {required: true})
    const prefix = core.getInput('prefix')
    const allOutputs: Output[] = []

    let nextToken: string

    let stackNames = stackNamesInput.split(',')
    try {
      do {
        const result: DescribeStacksCommandOutput = await cloudformation
          .describeStacks({
            NextToken: nextToken
          })

        let outputs = result.Stacks
          .filter(stack => stackNames.includes(stack.StackName))
          .flatMap(stack => stack.Outputs)

        nextToken = result.NextToken
        allOutputs.push(...outputs)
      } while (nextToken)


      const envs = allOutputs
        .map<Output>(output => ({
          OutputValue: output.OutputValue,
          OutputKey: snakeCase(output.OutputKey).toUpperCase(),
        }))
        .map<string>(formatter(format)(prefix))
      if (envs.length > 0) {
        envs.push('\n')
      }

      if (existsSync(output)) {
        console.log(`append to ${output} file`)
        appendFileSync(output, '\n' + envs.join('\n'))
      } else {
        console.log(`create ${output} file`)
        writeFileSync(output, envs.join('\n'))
      }
    } catch (e) {
      core.error(e)
      core.setFailed(e.message)
    }
  } catch (e) {
    core.setFailed(e.message)
  }
}

run()
