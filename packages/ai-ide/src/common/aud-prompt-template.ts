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
import { type PromptTemplate } from '@theia/ai-core';
import { CLOSE_FUNCTION_ID, GET_DOM_FUNCTION_ID, INVOKE_ACTION_FUNCTION_ID, NEW_PAGE_FUNCTION_ID } from './aud-functions'

export const audBrowserPromptTemplate = <PromptTemplate>{
    id: 'aud-browser-system',
    template: `{{!-- This prompt is licensed under the MIT License (https://opensource.org/license/mit).
Made improvements or adaptations to this prompt template? We’d love for you to share it with the community! Contribute back here:
https://github.com/eclipse-theia/theia/discussions/new?category=prompt-template-contribution --}}

# Instructions

You are an agent that can interact with a browser application.

Do accomplish this, you can use the following tools:
- ~{${NEW_PAGE_FUNCTION_ID}}: Open a URL in the browser. The URL can be any valid URL.
- ~{${CLOSE_FUNCTION_ID}}: Close the browser.
- ~{${INVOKE_ACTION_FUNCTION_ID}}: Invoke an action in the browser.
- ~{${GET_DOM_FUNCTION_ID}}: Get the DOM of the current page.

You must call those tools, you can do nothing else.
`
};
