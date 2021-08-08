import type { Message } from "discord.js";
import { ApplyOptions } from "@sapphire/decorators";
import type { CxCommandOptions } from "@typings/index";
import CxCommand from "@lib/extensions/CxCommand";

@ApplyOptions<CxCommandOptions>({
  category: "Owner",
  description: "Loads all the commands in fs",
  detailedDescription: "Loads all of the commands in the commands folder",
  examples: ["cx load"],
  preconditions: ["OwnerOnly"],
  usage: "cx load",
})
export class Reload extends CxCommand {
  async run(message: Message): Promise<Message> {
    await this.container.stores.get("commands").loadAll();
    return await message.channel.send("All commands loaded!");
  }
}