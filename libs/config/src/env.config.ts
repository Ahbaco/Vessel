import { readFileSync } from "node:fs";
import { join } from "node:path";
import { load } from "js-yaml";

let YAML_CONFIG_FILENAME = "local.yaml";
const env = process.env.NODE_ENV || "local";

switch (env) {
  case "dev":
    YAML_CONFIG_FILENAME = "dev.yaml";
    break;

  case "staging":
    YAML_CONFIG_FILENAME = "staging.yaml";
    break;

  case "prod":
    YAML_CONFIG_FILENAME = "prod.yaml";
    break;

  case "ci":
    YAML_CONFIG_FILENAME = "ci.yaml";
    break;
}

export default () => {
  return load(
    readFileSync(join(__dirname, `../../resources/envs/${YAML_CONFIG_FILENAME}`), "utf8"),
  ) as Record<string, never>;
};
