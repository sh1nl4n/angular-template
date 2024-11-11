import { convertToCamelCase } from "../../common/utils";

export function componentTemplateApiServiceFile(name: string): string {
  return `import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_URL } from '../../app/app.providers';
import { ${convertToCamelCase(name)} } from './${name}';

@Injectable()
export class ${convertToCamelCase(name)}ApiService {
    #http: HttpClient = inject(HttpClient);
    #apiUrl: string = inject(API_URL) + '${name}';
}
    `;
}
export function componentTemplateDFile(name: string): string {
  return `export namespace ${convertToCamelCase(name)} {
    export interface Entity {

    }

    export namespace Get {
        export interface Req {

        }

        export interface Res {

        }
    }

    export namespace Post {
        export interface Req {

        }

        export interface Res {

        }
    }

    export namespace GetOne {
        export interface Req {

        }

        export interface Res {

        }
    }

    export namespace Patch {
        export interface Req {

        }

        export interface Res {

        }
    }

    export namespace Detele {
        export interface Req {

        }

        export interface Res {

        }
    }
}
    `;
}
export function componentTemplateExportFile(name: string): string {
  return `export type { ${convertToCamelCase(name)} } from './${name}';
export { ${convertToCamelCase(name)}ApiService } from './${name}.api.service';
    `;
}
