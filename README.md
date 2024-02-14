## How to run it

1. Run `pnpm install` on the root
2. Run `pnpm install` inside of `./transactional`
3. Run `pnpm build` inside of `./transactional`
    - You will need to build everytime you make changes to the emails, so it might be good to watch for changes
4. Run `pnpm start:dev`

## How it works

This does not use a workspace, so to avoid duplicated dependencies this adds `transactional` 
as a dependency which will bring in its dependencies as well. This means that if you want
to import from `transactional` you treat it as a dependency.
It would be a better developer experience if these were in a monorepo though.

## Changes worth noting

Inside of `./src/common/communications/emails/email.service.ts`

```diff
import { Injectable } from '@nestjs/common';
import * as React from 'react';
+import { VercelInviteUserEmail } from 'transactional/emails/vercel-invite-user';
import { renderAsync } from '@react-email/render';

@Injectable()
export class EmailService {
  constructor() {}

  renderVercelInviteUser() {
    return renderAsync(
      React.createElement(
        VercelInviteUserEmail,
        VercelInviteUserEmail.PreviewProps,
      ),
    );
  }
}
```

inside of `package.json`

```diff
  "dependencies": {
    "@nestjs/common": "^10.0.0",
    "@nestjs/core": "^10.0.0",
    "@nestjs/platform-express": "^10.0.0",
+    "@react-email/render": "^0.0.12",
+    "react": "18.2.0",
+    "transactional": "./transactional",
    "reflect-metadata": "^0.2.0",
    "rxjs": "^7.8.1"
  },
  "devDependencies": {
    "@nestjs/cli": "^10.0.0",
    "@nestjs/schematics": "^10.0.0",
    "@nestjs/testing": "^10.0.0",
    "@types/express": "^4.17.17",
    "@types/jest": "^29.5.2",
    "@types/node": "^20.3.1",
+    "@types/react": "18.2.55",
    "@types/supertest": "^6.0.0",
    "@typescript-eslint/eslint-plugin": "^6.0.0",
    "@typescript-eslint/parser": "^6.0.0",
    "eslint": "^8.42.0",
    "eslint-config-prettier": "^9.0.0",
    "eslint-plugin-prettier": "^5.0.0",
    "jest": "^29.5.0",
    "prettier": "^3.0.0",
    "source-map-support": "^0.5.21",
    "supertest": "^6.3.3",
    "ts-jest": "^29.1.0",
    "ts-loader": "^9.4.3",
    "ts-node": "^10.9.1",
    "tsconfig-paths": "^4.2.0",
    "typescript": "^5.1.3"
  },
```

in the `tsconfig.json`

```diff
{
  "compilerOptions": {
    "strict": true,
    "strictFunctionTypes": true,
    "module": "commonjs",
    "declaration": true,
    "removeComments": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "allowSyntheticDefaultImports": true,
    "target": "es2022",
+    "jsx": "react-jsx",

    // This setting should really be true in order for the compiled TS output to
    // follow the Javascript specs (and it defaults to true in TS projects
    // targeting newer Javascript versions) but we can't make it true, because
    // typeorm, and possibly nestjs (and/or class-validator), rely on the old,
    // non-standard behavior. See https://github.com/typeorm/typeorm/issues/9118
    "useDefineForClassFields": false,

    // This ignores event listeners
    "noUnusedLocals": false,
    "sourceMap": true,
    "outDir": "./dist",
    "baseUrl": "./",
    "incremental": true,
    "skipLibCheck": true,
    "strictNullChecks": true,
    "noImplicitAny": false,
    "strictBindCallApply": false,
    "forceConsistentCasingInFileNames": false,
    "noFallthroughCasesInSwitch": false,
    "inlineSources": true
  }
}
```

in the transactional's `tsconfig.json`

```diff
{
+  "extends": "../tsconfig.json",
  "compilerOptions": {
    "jsx": "react-jsx",
+    "outDir": "dist",
+    "declaration": true
  },
  "include": [
    "**/*.ts",
    "**/*.tsx"
  ],
  "exclude": [
    "node_modules"
  ]
}
```

In the transactional's `package.json`

```diff
{
  "name": "transactional",
  "version": "1.0.0",
  "scripts": {
    "dev": "email dev",
    "preview:build": "email build",
+    "build": "rimraf dist && tsc"
  },
+  "exports": {
+    "./emails/*": {
+      "types": "./dist/*.d.ts",
+      "require": "./dist/*.js"
+    }
+  },
  "license": "MIT",
  "dependencies": {
    "@react-email/components": "^0.0.15-canary.1",
    "react": "18.2.0",
    "react-email": "^2.1.0-canary.1"
  },
  "devDependencies": {
    "@types/react": "18.2.55",
    "rimraf": "5.0.5"
  }
}
```

