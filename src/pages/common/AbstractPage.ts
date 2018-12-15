import { UtilService } from "../../services/utils-service";

export class AbstractPage {
  baseDataFolder: string = "";

  constructor(public utilsService: UtilService) {
    this.baseDataFolder = this.utilsService.getBaseDataFolder();
  }
}
