// *****************************************************************************
// Copyright (C) 2025 EclipseSource GmbH.
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
import { type ToolProvider, type ToolRequest } from '@theia/ai-core';
import { inject, injectable } from '@theia/core/shared/inversify';
import { AudBrowser } from '../common/aud-protocol';
import { CLOSE_FUNCTION_ID, GET_DOM_FUNCTION_ID, INVOKE_ACTION_FUNCTION_ID, NEW_PAGE_FUNCTION_ID } from '../common/aud-functions';

@injectable()
export abstract class AudBrowserToolProvider implements ToolProvider {
    @inject(AudBrowser)
    protected readonly aud: AudBrowser;

    abstract getTool(): ToolRequest;
}

@injectable()
export class AudNewPageProvider extends AudBrowserToolProvider {
    static ID = NEW_PAGE_FUNCTION_ID;

    getTool(): ToolRequest {
        return {
            id: AudNewPageProvider.ID,
            name: AudNewPageProvider.ID,
            description: 'Open a new page in the browser.',
            parameters: {
                type: 'object',
                properties: {
                    url: {
                        type: 'string',
                        description: 'The url to open in the browser as a new page. The url must be a valid url.',
                    },
                },
                required: ['url'],
            },
            handler: async arg => {
                try {
                    const { url } = JSON.parse(arg);
                    return await this.aud.newPage(url);
                } catch (ex) {
                    console.error('Error opening new page:', ex);
                    return (`Failed to open new page: ${ex.message}`);
                }
            }
        };
    }
}

@injectable()
export class AudCloseBrowserProvider extends AudBrowserToolProvider {
    static ID = CLOSE_FUNCTION_ID;

    getTool(): ToolRequest {
        return {
            id: AudCloseBrowserProvider.ID,
            name: AudCloseBrowserProvider.ID,
            description: 'Close the browser.',
            parameters: {
                type: 'object',
                properties: {
                },
                required: [],
            },
            handler: async () => {
                try {
                    return await this.aud.close();
                } catch (ex) {
                    console.error('Error closing browser:', ex);
                    return (`Failed to close browser: ${ex.message}`);
                }
            }

        };
    }
}

@injectable()
export class AudInvokeActionProvider implements ToolProvider {
    static ID = INVOKE_ACTION_FUNCTION_ID;

    @inject(AudBrowser)
    protected readonly aud: AudBrowser;

    getTool(): ToolRequest {
        return {
            id: AudInvokeActionProvider.ID,
            name: AudInvokeActionProvider.ID,
            description:
                `Invoke an action in the browser. 
                You can use this to perform actions on elements in the application under test.`,
            parameters: {
                type: 'object',
                properties: {
                    selector: {
                        type: 'string',
                        description: `The selector of the element to invoke the action on. The selector is a 
                        CSS selector that identifies the element.`,
                    },
                    type: {
                        type: 'string',
                        enum: ['click', 'type'],
                        description: `The type of action to invoke on the element. The type is a string that 
                        identifies the action to be performed on the element.`,
                    },
                    value: {
                        type: 'string',
                        description: `A value to be used with the action. 
                        For example, it can be used to specify the text to be typed into an input field.`,
                    }
                },
                required: ['selector', 'type'],
            },
            handler: async arg => {
                try {

                    const { selector, type, value } = JSON.parse(arg);
                    return await this.aud.invoke({
                        selector, type, value
                    });
                } catch (ex) {
                    console.error('Error invoking action:', ex);
                    return (`Failed to invoke action: ${ex.message}`);
                }
            }
        };
    }
}

@injectable()
export class AudGetDomProvider extends AudBrowserToolProvider {
    static ID = GET_DOM_FUNCTION_ID;

    getTool(): ToolRequest {
        return {
            id: AudGetDomProvider.ID,
            name: AudGetDomProvider.ID,
            description: 'Get the DOM of the page.',
            parameters: {
                type: 'object',
                properties: {
                    selector: {
                        type: 'string',
                        description: `The selector of the element to get the DOM of. The selector is a 
                        CSS selector that identifies the element. If not provided, the entire DOM will be returned.`,
                    }
                },
                required: [],
            },
            handler: async arg => {
                try {
                    const { selector } = JSON.parse(arg);
                    return await this.aud.getDom(selector);
                } catch (ex) {
                    console.error('Error getting DOM:', ex);
                    return (`Failed to get DOM: ${ex.message}`);
                }
            }
        };
    }
}
