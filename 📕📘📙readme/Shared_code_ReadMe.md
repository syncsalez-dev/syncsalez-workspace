To make shared dependencies available for apps and other libraries in an Nx monorepo, you can set up shared libraries and configure them in such a way that apps or other libraries can access these dependencies.

Here’s how you can approach it:

### 1. **Create a Shared Library for Dependencies**

Create a library in the `libs` directory that holds the common dependencies or utility functions. For example, you could create a `shared/utils` library that holds shared code.

```bash
nx generate @nx/js:library shared-utils --directory=libs/shared --importPath=@syncsalez/shared/utils
```

### 2. **Install Shared Dependencies in the Library**

Install the dependencies you want to share within the library:

```bash
cd libs/shared/utils
yarn add <shared-dependency>
```

This will add the dependency to the `libs/shared/utils/package.json`. These dependencies are now part of your shared library.

### 3. **Update `tsconfig.json` for Path Mapping**

If you want to use path mappings (e.g., `import { xyz } from '@syncsalez/shared/utils';`), you can configure `tsconfig.base.json` (the root `tsconfig` file) to ensure proper resolution of the shared libraries.

In `tsconfig.base.json`, add path mapping under `compilerOptions`:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@syncsalez/shared/utils": ["libs/shared/utils/src/index.ts"],
      "@syncsalez/shared/web-ui": ["libs/shared/web-ui/src/index.ts"]
    }
  }
}
```

This ensures that `@syncsalez/shared/utils` or `@syncsalez/shared/web-ui` will correctly map to the respective library code when imported.

### 4. **Use Shared Libraries in Other Apps or Libraries**

In any app or other library that needs access to the shared dependencies, import them as normal:

```ts
import { someFunction } from "@syncsalez/shared/utils";
```

This will import functions or classes from the shared library.

### 5. **Make Sure Dependencies are Installed in the Root**

For shared dependencies that are used globally across apps and libraries, it’s a good idea to install them at the root level:

```bash
yarn add <shared-dependency> -W
```

This ensures that all apps and libraries in the monorepo can use these shared dependencies without having to install them individually in each app or lib.

### 6. **Use Nx to Build, Lint, and Test**

Nx makes it easy to manage dependencies between libraries and apps. Once you’ve set up shared libraries, Nx will know how to optimize the build process and handle dependencies between apps and libraries. For example, if `app1` depends on `shared-utils`, Nx will ensure `shared-utils` is built first before `app1` is built.

### Example Structure

Here’s an example structure for a shared utility library and its usage:

```
/libs
  /shared
    /utils
      - package.json
      - src
        - index.ts  (exports shared functions)
  /apps
    /app1
      - src
        - main.ts  (imports functions from shared-utils)
```

In `libs/shared/utils/src/index.ts`:

```ts
export function sharedUtilityFunction() {
  console.log("This is a shared utility function!");
}
```

In `apps/app1/src/main.ts`:

```ts
import { sharedUtilityFunction } from "@syncsalez/shared/utils";

sharedUtilityFunction(); // This works because the path is mapped.
```

### 7. **Leverage `nx.json` for Tagging and Dependency Management**

You can also configure `nx.json` to define explicit relationships between projects, ensuring that Nx builds them in the correct order. For example:

```json
{
  "projects": {
    "app1": {
      "tags": []
    },
    "shared-utils": {
      "tags": ["shared"]
    }
  }
}
```

This will ensure that `shared-utils` is built before `app1` if dependencies between them are properly defined.

### Summary

- Create shared libraries to hold common dependencies and utility functions.
- Use path mapping in `tsconfig.base.json` to easily import shared libraries across apps and libs.
- Install common dependencies at the root level to avoid redundant installs in each app or library.
- Use Nx’s build and dependency graph capabilities to manage relationships between your apps and shared libraries.

This approach will help you maintain a clean and modular codebase, where shared utilities and dependencies are easily accessible across your Nx workspace.
