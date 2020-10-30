import { Command } from "../../../deps.ts";
import { ConfigData } from "../../load_config.ts";
import { exportScripts } from "../../export_scripts.ts";
import { checkGitHooks } from "../../git_hooks.ts";
import { validateConfigData } from "../../validate_config_data.ts";

export class ExportCommand extends Command {
  constructor(private configData: ConfigData | null) {
    super();
    this.description("Export one or more scripts as executable files")
      .arguments("[scripts...:scriptid]")
      .option(
        "-o, --out-dir [dir:string]",
        "The folder where the scripts will be exported",
      )
      .action(async (options, scripts: string[]) => {
        validateConfigData(this.configData);
        await checkGitHooks(this.configData as ConfigData);
        await exportScripts(
          this.configData as ConfigData,
          scripts,
          options.outDir,
        );
      });
  }
}
