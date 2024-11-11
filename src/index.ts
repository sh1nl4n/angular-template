#!/usr/bin/env node
import * as fs from 'fs';
import * as path from 'path';
import minimist from 'minimist';
import { Generate, Component, Entity } from './common/index.types';
import { generateString, convertToCebabCase } from './common/utils';

class App {
	// Преобразование аргументов в адекватный вид
	get args(): any {
		return minimist(process.argv);
	}

	// Путь до папки src текущего проекта
	get projectPath(): string[] {
		// return [__dirname, "..", "."];
		return [process.cwd()];
	}

	// Путь до желаемого места
	get needPath(): string[] {
		const { p, path } = this.args;
		let finalPath: string[] = [];

		if (p && path) {
			console.error('ОПРЕДЕЛИСЬ С ПУТЕМ ЕБЛАН');
			process.exit(1);
		}

		if (!p && !path) {
			return [this.templateName];
		}

		finalPath = (p || path).split('/');

		finalPath = finalPath.filter(p => !!p);

		finalPath.push(this.templateName);

		return finalPath;
	}

	get filePath(): string[] {
		return [...this.projectPath, ...this.needPath];
	}

	// Получение операции из args
	get operation(): string {
		return this.args._[2];
	}

	// Получение структуры из args
	get structure(): string {
		return this.args._[3];
	}

	// Получение желаемого наименования шаблона из args
	get templateName(): string {
		const name: string | undefined = this.args._[4];
		return name ? convertToCebabCase(name) : convertToCebabCase(generateString(10));
	}

	get logLevel(): boolean {
		const { v, verbose } = this.args;
		return !!(v || verbose);
	}

	constructor() {
		if (this.logLevel) {
			console.log('args', this.args);
			console.log('projectPath', this.projectPath);
			console.log('needPath', this.needPath);
			console.log('filePath', this.filePath);
			console.log('operation', this.operation);
			console.log('structure', this.structure);
			console.log('templateName', this.templateName);
		}
	}

	/*
	 * Создание папок если пользователь уебан задал несуществующий путь
	 * globalPath: до src
	 * arrPath: от src до желаемого места
	 */
	private _generateDirection(globalPath: string[], arrPath: string[]): void {
		const curentArray: string[] = [];
		arrPath.forEach(e => {
			curentArray.push(e);
			const currentResolvePath = path.resolve(...globalPath, ...curentArray);
			if (!fs.existsSync(currentResolvePath)) {
				fs.mkdirSync(currentResolvePath);
			}
		});
	}

	public main(): void {
		let operation = 0;
		let structure = 0;

		switch (this.operation) {
			case Generate.short || Generate.full: {
				operation = 1;
				break;
			}
			default: {
				console.error('НЕТ ТАКОЙ ОПЕРАЦИИ, Наебщик');
				break;
			}
		}

		switch (this.structure) {
			case Component.short || Generate.full: {
				structure = 1;
				break;
			}
			case Entity.short || Entity.full: {
				structure = 2;
				break;
			}
			default: {
				console.error('НЕТ ТАКОЙ СТРУКТУРЫ, Наебщик');
				break;
			}
		}

		if (operation && structure) {
			this._generateDirection(this.projectPath, this.needPath);
		}

		if (operation === 1) {
			if (structure === 1) {
				import('./operations/component/index').then(
					c => new c.GenerateComponent(this.templateName, this.filePath.join('/'))
				);
			}
			if (structure === 2) {
				import('./operations/entity/index').then(
					c => new c.GenerateEntity(this.templateName, this.filePath.join('/'))
				);
			}
		}
	}
}

const app = new App();
app.main();
