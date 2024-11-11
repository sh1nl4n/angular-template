import {
  componentTemplateApiServiceFile,
  componentTemplateDFile,
  componentTemplateExportFile,
} from "./template";
import * as fs from "fs";

export class GenerateEntity {
  private _name: string;
  private _path: string;
  private _indexPath: string;

  constructor(name: string, path: string) {
    this._name = name;
    this._path = path + "/" + name;
    this._indexPath = path + "/index.ts";

    this._main();
  }

  private _main() {
    const contentApiServiceFile = componentTemplateApiServiceFile(this._name);
    this._createFile(this._path + ".api.service.ts", contentApiServiceFile);

    const contentDFile = componentTemplateDFile(this._name);
    this._createFile(this._path + ".d.ts", contentDFile);

    const contentExportFile = componentTemplateExportFile(this._name);
    this._createFile(this._indexPath, contentExportFile);
  }

  private _createFile(filePath: string, content: string) {
    fs.writeFileSync(filePath, content);
  }
}
