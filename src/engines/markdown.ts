/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call */
import Markdoc from '@markdoc/markdoc';
import {BaseEngine} from '../base-engine.js';
import type {EngineInterface} from '../engine-interface.js';

export class Markdown extends BaseEngine implements EngineInterface {
	constructor(options?: any) {
		super();

		this.names = ['markdown'];

		if (options) {
			this.opts = options;
		}

		this.engine = Markdoc;

		this.setExtensions(['md', 'markdown']);
	}

	async render(source: string, data?: Record<string, unknown>): Promise<string> {
		const ast = this.engine.parse(source);
		const content = this.engine.transform(ast, this.opts);
		return this.engine.renderers.html(content) as string;
	}

	renderSync(source: string, data?: Record<string, unknown>): string {
		const ast = this.engine.parse(source);
		const content = this.engine.transform(ast, this.opts);
		return this.engine.renderers.html(content) as string;
	}
}
