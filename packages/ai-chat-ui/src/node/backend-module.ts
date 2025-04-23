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

import { ContainerModule, injectable } from '@theia/core/shared/inversify';
import { BackendApplicationContribution } from '@theia/core/lib/node/backend-application';
import type { MaybePromise } from '@theia/core';
import * as express from '@theia/core/shared/express';
import proxy = require('express-http-proxy');

@injectable()
export class BackendContribution implements BackendApplicationContribution {
    configure(app: express.Application): MaybePromise<void> {
        app.use('/demo', proxy('http://localhost:8080'));
    }
}

export default new ContainerModule(bind => {
    bind(BackendApplicationContribution).to(BackendContribution).inSingletonScope();
});
