Project base created from very similar action, [https://github.com/deptno/action-aws-ssm-to-dotenv](https://github.com/deptno/action-aws-ssm-to-dotenv).

# action aws ssm to dotenv
![](https://github.com/afterthought/action-aws-cf-to-dotenv/workflows/v1/badge.svg)

create `.env` or **shell script** via AWS Cloudformation outputs

## usage

```yaml
- uses: afterthought/action-aws-cf-to-dotenv@v1.3.1
  env:
    AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }} # required
    AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }} # required
    AWS_DEFAULT_REGION: ap-northeast-2 # required
  with:
    stack-name: /opensource/action-aws-ssm-to-dotenv # required
    format: shell
    output: .env.development
    prefix: CF_
```

Output parameter names are converted to UPPER_SNAKE_CASE.

⚠️ if output file already exists `action_aws_cf_to_dotenv` will append data to output file(1.3.0)

## option

### stack-name(required)
Name of cloudformation stack.

### format(default `dotenv`)
optional, default=dotenv  
  - dotenv: KEY="value" (default)
  - shell: export KEY="value"  
  - yaml: KEY: "value" 
  
### output(default `.env`)
output filename

### prefix(optional)
add prefix to exported variable name  
eg) `prefix: ACTION_` will export `ACTION_ENV_VAR="value"`


[.github/workflows/test.yml](.github/workflows/test.yml)


---
### License
MIT
