# Agent Guidelines for This Repository

## Commands

### Build Commands
- Python projects: `pip install -e ".[dev]"` or `pip install -r requirements.txt`
- Node.js projects: `npm install` or `yarn install`
- TypeScript: `npm run build` or `tsc`

### Test Commands
- Run all tests: `pytest` (Python) or `npm test` (Node.js)
- Run single test:
  - Python: `pytest tests/test_file.py::test_function_name`
  - Node.js: `npm test -- -t "test name"` or `jest path/to/test.js`
- Run with coverage: `pytest --cov` or `npm test -- --coverage`

### Lint/Format Commands
- Python (Ruff): `ruff check .` and `ruff format .`
- Python (legacy): `flake8 .` and `black .`
- Node.js: `npm run lint` and `npm run format`
- TypeScript: `eslint .` and `prettier --write .`

## Code Style Guidelines

### Python
- **Imports**: Group by stdlib, third-party, local; sort alphabetically within groups
  ```python
  # Standard library
  import os
  import sys
  from typing import Optional, List

  # Third-party
  import requests
  from fastapi import FastAPI

  # Local
  from myproject.utils import helper
  ```
- **Line length**: 100 characters max (configurable in pyproject.toml)
- **Naming**: 
  - Functions/variables: `snake_case` (e.g., `get_user_data`)
  - Classes: `PascalCase` (e.g., `UserManager`)
  - Constants: `UPPER_CASE` (e.g., `MAX_RETRY_COUNT`)
  - Private methods: `_leading_underscore` (e.g., `_internal_helper`)
- **Types**: Use type hints for all function signatures; prefer modern syntax:
  - Use `|` for unions: `str | None` instead of `Optional[str]`
  - Use `list[str]` instead of `List[str]` (Python 3.9+)
  - Always type hint return values: `-> dict[str, Any]`
- **Docstrings**: Google style docstrings for all public functions and classes
  ```python
  def process_data(data: list[str], threshold: int = 10) -> dict[str, int]:
      """Process input data and return statistics.

      Args:
          data: List of string values to process.
          threshold: Maximum number of items to process (default: 10).

      Returns:
          Dictionary containing count statistics.

      Raises:
          ValueError: If data is empty or threshold is negative.
      """
  ```
- **Error handling**: 
  - Use specific exceptions (ValueError, TypeError, custom exceptions)
  - Never use bare `except:` - always catch specific exceptions
  - Always log errors with context: `logger.error("Failed to process: %s", item)`
  - Use context managers (`with` statements) for resource management
  - Re-raise with `raise` not `raise e` to preserve stack traces

### JavaScript/TypeScript
- **Imports**: Group by built-in, npm packages, local imports; sort alphabetically
  ```typescript
  // Built-in
  import path from 'path';
  import { readFile } from 'fs/promises';

  // npm packages
  import express from 'express';
  import { z } from 'zod';

  // Local
  import { config } from './config';
  import type { User } from '../types';
  ```
- **Line length**: 100 characters max (configure in .prettierrc or eslint)
- **Naming**:
  - Variables/functions: `camelCase` (e.g., `getUserData`)
  - Classes/components: `PascalCase` (e.g., `UserManager`)
  - Constants: `UPPER_CASE` (e.g., `MAX_RETRY_COUNT`)
  - Interfaces/types: `PascalCase` with descriptive names (e.g., `UserRepository`)
- **Types**: 
  - Use TypeScript interfaces for all data structures
  - Avoid `any` - use `unknown` if type is truly unknown
  - Prefer `interface` over `type` for object shapes
  - Use explicit return types on public functions
  - Enable strict mode in tsconfig.json
- **Error handling**:
  - Always use try/catch with specific error types
  - Use async/await over callbacks
  - Create custom error classes extending Error
  - Handle rejected promises appropriately
  - Use error boundaries in React components

### General
- **No commits**: Never run `git commit` unless explicitly requested by the user
- **Tests first**: Write tests before implementation when possible
- **Single responsibility**: Each function should do one thing well
- **DRY**: Don't repeat code; extract shared logic into utilities

## Project Structure
- Keep related files together in feature-based directories
- Place tests in `tests/` or `__tests__/` directories mirroring src structure
- Configuration files at project root (pyproject.toml, package.json, etc.)
- Documentation in README.md at root

## Testing Best Practices
- Write unit tests for all public functions and methods
- Use meaningful test names that describe the behavior being tested
- Follow Arrange-Act-Assert pattern in test structure
- Use fixtures and factories for test data setup
- Mock external dependencies (databases, APIs, file systems)
- Aim for high coverage on critical business logic
- Test edge cases: empty inputs, null values, boundary conditions
- Use parameterized tests for testing multiple scenarios
- Keep tests independent - no shared state between tests
- Use appropriate assertions:
  - Python: `assert result == expected`, `pytest.raises()`, `assert mock.called`
  - Node.js: `expect(result).toBe(expected)`, `expect(fn).toThrow()`, `expect(mock).toHaveBeenCalled()`

## Security
- Never commit secrets, API keys, or .env files
- Validate all inputs at API boundaries
- Use parameterized queries; never concatenate SQL
- Sanitize user-generated content before rendering

## Git Workflow
- **No commits**: Never run `git commit` unless explicitly requested by the user
- It is VERY IMPORTANT to only commit when explicitly asked, otherwise the user will feel that you are being too proactive
- **Safety Protocol**:
  - NEVER update the git config
  - NEVER run destructive/irreversible git commands (like push --force, hard reset, etc) unless the user explicitly requests them
  - NEVER skip hooks (--no-verify, --no-gpg-sign, etc) unless the user explicitly requests it
  - NEVER run force push to main/master, warn the user if they request it
  - Avoid git commit --amend unless user explicitly requested amend, OR commit SUCCEEDED but pre-commit hook auto-modified files
- **Git diff**: Run `git status` and `git diff` before any commit to see what will be committed

## Workflow
1. Read existing code to understand patterns before writing
2. Follow existing naming conventions and file organization
3. Run lint and typecheck commands before finishing
4. Fix all test failures before considering work complete
5. Ask user when uncertain about implementation choices

## Code Review Checklist
Before submitting changes:
- [ ] All tests pass
- [ ] Linting passes with no errors
- [ ] Type checking passes (for TypeScript projects)
- [ ] No secrets or API keys in code
- [ ] Documentation updated if needed
- [ ] Error handling is appropriate
- [ ] Edge cases are handled
