// *****************************************************************************
// Copyright (C) 2024 EclipseSource GmbH.
//
// This program and the accompanying materials are made available under the
// terms of the Eclipse Public License v. 2.0 which is available at
// http://www.eclipse.org/legal/epl-2.0.
//
// This Source Code may also be made available under the following Secondary
// Licenses when the conditions for such availability set forth in the Eclipse
// Public License v. 2.0 are satisfied: GNU General Public License, version 2
// with the GNU Classpath Exception which is available at
// https://www.gnu.org/software/classpath/license.html.
//
// SPDX-License-Identifier: EPL-2.0 OR GPL-2.0-only WITH Classpath-exception-2.0
// *****************************************************************************

import { type RpcServer } from '@theia/core';
import { injectable } from '@theia/core/shared/inversify';
import puppeteer, { type Browser, type Page } from 'puppeteer';
import type { AudBrowser, AudClient, InvokeAction } from '../../common/aud-protocol';

@injectable()
export class BrowserAudService implements RpcServer<AudClient>, AudBrowser {
    protected _browser?: Browser;
    protected _page?: Page;
    protected client?: AudClient;

    protected get browser(): Browser {
        if (!this._browser) {
            throw new Error('Browser is not launched');
        }
        return this._browser;
    }

    protected get page(): Page {
        if (!this._page) {
            throw new Error('Page is not created');
        }
        return this._page;
    }

    async launch(): Promise<void> {
        if (this._browser) {
            return;
        }

        this._browser = await puppeteer.launch({
            headless: false
        });
    }

    async newPage(url: string): Promise<void> {
        if (!this._browser) {
            await this.launch();
        }

        const page = await this.browser.newPage();
        this._page = page;
        await page.goto(url);
    }

    async close(): Promise<void> {
        await this._browser?.close();
        this._browser = undefined;
    }

    async invoke(action: InvokeAction): Promise<void> {
        const { selector, type } = action;

        const page = this.page;

        if (type === 'click') {
            await page.click(selector);
        } else if (type === 'type') {
            await page.type(selector, action.value);
        }
    }

    async getDom(selector?: string): Promise<string> {
        const page = this.page;

        if (selector) {
            const element = await page.$(selector);
            if (!element) {
                throw new Error(`Element with selector "${selector}" not found`);
            }
            return await page.evaluate(el => el.outerHTML, element);
        } else {
            return await page.content();
        }
    }

    dispose(): void {
        this._browser?.close();
        this._browser = undefined;
    }

    setClient(client: AudClient | undefined): void {
        this.client = client;
    }

    getClient?(): AudClient | undefined {
        return this.client;
    }

}
