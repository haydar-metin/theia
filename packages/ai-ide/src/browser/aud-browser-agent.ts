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
import { AbstractStreamParsingChatAgent } from '@theia/ai-chat/lib/common';
import { LanguageModelRequirement } from '@theia/ai-core';
import { nls } from '@theia/core';
import { injectable } from '@theia/core/shared/inversify';
import { audBrowserPromptTemplate } from '../common/aud-prompt-template';

@injectable()
export class AudBrowserAgent extends AbstractStreamParsingChatAgent {
    id: string = 'AUD';
    name = 'AUD';
    languageModelRequirements: LanguageModelRequirement[] = [{
        purpose: 'chat',
        identifier: 'openai/gpt-4o',
    }];
    protected defaultLanguageModelPurpose: string = 'chat';

    override description = nls.localize('theia/ai/workspace/audAgent/description',
        'An AI assistant integrated into the Theia IDE, capable of interacting with the development environment through browser-based operations.');

    override promptTemplates = [audBrowserPromptTemplate];
    override functions = [];
    protected override systemPromptId: string | undefined = audBrowserPromptTemplate.id;
}
