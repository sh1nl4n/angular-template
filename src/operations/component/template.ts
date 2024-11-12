import { convertToCamelCase } from "../../common/utils";

export function componentTemplateTsFile(name: string): string {
  return `import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';

@Component({
    standalone: true,
    imports: [],
    selector: 'app-${name}',
    templateUrl: './${name}.template.html',
    styleUrl: './${name}.style.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ${convertToCamelCase(name)} {
    // DI
    private readonly _destroyRef: DestroyRef = inject(DestroyRef);

    // INPUTS
    
	  // OUTPUTS

    // STATIC INFO

    // FORM && CONTROLS

    // SUBJECTS

    // SIGNALS

    // LIFECYCLES
    constructor() {
      this._destroyRef.onDestroy(() => {});
    }

    // PROTECTED METHODS

    // PRIVATE METHODS

}
    `;
}

export function componentTemplateHtmlFile(name: string): string {
  return `<h1 style='color: red'>${convertToCamelCase(name)}</h1>`;
}

export function componentTemplateScssFile(): string {
  return "";
}
