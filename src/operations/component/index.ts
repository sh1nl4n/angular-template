import {
  componentTemplateTsFile,
  componentTemplateHtmlFile,
  componentTemplateScssFile,
} from "./template";
import * as fs from "fs";

export class GenerateComponent {
  private _name: string;
  private _path: string;

  constructor(name: string, path: string) {
    this._name = name;
    this._path = path + "/" + name;
    console.log(this._path);

    this._main();
  }

  private _main() {
    const contentTsFile = componentTemplateTsFile(this._name);
    this._createFile(this._path + ".component.ts", contentTsFile);

    const contentHtmlFile = componentTemplateHtmlFile(this._name);
    this._createFile(this._path + ".template.html", contentHtmlFile);

    const contentScssFile = componentTemplateScssFile();
    this._createFile(this._path + ".style.scss", contentScssFile);
  }

  private _createFile(filePath: string, content: string) {
    fs.writeFileSync(filePath, content);
  }
}
